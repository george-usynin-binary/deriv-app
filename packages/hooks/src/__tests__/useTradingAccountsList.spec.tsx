import * as React from 'react';
import { APIProvider } from '@deriv/api';
import { renderHook } from '@testing-library/react-hooks';
import useTradingAccountsList from '../useTradingAccountsList';

jest.mock('@deriv/api', () => ({
    ...jest.requireActual('@deriv/api'),
    useFetch: jest.fn((name: string) => {
        if (name === 'authorize') {
            return {
                data: {
                    authorize: {
                        account_list: [
                            {
                                account_category: 'trading',
                                currency: 'USD',
                                is_virtual: 1,
                                loginid: 'CR1001',
                            },
                            {
                                account_category: 'trading',
                                currency: 'USD',
                                is_virtual: 0,
                                loginid: 'CR1002',
                            },

                            {
                                account_category: 'trading',
                                currency: 'UST',
                                is_virtual: 0,
                                loginid: 'CR1003',
                            },
                            {
                                account_category: 'trading',
                                currency: 'BTC',
                                is_virtual: 0,
                                loginid: 'CR1004',
                            },
                            {
                                account_category: 'wallet',
                                currency: 'USD',
                                is_virtual: 0,
                                loginid: 'CRW1001',
                            },
                            {
                                account_category: 'wallet',
                                currency: 'BTC',
                                is_virtual: 0,
                                loginid: 'CRW1002',
                            },
                        ],
                    },
                },
            };
        } else if (name === 'balance') {
            return {
                data: {
                    balance: {
                        accounts: {
                            CR1001: {
                                balance: 10000,
                            },
                            CR1002: {
                                balance: 10,
                            },
                            CR1003: {
                                balance: 179,
                            },
                            CR1004: {
                                balance: 15,
                            },
                            CRW1001: {
                                balance: 679,
                            },
                            CRW1002: {
                                balance: 2.34,
                            },
                        },
                    },
                },
            };
        } else if (name === 'website_status') {
            return {
                data: {
                    website_status: {
                        currencies_config: {
                            AUD: { type: 'fiat' },
                            BTC: { type: 'crypto' },
                            ETH: { type: 'crypto' },
                            UST: { type: 'crypto' },
                            USD: { type: 'fiat' },
                        },
                    },
                },
            };
        } else if (name === 'crypto_config') {
            return {
                data: {
                    crypto_config: {
                        currencies_config: {
                            BTC: {
                                minimum_withdrawal: 0.00034286,
                            },
                            ETH: {
                                minimum_withdrawal: 0.02728729,
                            },
                            LTC: {
                                minimum_withdrawal: 0.06032091,
                            },
                            USD: {},
                            USDC: {
                                minimum_withdrawal: 50,
                            },
                            UST: {
                                minimum_withdrawal: 24.99,
                            },
                            eUSDT: {
                                minimum_withdrawal: 50.05,
                            },
                        },
                    },
                },
            };
        }

        return undefined;
    }),
}));

const createWrapper = () => {
    const wrapper = ({ children }: { children: JSX.Element }) => <APIProvider>{children}</APIProvider>;

    return wrapper;
};

describe('useTradingAccountsList', () => {
    test('should return list of 4 accounts for the current account', () => {
        const { result } = renderHook(() => useTradingAccountsList(), { wrapper: createWrapper() });

        expect(result.current.data?.every(account => account.account_category === 'trading')).toEqual(true);
        expect(result.current.data?.length).toEqual(4);
    });

    test('should return correct balance', () => {
        const { result } = renderHook(() => useTradingAccountsList(), { wrapper: createWrapper() });

        expect(result.current.data?.find(account => account.loginid === 'CR1003')?.balance).toEqual(179);
    });
});
