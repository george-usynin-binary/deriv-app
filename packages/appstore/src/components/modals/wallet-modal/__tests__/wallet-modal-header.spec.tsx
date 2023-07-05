import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import WalletModalHeader from '../wallet-modal-header';

jest.mock('@deriv/hooks', () => ({
    useCurrencyConfig: () => ({ getConfig: () => ({ display_code: 'USD' }) }),
}));

describe('WalletModalHeader', () => {
    let mocked_props: React.ComponentProps<typeof WalletModalHeader>;

    beforeEach(() => {
        mocked_props = {
            closeModal: jest.fn(),
            is_dark: false,
            is_mobile: false,
            is_wallet_name_visible: true,
            wallet: {
                balance: 1000,
                currency: 'USD',
                gradient_card_class: '',
                gradient_header_class: '',
                icon: 'IcWalletIcon',
                is_crypto: false,
                is_demo: true,
                is_disabled: false,
                is_malta_wallet: false,
                is_selected: true,
                is_virtual: true,
                landing_company_name: 'svg',
                name: 'Demo USD Wallet',
            },
        };
    });

    it('Should render header with proper title, balance, badge and icons', () => {
        render(<WalletModalHeader {...mocked_props} />);

        expect(screen.getByText('Demo USD Wallet')).toBeInTheDocument();
        expect(screen.getByText('Demo')).toBeInTheDocument();
        expect(screen.getByText('1,000.00 USD')).toBeInTheDocument();
        expect(screen.getByTestId('dt_wallet_icon')).toBeInTheDocument();
        expect(screen.getByTestId('dt_close_icon')).toBeInTheDocument();
    });

    it('Should trigger onClose callback when the user clicked on the cross close button', () => {
        render(<WalletModalHeader {...mocked_props} />);

        const el_close_btn = screen.getByTestId('dt_close_icon');
        userEvent.click(el_close_btn);

        expect(mocked_props.closeModal).toHaveBeenCalledTimes(1);
    });
});
