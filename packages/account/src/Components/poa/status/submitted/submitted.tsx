import React from 'react';
import classNames from 'classnames';
import { Icon, Text } from '@deriv/components';
import { localize } from '@deriv/translations';
import { PlatformContext } from '@deriv/shared';
import { TPlatformContext, TPoaStatusProps } from 'Types';
import { ContinueTradingButton } from 'Components/poa/continue-trading-button/continue-trading-button';
import PoiButton from 'Components/poi/poi-button';
import IconMessageContent from 'Components/icon-message-content';

export const Submitted = ({ is_pa_signup, needs_poi, is_description_enabled = true }: TPoaStatusProps) => {
    const { is_appstore }: TPlatformContext = React.useContext(PlatformContext);
    const message = localize('Your documents were submitted successfully');
    if (is_pa_signup) {
        return (
            <div className='submission-container'>
                <Icon
                    icon='IcCheckmarkCircle'
                    custom_color='var(--status-success)'
                    size={72}
                    className='submission-container__icon'
                />
                <Text align='center' size='s' as='p' weight='bold' className='submission-container__title'>
                    {localize('Identity verification submitted successfully!')}
                </Text>
                <Text
                    align='center'
                    size='xxs'
                    as='p'
                    color='less-prominent'
                    className='submission-container__description'
                >
                    {localize(
                        'Note: As your identity verification is submitted and under review, you will not be able to make any further changes.'
                    )}
                </Text>
            </div>
        );
    }
    if (needs_poi) {
        return (
            <div
                className={classNames('account-management__container', {
                    'account-management__container-dashboard': is_appstore,
                })}
            >
                <IconMessageContent
                    message={message}
                    icon={<Icon icon='IcPoaVerified' size={128} />}
                    full_width={is_appstore}
                >
                    <div className='account-management__text-container'>
                        <Text align='center' size='xs' as='p'>
                            {localize('We’ll review your documents and notify you of its status within 1 to 3 days.')}
                        </Text>
                        <Text align='center' size='xs' as='p'>
                            {localize('You must also submit a proof of identity.')}
                        </Text>
                    </div>
                    <PoiButton />
                </IconMessageContent>
            </div>
        );
    }
    return (
        <div
            className={classNames('account-management__container', {
                'account-management__container-dashboard': is_appstore,
            })}
        >
            <IconMessageContent
                message={message}
                text={localize('We’ll review your documents and notify you of its status within 1 to 3 days.')}
                icon={<Icon icon='IcPoaVerified' size={128} />}
                full_width={is_appstore}
            >
                {!is_description_enabled && <ContinueTradingButton />}
            </IconMessageContent>
        </div>
    );
};
