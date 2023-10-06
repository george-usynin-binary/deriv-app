import React from 'react';
import { TWalletInfo } from 'Types';
import { useCurrencyConfig } from '@deriv/api';
import { Text, WalletCard } from '@deriv/components';
import { useCreateWallet } from '@deriv/hooks';
import { observer, useStore } from '@deriv/stores';
import { getWalletCurrencyIcon } from 'Constants/utils';
import { Localize } from '@deriv/translations';
import wallet_description_mapper from 'Constants/wallet_description_mapper';

type TAddWalletCard = {
    wallet_info: React.PropsWithChildren<TWalletInfo>;
};

const AddWalletCard = observer(({ wallet_info }: TAddWalletCard) => {
    const {
        ui: { is_dark_mode_on, is_mobile },
    } = useStore();

    const { currency = '', landing_company_name, is_added, gradient_card_class } = wallet_info;
    const { getConfig } = useCurrencyConfig();
    const currency_config = getConfig(currency);
    const { mutate: createWallet } = useCreateWallet();

    const wallet_details = {
        currency,
        icon: getWalletCurrencyIcon(currency, is_dark_mode_on),
        icon_type: currency_config?.type,
        jurisdiction_title: landing_company_name?.toUpperCase(),
        name: currency_config?.name,
        gradient_class: gradient_card_class,
    };

    return (
        <div className='add-wallets__card'>
            <div className='add-wallets__card-wrapper'>
                <WalletCard
                    wallet={wallet_details}
                    size='medium'
                    state={is_added ? 'added' : 'add'}
                    onClick={() =>
                        !is_added &&
                        createWallet({
                            payload: { currency, account_type: currency_config?.is_crypto ? 'crypto' : 'doughflow' },
                        })
                    }
                />
                <div className='add-wallets__card-description'>
                    <Text as='h3' color='prominent' size={is_mobile ? 'xs' : 's'} weight='bold'>
                        <Localize
                            i18n_default_text='{{currency_code}} Wallet'
                            values={{ currency_code: currency_config?.display_code }}
                        />
                    </Text>
                    <Text as='p' size='xs' line_height={is_mobile ? 's' : 'm'}>
                        {wallet_description_mapper[currency]}
                    </Text>
                </div>
            </div>
        </div>
    );
});

export default AddWalletCard;
