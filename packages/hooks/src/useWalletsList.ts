import { useMemo } from 'react';
import { useFetch } from '@deriv/api';
import { useStore } from '@deriv/stores';
import { getWalletCurrencyIcon } from '@deriv/utils';

const useWalletsList = () => {
    const { client, ui } = useStore();
    const { is_dark_mode_on } = ui;
    const { accounts, loginid, is_crypto } = client;
    const { data, ...rest } = useFetch('authorize', {
        payload: { authorize: accounts[loginid || ''].token },
        options: { enabled: Boolean(loginid), keepPreviousData: true },
    });
    const { data: balance_data } = useFetch('balance', { payload: { account: 'all' } });

    const sortedWallets = useMemo(() => {
        // @ts-expect-error Need to update @deriv/api-types to fix the TS error
        // Filter out accounts which has account_category as wallet
        const wallets = data?.authorize?.account_list?.filter(account => account.account_category === 'wallet');

        // Modify the wallets to include the missing balance from the API response
        // Should remove this once the API is fixed
        const modified_wallets =
            wallets?.map(wallet => {
                const currency = wallet?.currency || 'USD';
                const is_crypto_currency = is_crypto(currency);
                const is_fiat = !is_crypto_currency;
                const icon = getWalletCurrencyIcon(wallet.is_virtual ? 'demo' : currency, is_dark_mode_on);
                const modal_icon = getWalletCurrencyIcon(wallet.is_virtual ? 'demo' : currency, is_dark_mode_on, true);
                const name = `${wallet.is_virtual ? 'Demo ' : ''}${currency} ${'Wallet'}`;

                return {
                    ...wallet,
                    currency,
                    /** Indicating whether the wallet is the currently selected wallet. */
                    is_selected: wallet.loginid === loginid,
                    /** Wallet balance */
                    balance: balance_data?.balance?.accounts?.[wallet.loginid || '']?.balance || 0,
                    /** Landing company shortcode the account belongs to. */
                    landing_company_name:
                        wallet.landing_company_name === 'maltainvest' ? 'malta' : wallet.landing_company_name,
                    is_disabled: Boolean(wallet.is_disabled),
                    is_virtual: Boolean(wallet.is_virtual),
                    is_crypto: is_crypto_currency,
                    is_fiat,
                    icon,
                    modal_icon,
                    name,
                    // needs for WalletIcon, maybe refactor during cleanUp
                    icon_type: is_fiat && !wallet.is_virtual ? 'fiat' : 'crypto',
                };
            }) || [];

        // Sort the wallets alphabetically by fiat, crypto, then virtual
        return modified_wallets?.sort((a, b) => {
            if (a.is_virtual !== b.is_virtual) {
                return a.is_virtual ? 1 : -1;
            } else if (is_crypto(a.currency) !== is_crypto(b.currency)) {
                return is_crypto(a.currency) ? 1 : -1;
            }

            return (a.currency || 'USD').localeCompare(b.currency || 'USD');
        });
    }, [balance_data?.balance?.accounts, data?.authorize?.account_list, is_crypto, is_dark_mode_on, loginid]);

    return {
        ...rest,
        data: sortedWallets,
    };
};

export default useWalletsList;
