import React from 'react';
import { CTraderList } from '../CTraderList';
import { MT5List } from '../MT5List';
import { OtherCFDPlatformsList } from '../OtherCFDPlatformsList';
import './CFDList.scss';

const CFDList = () => {
    return (
        <div className='wallets-cfd-list'>
            <section className='wallets-cfd-list__header'>
                <div className='wallets-cfd-list__header-title'>
                    <h1>CFDs</h1>
                </div>
                <div className='wallets-cfd-list__header-description'>
                    <h1>
                        Trade with leverage and tight spreads for better returns on trades.{' '}
                        <a href='#' className='wallets-cfd-list__header-description__link'>
                            Learn more
                        </a>
                    </h1>
                </div>
            </section>
            <MT5List />
            <CTraderList />
            <OtherCFDPlatformsList />
        </div>
    );
};

export default CFDList;
