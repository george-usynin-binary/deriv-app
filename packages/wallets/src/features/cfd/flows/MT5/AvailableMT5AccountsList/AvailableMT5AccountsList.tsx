import React, { useCallback } from 'react';
import { useActiveWalletAccount, useMT5AccountsList, useTradingPlatformStatus } from '@deriv/api-v2';
import { LabelPairedChevronRightCaptionRegularIcon } from '@deriv/quill-icons';
import { useTranslations } from '@deriv-com/translations';
import { Text } from '@deriv-com/ui';
import { TradingAccountCard, WalletText } from '../../../../../components';
import { useModal } from '../../../../../components/ModalProvider';
import { THooks } from '../../../../../types';
import { getMarketTypeDetails, MARKET_TYPE, TRADING_PLATFORM_STATUS } from '../../../constants';
import { JurisdictionModal, MT5PasswordModal, TradingPlatformStatusModal } from '../../../modals';
import './AvailableMT5AccountsList.scss';

type TProps = {
    account: THooks.SortedMT5Accounts;
};

const AvailableMT5AccountsList: React.FC<TProps> = ({ account }) => {
    const { data: activeWallet } = useActiveWalletAccount();
    const { getPlatformStatus } = useTradingPlatformStatus();
    const { localize } = useTranslations();
    const { setModalState, show } = useModal();
    const { description, title } = getMarketTypeDetails(localize)[account.market_type || MARKET_TYPE.ALL];
    const { data: mt5Accounts } = useMT5AccountsList();
    const platformStatus = getPlatformStatus(account.platform);
    const hasUnavailableAccount = mt5Accounts?.some(account => account.status === 'unavailable');

    const onButtonClick = useCallback(() => {
        if (hasUnavailableAccount) return show(<TradingPlatformStatusModal isServerMaintenance={false} />);

        switch (platformStatus) {
            case TRADING_PLATFORM_STATUS.MAINTENANCE:
                return show(<TradingPlatformStatusModal isServerMaintenance />);
            case TRADING_PLATFORM_STATUS.UNAVAILABLE:
                return show(<TradingPlatformStatusModal />);
            case TRADING_PLATFORM_STATUS.ACTIVE:
            default:
                activeWallet?.is_virtual
                    ? show(
                          <MT5PasswordModal
                              marketType={account?.market_type || MARKET_TYPE.SYNTHETIC}
                              platform={account.platform}
                          />
                      )
                    : show(<JurisdictionModal />);
                setModalState('marketType', account.market_type);
                break;
        }
    }, [
        hasUnavailableAccount,
        show,
        platformStatus,
        account.platform,
        account.market_type,
        activeWallet?.is_virtual,
        setModalState,
    ]);

    return (
        <TradingAccountCard
            leading={
                <div className='wallets-available-mt5__icon'>
                    {getMarketTypeDetails(localize)[account.market_type || MARKET_TYPE.ALL].icon}
                </div>
            }
            onClick={onButtonClick}
            trailing={
                <div className='wallets-available-mt5__chevron'>
                    <LabelPairedChevronRightCaptionRegularIcon width={16} />
                </div>
            }
        >
            <div className='wallets-available-mt5__details'>
                <Text className='wallets-available-mt5__description' size='sm'>
                    {title}
                </Text>
                <Text className='wallets-available-mt5__description' size='xs'>
                    {description}
                </Text>
            </div>
        </TradingAccountCard>
    );
};

export default AvailableMT5AccountsList;
