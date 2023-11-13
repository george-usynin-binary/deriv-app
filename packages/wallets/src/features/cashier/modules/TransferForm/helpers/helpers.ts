import { THooks, TMarketTypes } from '../../../../../types';

type TGetAccountNameProps = {
    accountCategory: THooks.TransferAccount['account_category'];
    accountType: THooks.TransferAccount['account_type'];
    displayCurrencyCode?: THooks.CurrencyConfig['display_code'];
    mt5MarketType: TMarketTypes.SortedMT5Accounts;
};

//TODO: remove this function when market_type will be added to transfer_between_accounts response in API
export const getMarketType = (mt5Group?: string) => {
    if (mt5Group?.includes('financial')) return 'financial';
    if (mt5Group?.includes('synthetic')) return 'synthetic';
    if (mt5Group?.includes('all')) return 'all';
    return 'all';
};

export const getAccountName = ({
    accountCategory,
    accountType,
    displayCurrencyCode,
    mt5MarketType,
}: TGetAccountNameProps) => {
    switch (accountCategory) {
        case 'wallet':
            return `${displayCurrencyCode} Wallet`;
        case 'trading': {
            switch (accountType) {
                case 'binary':
                case 'standard':
                    return 'Deriv Apps';
                case 'dxtrade':
                    return 'Deriv X';
                case 'ctrader':
                    return 'Deriv cTrader';
                case 'derivez':
                    return 'Deriv EZ';
                case 'mt5': {
                    switch (mt5MarketType) {
                        case 'financial':
                            return 'MT5 Financial';
                        case 'synthetic':
                            return 'MT5 Derived';
                        case 'all':
                            return 'MT5 Swap-free';
                        default:
                            return '';
                    }
                }
                default:
                    return '';
            }
        }
        default:
            return '';
    }
};
