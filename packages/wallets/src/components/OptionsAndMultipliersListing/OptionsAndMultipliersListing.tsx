import React from 'react';
import useDevice from '../../hooks/useDevice';
import IcAppstoreBinaryBot from '../../public/images/ic-appstore-binary-bot.svg';
import IcAppstoreDerivBot from '../../public/images/ic-appstore-deriv-bot.svg';
import IcAppstoreDerivGo from '../../public/images/ic-appstore-deriv-go.svg';
import IcAppstoreDerivTrader from '../../public/images/ic-appstore-deriv-trader.svg';
import IcAppstoreSmartTrader from '../../public/images/ic-appstore-smart-trader.svg';
import { PrimaryActionButton } from '../PrimaryActionButton';
import { TradingAccountCard } from '../TradingAccountCard';
import './OptionsAndMultipliersListing.scss';

const options_and_multipliers = [
    {
        title: 'Deriv Trader',
        description: 'Options and multipliers trading platform.',
        icon: <IcAppstoreDerivTrader />,
    },
    {
        title: 'Deriv Bot',
        description: 'Automate your trading, no coding needed.',
        icon: <IcAppstoreDerivBot />,
    },
    {
        title: 'SmartTrader',
        description: 'Our legacy options trading platform.',
        icon: <IcAppstoreSmartTrader />,
    },
    {
        title: 'Binary Bot',
        description: 'Our legacy automated trading platform.',
        icon: <IcAppstoreBinaryBot />,
    },
    {
        title: 'Deriv GO',
        description: 'Trade on the go with our mobile app.',
        icon: <IcAppstoreDerivGo />,
    },
];

const OptionsAndMultipliersListing = () => {
    const { is_mobile } = useDevice();

    return (
        <div className='wallets-options-and-multipliers-listing'>
            <section className='wallets-options-and-multipliers-listing__header'>
                {!is_mobile && (
                    <div className='wallets-options-and-multipliers-listing__header-title'>
                        {/* TODO: Localization needed*/}
                        <h1>Options & Multipliers</h1>
                    </div>
                )}
                <div className='wallets-options-and-multipliers-listing__header-subtitle'>
                    {/* TODO: Localization needed*/}
                    <h1>
                        Earn a range of payouts by correctly predicting market price movements with{' '}
                        <a key={0} href='#' className='wallets-options-and-multipliers-listing__header-subtitle__link'>
                            options
                        </a>
                        , or get the upside of CFDs without risking more than your initial stake with{' '}
                        <a key={1} href='#' className='wallets-options-and-multipliers-listing__header-subtitle__link'>
                            multipliers
                        </a>
                    </h1>
                </div>
            </section>
            <div className='wallets-options-and-multipliers-listing__content'>
                {options_and_multipliers.map(account => (
                    <TradingAccountCard
                        {...account}
                        key={`trading-account-card-${account.title}`}
                        trailing={() => (
                            <PrimaryActionButton>
                                <p className='wallets-options-and-multipliers-listing__content__text'>Open</p>
                            </PrimaryActionButton>
                        )}
                        leading={() => (
                            <div className='wallets-options-and-multipliers-listing__content__icon'>{account.icon}</div>
                        )}
                    >
                        <div className='wallets-options-and-multipliers-listing__content__details'>
                            <p className='wallets-options-and-multipliers-listing__content__details-title'>
                                {account.title}
                            </p>
                            <p className='wallets-options-and-multipliers-listing__content__details-description'>
                                {account.description}
                            </p>
                        </div>
                    </TradingAccountCard>
                ))}
            </div>
        </div>
    );
};

export default OptionsAndMultipliersListing;
