import React from 'react';
import { isMobile } from '@deriv/shared';
import Icon from '../icon/icon';
import Text from '../text';
import './legacy-inline-message.scss';

const type_to_icon_mapper = {
    warning: 'IcWalletWarningMessage',
    information: 'IcWalletInfoMessage',
    success: 'IcWalletSuccessMessage',
    error: 'IcWalletDangerMessage',
};

type TProps = {
    type?: 'warning' | 'information' | 'success' | 'error';
    message: React.ReactNode;
};

const LegacyInlineMessage = ({ type = 'warning', message }: TProps) => {
    const icon = type_to_icon_mapper[type];

    return (
        <div className={`legacy-inline-message__container legacy-inline-message__${type}`}>
            <div className='legacy-inline-message'>
                <Icon size={16} icon={icon} />
                <Text size={isMobile() ? 'xxs' : 'xs'}>{message}</Text>
            </div>
        </div>
    );
};

export default LegacyInlineMessage;
