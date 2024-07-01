import React from 'react';
import { Analytics } from '@deriv-com/analytics';
import { Icon, Text } from '@deriv/components';
import { observer, useStore } from '@deriv/stores';
import { Localize } from '@deriv/translations';

const WalletsBannerUpgrading = observer(() => {
    const { traders_hub, ui } = useStore();
    const { is_demo } = traders_hub;
    const { is_mobile } = ui;

    React.useEffect(() => {
        Analytics.trackEvent('ce_tradershub_banner', {
            action: 'open',
            form_name: 'ce_tradershub_banner',
            account_mode: is_demo ? 'demo' : 'real',
            banner_name: 'setting_up_wallets_step_2',
            banner_type: 'without_url',
        });
    }, [is_demo]);

    return (
        <div className='wallets-banner__container wallets-banner-upgrading'>
            <div className='wallets-banner__content wallets-banner-upgrading__content'>
                <div className='wallets-banner-upgrading__loading' data-testid='dt_wallets_loading_dots'>
                    <span className='wallets-banner-upgrading__dot' />
                    <span className='wallets-banner-upgrading__dot' />
                    <span className='wallets-banner-upgrading__dot' />
                </div>
                <Localize
                    i18n_default_text="<0>We're setting up your Wallets</0>"
                    components={[
                        <Text
                            key={0}
                            line_height={is_mobile ? 's' : 'm'}
                            size={is_mobile ? 'xs' : 'sm'}
                            weight='bold'
                        />,
                    ]}
                />
                <Localize
                    i18n_default_text='<0>This may take up to 2 minutes. During this time, some services may be unavailable.</0>'
                    components={[
                        <Text
                            className='wallets-banner-upgrading__description'
                            key={0}
                            line_height='s'
                            size={is_mobile ? 'xxxs' : 'xs'}
                        />,
                    ]}
                />
            </div>
            <Icon
                icon={`IcAppstoreWalletsUpgradeCoins${is_mobile ? '' : 'Horizontal'}`}
                width={is_mobile ? 220 : 448}
                height={is_mobile ? 220 : '100%'}
                className='wallets-banner-upgrading__image'
                data_testid={`dt_wallets_upgrade_coins${is_mobile ? '' : '_horizontal'}`}
            />
        </div>
    );
});

export default WalletsBannerUpgrading;
