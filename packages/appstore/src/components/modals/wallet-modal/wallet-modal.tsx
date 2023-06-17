import React from 'react';
import { Modal } from '@deriv/components';
import { getCurrencyDisplayCode } from '@deriv/shared';
import { localize } from '@deriv/translations';
import WalletModalHeader from './wallet-modal-header';
import WalletModalBody from './wallet-modal-body';
import { observer, useStore } from '@deriv/stores';
import type { TWalletType } from './provider';

// TODO: remove this type when we can use real current wallet object
export type TWallet = {
    balance: string | number | undefined;
    currency: string;
    is_crypto: boolean;
    is_demo: boolean;
    name: string;
    shortcode: string;
    wallet_type: TWalletType;
};

const WalletModal = observer(() => {
    const store = useStore();
    const {
        client: { balance, currency, is_crypto, landing_company_shortcode: shortcode },
        ui: { is_dark_mode_on, is_wallet_modal_visible, is_mobile, setIsWalletModalVisible },
        traders_hub: { is_demo },
    } = store;

    // TODO: Replace this object with current wallet
    const wallet = {
        balance,
        currency,
        shortcode,
        is_crypto: is_crypto(currency),
        is_demo,
        name: `${is_demo ? localize('Demo') : ''} ${getCurrencyDisplayCode(currency)} ${localize('Wallet')}`,
        wallet_type: (is_demo ? 'demo' : 'real') as TWalletType,
    };

    const [active_tab_index, setActiveTabIndex] = React.useState<number>(0);
    const [is_wallet_name_visible, setIsWalletNameVisible] = React.useState<boolean>(true);

    React.useEffect(() => {
        return setIsWalletNameVisible(true);
    }, [active_tab_index, is_wallet_modal_visible]);

    const closeModal = () => {
        setIsWalletModalVisible(false);
        setActiveTabIndex(0);
    };

    const contentScrollHandler = React.useCallback(
        (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
            if (is_mobile && is_wallet_modal_visible) {
                const target = e.target as HTMLDivElement;
                setIsWalletNameVisible(!(target.scrollTop > 0));
            }
        },
        [is_mobile, is_wallet_modal_visible]
    );

    return (
        <Modal is_open={is_wallet_modal_visible} className='wallet-modal' portalId='deriv_app'>
            <WalletModalHeader
                wallet={wallet}
                closeModal={closeModal}
                is_dark={is_dark_mode_on}
                is_mobile={is_mobile}
                is_wallet_name_visible={is_wallet_name_visible}
            />
            <WalletModalBody
                active_tab_index={active_tab_index}
                contentScrollHandler={contentScrollHandler}
                is_dark={is_dark_mode_on}
                is_mobile={is_mobile}
                is_wallet_name_visible={is_wallet_name_visible}
                setActiveTabIndex={setActiveTabIndex}
                setIsWalletNameVisible={setIsWalletNameVisible}
                wallet={wallet}
            />
        </Modal>
    );
});

export default WalletModal;
