import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { APIProvider, useFetch } from '@deriv/api';
import { StoreProvider, mockStore } from '@deriv/stores';
import AccountInfoWallets from '../wallets/account-info-wallets';

jest.mock('@deriv/api', () => ({
    ...jest.requireActual('@deriv/api'),
    useFetch: jest.fn((name: string) => {
        if (name === 'authorize') {
            return {
                data: {
                    authorize: {
                        account_list: [
                            {
                                account_category: 'wallet',
                                currency: 'USD',
                                is_virtual: 1,
                                is_disabled: 0,
                                loginid: 'CRW909900',
                                linked_to: [{ loginid: 'CR123', platform: 'dtrade' }],
                            },
                            {
                                account_category: 'trading',
                                currency: 'USD',
                                is_virtual: 1,
                                is_disabled: 0,
                                loginid: 'CR123',
                            },
                        ],
                        loginid: 'CR123',
                    },
                },
            };
        } else if (name === 'balance') {
            return {
                data: {
                    balance: {
                        accounts: {
                            CRW909900: {
                                balance: 0,
                            },
                            CR123: {
                                balance: 1234.56,
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
                            AUD: { type: 'fiat', display_code: 'AUD' },
                            BTC: { type: 'crypto', display_code: 'BTC' },
                            ETH: { type: 'crypto', display_code: 'ETH' },
                            UST: { type: 'crypto', display_code: 'UST' },
                            USD: { type: 'fiat', display_code: 'USD' },
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

const mockUseFetch = useFetch as jest.MockedFunction<typeof useFetch<'authorize' | 'balance' | 'website_status'>>;

describe('AccountInfoWallets component', () => {
    const wrapper = (mock: ReturnType<typeof mockStore>) => {
        const Component = ({ children }: { children: JSX.Element }) => {
            return (
                <APIProvider>
                    <StoreProvider store={mock}>{children}</StoreProvider>
                </APIProvider>
            );
        };
        return Component;
    };

    it('should show "disabled_message" when "is_disabled" property is "true"', () => {
        const mock = mockStore({
            ui: {
                account_switcher_disabled_message: 'test disabled message',
            },
        });

        // @ts-expect-error need to come up with a way to mock the return type of useFetch
        mockUseFetch.mockReturnValue({
            data: {
                authorize: {
                    account_list: [
                        {
                            account_category: 'wallet',
                            currency: 'USD',
                            is_virtual: 1,
                            is_disabled: 1,
                            loginid: 'CRW909900',
                            linked_to: [{ loginid: 'CR123', platform: 'dtrade' }],
                        },
                        {
                            account_category: 'trading',
                            currency: 'USD',
                            is_virtual: 1,
                            is_disabled: 1,
                            loginid: 'CR123',
                        },
                    ],
                    loginid: 'CR123',
                },
            },
        });

        const toggleDialog = jest.fn();
        render(<AccountInfoWallets is_dialog_on={false} toggleDialog={toggleDialog} />, { wrapper: wrapper(mock) });

        const popover = screen.getByTestId('dt_popover_wrapper');
        userEvent.hover(popover);
        const disabled_message = screen.getByText(/test disabled message/i);
        expect(disabled_message).toBeInTheDocument();
    });

    it('should have "acc-info--is-disabled" class when "is_disabled" property is "true"', () => {
        const mock = mockStore({
            ui: {
                account_switcher_disabled_message: 'test disabled message',
            },
        });

        // @ts-expect-error need to come up with a way to mock the return type of useFetch
        mockUseFetch.mockReturnValue({
            data: {
                authorize: {
                    account_list: [
                        {
                            account_category: 'wallet',
                            currency: 'USD',
                            is_virtual: 1,
                            is_disabled: 1,
                            loginid: 'CRW909900',
                            linked_to: [{ loginid: 'CR123', platform: 'dtrade' }],
                        },
                        {
                            account_category: 'trading',
                            currency: 'USD',
                            is_virtual: 1,
                            is_disabled: 1,
                            loginid: 'CR123',
                        },
                    ],
                    loginid: 'CR123',
                },
            },
        });

        const toggleDialog = jest.fn();
        render(<AccountInfoWallets is_dialog_on={false} toggleDialog={toggleDialog} />, { wrapper: wrapper(mock) });

        const div_element = screen.getByTestId('dt_acc_info');
        expect(div_element).toHaveClass('acc-info--is-disabled');
    });

    it('should not have "acc-info--show" class when "is_dialog_on" property is "false"', () => {
        const mock = mockStore({});

        const toggleDialog = jest.fn();
        render(<AccountInfoWallets is_dialog_on={false} toggleDialog={toggleDialog} />, { wrapper: wrapper(mock) });

        const div_element = screen.getByTestId('dt_acc_info');
        expect(div_element).not.toHaveClass('acc-info--show');
    });

    it('can not "toggleDialog" when "is_disabled" property is "true"', () => {
        const mock = mockStore({
            ui: {
                account_switcher_disabled_message: 'test disabled message',
            },
        });

        // @ts-expect-error need to come up with a way to mock the return type of useFetch
        mockUseFetch.mockReturnValue({
            data: {
                authorize: {
                    account_list: [
                        {
                            account_category: 'wallet',
                            currency: 'USD',
                            is_virtual: 1,
                            is_disabled: 1,
                            loginid: 'CRW909900',
                            linked_to: [{ loginid: 'CR123', platform: 'dtrade' }],
                        },
                        {
                            account_category: 'trading',
                            currency: 'USD',
                            is_virtual: 1,
                            is_disabled: 1,
                            loginid: 'CR123',
                        },
                    ],
                    loginid: 'CR123',
                },
            },
        });

        const toggleDialog = jest.fn();
        render(<AccountInfoWallets is_dialog_on={false} toggleDialog={toggleDialog} />, { wrapper: wrapper(mock) });

        const div_element = screen.getByTestId('dt_acc_info');
        userEvent.click(div_element);
        expect(toggleDialog).toHaveBeenCalledTimes(0);
    });

    it('should render "Options" icon and "WalletIcon"', () => {
        const mock = mockStore({
            ui: {
                is_mobile: false,
            },
        });

        const toggleDialog = jest.fn();
        render(<AccountInfoWallets is_dialog_on={false} toggleDialog={toggleDialog} />, { wrapper: wrapper(mock) });

        expect(screen.getByTestId('dt_ic_wallet_options')).toBeInTheDocument();
        expect(screen.getByTestId('dt_wallet_icon')).toBeInTheDocument();
    });

    it('should render "DEMO" label', () => {
        const mock = mockStore({
            ui: {
                is_mobile: false,
            },
        });

        const toggleDialog = jest.fn();
        render(<AccountInfoWallets is_dialog_on={false} toggleDialog={toggleDialog} />, { wrapper: wrapper(mock) });

        expect(screen.getByText(/demo/i)).toBeInTheDocument();
    });

    it('should NOT render "SVG" label', () => {
        const mock = mockStore({
            ui: {
                is_mobile: false,
            },
        });

        // @ts-expect-error need to come up with a way to mock the return type of useFetch
        mockUseFetch.mockReturnValue({
            data: {
                authorize: {
                    account_list: [
                        {
                            account_category: 'wallet',
                            currency: 'USD',
                            is_virtual: 0,
                            is_disabled: 0,
                            loginid: 'CRW909900',
                            landing_company_name: 'svg',
                            linked_to: [{ loginid: 'CR123', platform: 'dtrade' }],
                        },
                        {
                            account_category: 'trading',
                            currency: 'USD',
                            is_virtual: 0,
                            is_disabled: 0,
                            loginid: 'CR123',
                            landing_company_name: 'svg',
                        },
                    ],
                    loginid: 'CR123',
                },
            },
        });

        const toggleDialog = jest.fn();
        render(<AccountInfoWallets is_dialog_on={false} toggleDialog={toggleDialog} />, { wrapper: wrapper(mock) });

        expect(screen.queryByText('SVG')).not.toBeInTheDocument();
    });

    it('should render "MALTA" label', () => {
        const mock = mockStore({
            ui: {
                is_mobile: false,
            },
        });

        // @ts-expect-error need to come up with a way to mock the return type of useFetch
        mockUseFetch.mockReturnValue({
            data: {
                authorize: {
                    account_list: [
                        {
                            account_category: 'wallet',
                            currency: 'USD',
                            is_virtual: 0,
                            is_disabled: 0,
                            loginid: 'CRW909900',
                            landing_company_name: 'maltainvest',
                            linked_to: [{ loginid: 'CR123', platform: 'dtrade' }],
                        },
                        {
                            account_category: 'trading',
                            currency: 'USD',
                            is_virtual: 0,
                            is_disabled: 0,
                            loginid: 'CR123',
                            landing_company_name: 'maltainvest',
                        },
                    ],
                    loginid: 'CR123',
                },
            },
        });

        const toggleDialog = jest.fn();
        render(<AccountInfoWallets is_dialog_on={false} toggleDialog={toggleDialog} />, { wrapper: wrapper(mock) });

        expect(screen.queryByText('MALTA')).toBeInTheDocument();
    });

    it('should render "IcLock" icon when "is_disabled" property is "true"', () => {
        const mock = mockStore({
            ui: {
                is_mobile: false,
            },
        });

        // @ts-expect-error need to come up with a way to mock the return type of useFetch
        mockUseFetch.mockReturnValue({
            data: {
                authorize: {
                    account_list: [
                        {
                            account_category: 'wallet',
                            currency: 'USD',
                            is_virtual: 0,
                            is_disabled: 1,
                            loginid: 'CRW909900',
                            landing_company_name: 'svg',
                            linked_to: [{ loginid: 'CR123', platform: 'dtrade' }],
                        },
                        {
                            account_category: 'trading',
                            currency: 'USD',
                            is_virtual: 0,
                            is_disabled: 1,
                            loginid: 'CR123',
                            landing_company_name: 'svg',
                        },
                    ],
                    loginid: 'CR123',
                },
            },
        });

        const toggleDialog = jest.fn();
        render(<AccountInfoWallets is_dialog_on={false} toggleDialog={toggleDialog} />, { wrapper: wrapper(mock) });

        const icon = screen.getByTestId('dt_lock_icon');
        expect(icon).toBeInTheDocument();
    });

    it('should render "IcChevronDownBold" icon when "is_disabled" property is "false"', () => {
        const mock = mockStore({
            ui: {
                is_mobile: false,
            },
        });

        // @ts-expect-error need to come up with a way to mock the return type of useFetch
        mockUseFetch.mockReturnValue({
            data: {
                authorize: {
                    account_list: [
                        {
                            account_category: 'wallet',
                            currency: 'USD',
                            is_virtual: 0,
                            is_disabled: 0,
                            loginid: 'CRW909900',
                            landing_company_name: 'svg',
                            linked_to: [{ loginid: 'CR123', platform: 'dtrade' }],
                        },
                        {
                            account_category: 'trading',
                            currency: 'USD',
                            is_virtual: 0,
                            is_disabled: 0,
                            loginid: 'CR123',
                            landing_company_name: 'svg',
                        },
                    ],
                    loginid: 'CR123',
                },
            },
        });

        const toggleDialog = jest.fn();
        render(<AccountInfoWallets is_dialog_on={false} toggleDialog={toggleDialog} />, { wrapper: wrapper(mock) });

        const icon = screen.getByTestId('dt_select_arrow');
        expect(icon).toBeInTheDocument();
    });

    it('should render balance section when currency exists', () => {
        const mock = mockStore({
            ui: {
                is_mobile: false,
            },
        });

        // @ts-expect-error need to come up with a way to mock the return type of useFetch
        mockUseFetch.mockReturnValue({
            data: {
                authorize: {
                    account_list: [
                        {
                            account_category: 'wallet',
                            currency: 'USD',
                            is_virtual: 0,
                            is_disabled: 0,
                            loginid: 'CRW909900',
                            landing_company_name: 'svg',
                            linked_to: [{ loginid: 'CR123', platform: 'dtrade' }],
                        },
                        {
                            account_category: 'trading',
                            currency: 'USD',
                            is_virtual: 0,
                            is_disabled: 0,
                            loginid: 'CR123',
                            landing_company_name: 'svg',
                        },
                    ],
                    loginid: 'CR123',
                },
            },
        });

        const toggleDialog = jest.fn();
        render(<AccountInfoWallets is_dialog_on={false} toggleDialog={toggleDialog} />, { wrapper: wrapper(mock) });

        const balance_wrapper = screen.queryByTestId('dt_balance');
        expect(balance_wrapper).toBeInTheDocument();
    });

    it('should have "1.234.56 USD" text', () => {
        const mock = mockStore({
            ui: {
                is_mobile: false,
            },
        });

        // @ts-expect-error need to come up with a way to mock the return type of useFetch
        mockUseFetch.mockReturnValue({
            data: {
                authorize: {
                    account_list: [
                        {
                            account_category: 'wallet',
                            currency: 'USD',
                            is_virtual: 0,
                            is_disabled: 0,
                            loginid: 'CRW909900',
                            landing_company_name: 'svg',
                            linked_to: [{ loginid: 'CR123', platform: 'dtrade' }],
                        },
                        {
                            account_category: 'trading',
                            currency: 'USD',
                            is_virtual: 0,
                            is_disabled: 0,
                            loginid: 'CR123',
                            landing_company_name: 'svg',
                        },
                    ],
                    loginid: 'CR123',
                },
                balance: {
                    accounts: {
                        CRW909900: {
                            balance: 0,
                        },
                        CR123: {
                            balance: 1234.56,
                        },
                    },
                },
                website_status: {
                    currencies_config: {
                        AUD: { type: 'fiat', display_code: 'AUD' },
                        BTC: { type: 'crypto', display_code: 'BTC' },
                        ETH: { type: 'crypto', display_code: 'ETH' },
                        UST: { type: 'crypto', display_code: 'UST' },
                        USD: { type: 'fiat', display_code: 'USD' },
                    },
                },
            },
        });

        const toggleDialog = jest.fn();
        render(<AccountInfoWallets is_dialog_on={false} toggleDialog={toggleDialog} />, { wrapper: wrapper(mock) });

        const text = screen.getByText('1,234.56 USD');
        expect(text).toBeInTheDocument();
        expect(screen.queryByText(/no currency assigned/i)).not.toBeInTheDocument();
    });
});
