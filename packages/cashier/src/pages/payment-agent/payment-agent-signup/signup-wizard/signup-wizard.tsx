import React from 'react';
import classNames from 'classnames';
import { createPortal } from 'react-dom';
import { Text } from '@deriv/components';
import { Localize, localize } from '@deriv/translations';
import { Wizard } from '@deriv/ui';
import CancelWizardDialog from '../cancel-wizard-dialog';
import SelectCountryStep from '../signup-wizard-steps/select-country-step';
import SelfieStep, { TSelfie } from '../signup-wizard-steps/selfie-step/selfie-step';
import './signup-wizard.scss';

type TSignupWizardProps = {
    closeWizard: VoidFunction;
};

const SignupWizard = ({ closeWizard }: TSignupWizardProps) => {
    const [is_cancel_wizard_dialog_active, setIsCancelWizardDialogActive] = React.useState(false);
    const [current_step_key, setCurrentStepKey] = React.useState<string>();
    const [is_country_selected, setIsCountrySelected] = React.useState(false);
    const [selfie, setSelfie] = React.useState<{ selfie_with_id: TSelfie }>();
    const [is_selfie_step_enabled, setIsSelfieStepEnabled] = React.useState(false);

    const is_final_step = current_step_key === 'complete_step';

    const wizard_root_el = document.getElementById('wizard_root');

    const onClose = () => {
        setIsCancelWizardDialogActive(true);
    };

    const onComplete = () => {
        //handle some logic
        closeWizard();
    };

    const onCountrySelect: React.ComponentProps<typeof SelectCountryStep>['onSelect'] = country => {
        if (country) {
            setIsCountrySelected(true);
        }
    };

    const onChangeStep = (_current_step: number, _current_step_key?: string) => {
        setCurrentStepKey(_current_step_key);
    };

    if (wizard_root_el) {
        return createPortal(
            <>
                <CancelWizardDialog
                    is_visible={is_cancel_wizard_dialog_active}
                    onConfirm={() => closeWizard()}
                    onCancel={() => setIsCancelWizardDialogActive(false)}
                />
                <div
                    className={classNames('pa-signup-wizard', {
                        'pa-signup-wizard--is-cancel-dialog-active': is_cancel_wizard_dialog_active,
                    })}
                >
                    <Wizard
                        has_dark_background
                        lock_final_step={false}
                        onClose={onClose}
                        onComplete={onComplete}
                        wizard_title={localize('Become a payment agent')}
                        primary_button_label={is_final_step ? localize('Submit') : localize('Next')}
                        secondary_button_label={localize('Back')}
                        onChangeStep={onChangeStep}
                    >
                        <Wizard.Step
                            title={localize('Country of issue')}
                            is_fullwidth
                            is_submit_disabled={!is_country_selected}
                        >
                            <SelectCountryStep onSelect={onCountrySelect} />
                        </Wizard.Step>
                        <Wizard.Step
                            title='Selfie verification'
                            is_submit_disabled={!is_selfie_step_enabled}
                            is_fullwidth
                        >
                            <SelfieStep
                                selfie={selfie}
                                setSelfie={setSelfie}
                                setIsSelfieStepEnabled={setIsSelfieStepEnabled}
                            />
                        </Wizard.Step>
                        <Wizard.Step step_key='complete_step' title='Step 3' is_fullwidth>
                            <>
                                <Text as='p' size='m' line-height='m' weight='bold'>
                                    <Localize i18n_default_text='Step 3: Payment agent details' />
                                </Text>
                                <Text as='p' size='xs' line-height='m'>
                                    <Localize i18n_default_text='Please provide your information for verification purposes. If you give us inaccurate information, you may be unable to make deposits or withdrawals.' />
                                </Text>
                            </>
                        </Wizard.Step>
                    </Wizard>
                </div>
            </>,
            wizard_root_el
        );
    }

    return null;
};

export default SignupWizard;
