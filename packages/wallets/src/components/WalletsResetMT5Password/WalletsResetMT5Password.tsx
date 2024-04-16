import React, { useEffect, useState } from 'react';
import { Trans } from 'react-i18next';
import { useTradingPlatformInvestorPasswordReset, useTradingPlatformPasswordReset } from '@deriv/api-v2';
import { CFD_PLATFORMS, PlatformDetails } from '../../features/cfd/constants';
import useDevice from '../../hooks/useDevice';
import { TPlatforms } from '../../types';
import { validPassword } from '../../utils/password-validation';
import { ModalWrapper, WalletButton, WalletPasswordFieldLazy, WalletText } from '../Base';
import { useModal } from '../ModalProvider';
import WalletSuccessResetMT5Password from './WalletSuccessResetMT5Password';
import './WalletsResetMT5Password.scss';

type WalletsResetMT5PasswordProps = {
    actionParams: string;
    isInvestorPassword?: boolean;
    platform: Exclude<TPlatforms.All, 'ctrader'>;
    verificationCode: string;
};

const WalletsResetMT5Password = ({
    actionParams,
    isInvestorPassword = false,
    platform,
    verificationCode,
}: WalletsResetMT5PasswordProps) => {
    const { title } = PlatformDetails[platform];
    const {
        isError: isChangePasswordError,
        isLoading: isChangePasswordLoading,
        isSuccess: isChangePasswordSuccess,
        mutate: changePassword,
    } = useTradingPlatformPasswordReset();
    const {
        isError: isChangeInvestorPasswordError,
        isLoading: isChangeInvestorPasswordLoading,
        isSuccess: isChangeInvestorPasswordSuccess,
        mutate: changeInvestorPassword,
    } = useTradingPlatformInvestorPasswordReset();

    const { hide, show } = useModal();
    const [password, setPassword] = useState('');
    const { isMobile } = useDevice();

    const handleSubmit = () => {
        if (isInvestorPassword) {
            const accountId = localStorage.getItem('trading_platform_investor_password_reset_account_id') ?? '';
            changeInvestorPassword({
                account_id: accountId,
                new_password: password,
                platform: 'mt5',
                verification_code: verificationCode,
            });
        } else {
            changePassword({
                new_password: password,
                platform,
                verification_code: verificationCode,
            });
        }
    };

    const description = {
        [CFD_PLATFORMS.DXTRADE]:
            'Strong passwords contain at least 8 characters, combine uppercase and lowercase letters, numbers, and symbols.',
        [CFD_PLATFORMS.MT5]:
            'Your password must contain between 8-16 characters that include uppercase and lowercase letters, and at least one number and special character such as ( _ @ ? ! / # ).',
    } as const;

    const isMT5 = platform === CFD_PLATFORMS.MT5;

    useEffect(() => {
        if (isChangePasswordSuccess) {
            localStorage.removeItem(`verification_code.${actionParams}`); // TODO:Remove verification code from local storage
            show(<WalletSuccessResetMT5Password title={title} />);
        } else if (isChangePasswordError) {
            hide();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [platform, title, actionParams, isChangePasswordSuccess, isChangePasswordError]);

    useEffect(() => {
        if (isChangeInvestorPasswordSuccess) {
            localStorage.removeItem(`verification_code.${actionParams}`); // TODO:Remove verification code from local storage
            show(<WalletSuccessResetMT5Password isInvestorPassword title={title} />);
        } else if (isChangeInvestorPasswordError) {
            hide();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [platform, title, actionParams, isChangeInvestorPasswordSuccess, isChangeInvestorPasswordError]);

    return (
        <ModalWrapper hideCloseButton={isMobile}>
            <div className='wallets-reset-mt5-password'>
                <WalletText weight='bold'>
                    Create a new {title} {isInvestorPassword && 'investor'} Password
                </WalletText>
                {isMT5 && !isInvestorPassword && (
                    <WalletText size='sm'>You can use this password for all your {title} accounts.</WalletText>
                )}
                <WalletPasswordFieldLazy
                    label={isInvestorPassword ? 'New investor password' : `${title} password`}
                    onChange={e => setPassword(e.target.value)}
                    password={password}
                />
                <WalletText size='sm'>{description[platform]}</WalletText>
                <div className='wallets-reset-mt5-password__button-group'>
                    <WalletButton onClick={() => hide()} variant='outlined'>
                        <Trans defaults='Cancel' />
                    </WalletButton>
                    <WalletButton
                        disabled={!validPassword(password)}
                        isLoading={isChangeInvestorPasswordLoading || isChangePasswordLoading}
                        onClick={handleSubmit}
                        variant='contained'
                    >
                        <Trans defaults='Create' />
                    </WalletButton>
                </div>
            </div>
        </ModalWrapper>
    );
};

export default WalletsResetMT5Password;
