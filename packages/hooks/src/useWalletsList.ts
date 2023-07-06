import { useMemo } from 'react';
import { useFetch } from '@deriv/api';
import { useStore } from '@deriv/stores';
import { getWalletCurrencyIcon } from '@deriv/utils';
import useCurrencyConfig from './useCurrencyConfig';

const useWalletsList = () => {
    const { client, ui } = useStore();
    const { getConfig } = useCurrencyConfig();
    const { accounts, loginid } = client;
    const { is_dark_mode_on } = ui;
    const { data, ...rest } = useFetch('authorize', {
        payload: { authorize: accounts[loginid || ''].token },
        options: { enabled: Boolean(loginid), keepPreviousData: true },
    });
    const { data: balance_data } = useFetch('balance', { payload: { account: 'all' } });

    const sortedWallets = useMemo(() => {
        // Filter out accounts which has account_category as wallet
        const wallets = data?.authorize?.account_list?.filter(account => account.account_category === 'wallet');

        // Modify the wallets to include the missing balance from the API response
        // Should remove this once the API is fixed
        const modified_wallets = wallets?.map(wallet => {
            const wallet_currency = wallet.currency || '';

            return {
                ...wallet,
                /** Wallet balance */
                balance: balance_data?.balance?.accounts?.[wallet.loginid || '']?.balance || 0,
                display_currency_code: getConfig(wallet_currency)?.display_code,
                /** Gradient background class for cashier wallet modal header */
                gradient_header_class: `wallet-header__${
                    wallet.is_virtual === 1 ? 'demo' : wallet_currency.toLowerCase()
                }-bg${is_dark_mode_on ? '--dark' : ''}`,
                /** Gradient background class for wallet card */
                gradient_card_class: `wallet-card__${
                    wallet.is_virtual === 1 ? 'demo' : wallet_currency.toLowerCase()
                }-bg${is_dark_mode_on ? '--dark' : ''}`,
                /** Wallet icon */
                //TODO: move getWalletCurrencyIcon implementation into hook
                icon: getWalletCurrencyIcon(wallet.is_virtual ? 'demo' : wallet_currency, is_dark_mode_on),
                /** Indicating whether the wallet is crypto or fiat */
                is_crypto: getConfig(wallet_currency)?.is_crypto,
                /** Indicating whether the wallet is a virtual-money wallet */
                is_demo: wallet.is_virtual === 1,
                /** Indicating whether the account is marked as disabled or not */
                is_disabled: Boolean(wallet.is_disabled),
                /** Indicating whether the wallet is belong to malta jurisdiction */
                is_malta_wallet: wallet.landing_company_name === 'malta',
                /** Indicating whether the wallet is the currently selected wallet */
                is_selected: wallet.loginid === loginid,
                /** Indicating whether the wallet is a virtual-money wallet */
                is_virtual: Boolean(wallet.is_virtual),
                /** Landing company shortcode the account belongs to. Use this instead of landing_company_shortcode for wallets */
                landing_company_name:
                    wallet.landing_company_name === 'maltainvest' ? 'malta' : wallet.landing_company_name,
                /** Wallet display name */
                //TODO: remove this property because we can't localize it
                name: `${wallet.is_virtual ? 'Demo ' : ''}${getConfig(wallet_currency)?.display_code} Wallet`,
            };
        });

        // Sort the wallets alphabetically by fiat, crypto, then virtual
        return modified_wallets?.sort((a, b) => {
            if (a.is_virtual !== b.is_virtual) {
                return a.is_virtual ? 1 : -1;
            } else if (getConfig(a.currency || '')?.is_crypto !== getConfig(b.currency || '')?.is_crypto) {
                return getConfig(a.currency || '')?.is_crypto ? 1 : -1;
            }

            return (a.currency || 'USD').localeCompare(b.currency || 'USD');
        });
    }, [data?.authorize?.account_list, balance_data?.balance?.accounts, is_dark_mode_on, getConfig, loginid]);

    return {
        ...rest,
        data: sortedWallets,
    };
};

export default useWalletsList;
