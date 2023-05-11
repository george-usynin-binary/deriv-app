import React from 'react';
import { DemoLight, DemoDark } from '../../../public/images/index';
import classNames from 'classnames';
import { Badge, GradientBackground, Icon, Text, Watermark } from '@deriv/components';
import { formatMoney, getCurrencyDisplayCode } from '@deriv/shared';
import { localize } from '@deriv/translations';
import { getWalletCurrencyIcon } from 'Constants/utils';
import { getWalletModalBackgrounds } from 'Constants/wallet-backgrounds';

type TWalletModalHeaderProps = {
    balance?: string | number;
    currency: string;
    is_dark: boolean;
    is_demo: boolean;
    is_mobile: boolean;
    shortcode: string;
    closeModal: VoidFunction;
    is_wallet_name_visible: boolean;
};

const WalletModalHeader = ({
    balance,
    closeModal,
    currency,
    is_dark,
    is_demo,
    is_mobile,
    shortcode,
    is_wallet_name_visible,
}: TWalletModalHeaderProps) => {
    const header_class_name = 'wallet-modal__header';

    const wallet_title = React.useMemo(() => {
        return `${is_demo ? localize('Demo') : ''} ${getCurrencyDisplayCode(currency)} ${localize('Wallet')}`;
    }, [currency, is_demo]);

    const getBadgeLabel = React.useCallback(() => {
        if (is_demo) return localize('Demo');
        switch (shortcode) {
            case 'svg':
                return shortcode.toUpperCase();
            case 'malta':
            case 'maltainvest':
                return 'malta'.toUpperCase();
            default:
                return '';
        }
    }, [is_demo, shortcode]);

    const getCloseIcon = React.useCallback(() => {
        if (is_demo && is_dark) return 'IcAppstoreCloseLight';
        if (is_demo && !is_dark) return 'IcAppstoreCloseDark';
        if (is_dark) return 'IcAppstoreCloseDark';
        return 'IcAppstoreCloseLight';
    }, [is_dark, is_demo]);

    const getStylesByClassName = React.useCallback(
        (class_name: string) => {
            return classNames(class_name, {
                [`${class_name}-demo`]: is_demo,
            });
        },
        [is_demo]
    );

    const getCurrencyIconSize = React.useCallback(() => {
        // TODO: add p2p and payment_agent check
        const is_square_icon =
            ['btc', 'eth', 'ltc', 'usdt', 'eusdt', 'tusdt', 'ust', 'usdc', 'p2p', 'payment_agent'].includes(
                currency.toLowerCase()
            ) || is_demo;

        const sizes = {
            mobile: {
                width: is_square_icon ? 64 : 48,
                height: is_square_icon ? 40 : 48,
            },
            desktop: {
                width: is_square_icon ? 128 : 64,
                height: is_square_icon ? 80 : 64,
            },
        };

        const size = is_mobile ? sizes.mobile : sizes.desktop;

        return size;
    }, [currency, is_demo, is_mobile]);

    const getCurrencyIconProps = React.useCallback(() => {
        const icon = getWalletCurrencyIcon(is_demo ? 'demo' : currency, is_dark);
        const size = getCurrencyIconSize();

        return { icon, ...size };
    }, [currency, getCurrencyIconSize, is_dark, is_demo]);

    const getBackgroundName = React.useCallback(() => {
        if (is_demo) {
            return 'demo';
        }
        return currency.toLowerCase();
    }, [is_demo, currency]);

    return (
        <GradientBackground {...getWalletModalBackgrounds(getBackgroundName())}>
            {is_demo && <Watermark image={`url(${is_dark ? DemoDark : DemoLight})`} opacity={is_dark ? 0.32 : 0.24} />}
            <div
                className={classNames(header_class_name, {
                    [`${header_class_name}--hide-title`]: !is_wallet_name_visible,
                })}
            >
                <div className={`${header_class_name}__title-wrapper`}>
                    {is_wallet_name_visible && (
                        <div className={classNames(`${header_class_name}__title`)}>
                            <Text
                                size={is_mobile ? 'xs' : 's'}
                                as='span'
                                className={getStylesByClassName(`${header_class_name}__title-wallet`)}
                            >
                                {wallet_title}
                            </Text>
                            {is_demo ? (
                                <Badge type='contained' background_color='blue' label={getBadgeLabel()} />
                            ) : (
                                <Badge type='bordered' label={getBadgeLabel()} />
                            )}
                        </div>
                    )}
                    <Text
                        as='p'
                        size={is_mobile ? 'xsm' : 'm'}
                        weight='bold'
                        className={getStylesByClassName(`${header_class_name}__title-balance`)}
                    >
                        {formatMoney(currency, balance, true)} {getCurrencyDisplayCode(currency)}
                    </Text>
                </div>
                {is_wallet_name_visible && (
                    <div className={classNames(`${header_class_name}__currency-icon`)}>
                        <Icon {...getCurrencyIconProps()} data_testid='dt_currency_icon' />
                    </div>
                )}
                <div className={classNames(`${header_class_name}__close-icon`)}>
                    <Icon icon={getCloseIcon()} onClick={closeModal} data_testid='dt_close_icon' />
                </div>
            </div>
        </GradientBackground>
    );
};

export default WalletModalHeader;
