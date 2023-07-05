import React from 'react';
import WalletTransfer from '../wallet-transfer';
import { APIProvider } from '@deriv/api';
import { mockStore, StoreProvider } from '@deriv/stores';
import { render, screen } from '@testing-library/react';

jest.mock('@deriv/components', () => ({
    ...jest.requireActual('@deriv/components'),
    AmountInput: () => <div>AmountInput</div>,
    TransferAccountSelector: () => <div>TransferAccountSelector</div>,
}));

describe('WalletTransfer', () => {
    const mocked_store = mockStore({});

    it('Should render two amount inputs and two transfer account selectors', () => {
        render(
            <APIProvider>
                <StoreProvider store={mocked_store}>
                    <WalletTransfer
                        contentScrollHandler={jest.fn()}
                        is_wallet_name_visible={false}
                        setIsWalletNameVisible={jest.fn()}
                    />
                </StoreProvider>
            </APIProvider>
        );

        expect(screen.getAllByText('AmountInput').length).toBe(2);
        expect(screen.getAllByText('TransferAccountSelector').length).toBe(2);
    });
});
