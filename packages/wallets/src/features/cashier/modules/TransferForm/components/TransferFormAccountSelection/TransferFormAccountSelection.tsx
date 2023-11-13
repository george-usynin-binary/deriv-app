import React, { useMemo } from 'react';
import classNames from 'classnames';
import { WalletText } from '../../../../../../components';
import { useModal } from '../../../../../../components/ModalProvider';
import useDevice from '../../../../../../hooks/useDevice';
import CloseIcon from '../../../../../../public/images/close-icon.svg';
import type { TAccount, TAccountsList } from '../../types';
import { TransferFormAccountCard } from '../TransferFormAccountCard';
import './TransferFormAccountSelection.scss';

type TProps = {
    accountsList: TAccountsList;
    activeWallet: TAccount;
    fromAccount?: TAccount;
    label: 'Transfer from' | 'Transfer to';
    onSelect: (value?: TAccount) => void;
    selectedAccount?: TAccount;
    toAccount?: TAccount;
};

const TitleLine = () => <div className='wallets-transfer-form-account-selection__title-line' />;

const TransferFormAccountSelection: React.FC<TProps> = ({
    accountsList,
    activeWallet,
    fromAccount,
    label,
    onSelect,
    selectedAccount,
    toAccount,
}) => {
    const { isMobile } = useDevice();
    const modal = useModal();

    const transferToHint = useMemo(() => {
        const isTransferToHintVisible = label === 'Transfer to' && toAccount?.loginid === activeWallet?.loginid;

        return isTransferToHintVisible
            ? `You can only transfers funds from the ${fromAccount?.accountName} to the linked ${activeWallet?.accountName}.`
            : '';
    }, [activeWallet?.accountName, activeWallet?.loginid, fromAccount?.accountName, label, toAccount?.loginid]);

    const isSingleAccountsGroup = useMemo(
        () =>
            (Object.keys(accountsList) as (keyof typeof accountsList)[]).filter(key => accountsList[key].length > 0)
                .length === 1,
        [accountsList]
    );

    return (
        <div className='wallets-transfer-form-account-selection'>
            <div className='wallets-transfer-form-account-selection__header'>
                <WalletText size='md' weight='bold'>
                    {label}
                </WalletText>
                <button className='wallets-transfer-form-account-selection__close-button' onClick={() => modal.hide()}>
                    <CloseIcon />
                </button>
            </div>
            <div className='wallets-transfer-form-account-selection__accounts'>
                {(Object.keys(accountsList) as (keyof typeof accountsList)[]).map((key, index) => {
                    if (accountsList[key].length === 0) return null;

                    const groupTitle =
                        key === 'tradingAccounts'
                            ? `Trading accounts linked with ${activeWallet?.currencyConfig?.display_code} Wallet`
                            : 'Wallets';
                    const isLastAccountsGroup = index === Object.keys(accountsList).length - 1;
                    const shouldShowDivider = !isMobile && !isSingleAccountsGroup && !isLastAccountsGroup;

                    return (
                        <div
                            className={classNames('wallets-transfer-form-account-selection__accounts-group', {
                                'wallets-transfer-form-account-selection__accounts-group--divider': shouldShowDivider,
                            })}
                            key={key}
                        >
                            <div className='wallets-transfer-form-account-selection__accounts-group-title'>
                                <WalletText size='sm' weight='bold'>
                                    {groupTitle}
                                </WalletText>
                                {isMobile && <TitleLine />}
                            </div>
                            {Object.values(accountsList[key]).map(account => (
                                <button
                                    className={classNames('wallets-transfer-form-account-selection__account', {
                                        'wallets-transfer-form-account-selection__account--selected':
                                            account?.loginid === selectedAccount?.loginid,
                                    })}
                                    key={`account-selection-${account?.loginid}`}
                                    onClick={() => {
                                        onSelect(account);
                                        modal.hide();
                                    }}
                                >
                                    <TransferFormAccountCard account={account} activeWallet={activeWallet} />
                                </button>
                            ))}
                        </div>
                    );
                })}
                {transferToHint && (
                    <div className='wallets-transfer-form-account-selection__transfer-to-hint'>
                        <WalletText align='center' as='p' color='primary' size='xs'>
                            {transferToHint}
                        </WalletText>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TransferFormAccountSelection;
