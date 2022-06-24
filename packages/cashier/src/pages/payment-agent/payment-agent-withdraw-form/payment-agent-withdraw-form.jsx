import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { Field, Formik, Form } from 'formik';
import { Button, Icon, Input, Text } from '@deriv/components';
import { getDecimalPlaces, getCurrencyDisplayCode, validNumber, website_name } from '@deriv/shared';
import { localize, Localize } from '@deriv/translations';
import { connect } from 'Stores/connect';
import ErrorDialog from 'Components/error-dialog';
import './payment-agent-withdraw-form.scss';

const validateWithdrawal = (values, { balance, currency }) => {
    const errors = {};

    const { is_ok, message } = validNumber(values.amount, {
        type: 'float',
        decimals: getDecimalPlaces(currency),
    });

    if (!values.amount) {
        errors.amount = localize('This field is required.');
    } else if (!is_ok) {
        errors.amount = message;
    } else if (+balance < +values.amount) {
        errors.amount = localize('Insufficient balance.');
    } else if (!values.account_number) {
        errors.account_number = localize('This field is required.');
    } else if (!values.account_number.startsWith('CR')) {
        errors.account_number = localize('Please enter a valid account number. Example: CR123456789');
    }

    return errors;
};

const PaymentAgentWithdrawForm = ({
    balance,
    currency,
    error,
    onMount,
    requestTryPaymentAgentWithdraw,
    verification_code,
    setIsUnlistedWithdraw,
}) => {
    React.useEffect(() => {
        onMount();
    }, [onMount]);

    const validateWithdrawalPassthrough = values => validateWithdrawal(values, { balance, currency });

    const onWithdrawalPassthrough = async (values, actions) => {
        const payment_agent_withdraw = await requestTryPaymentAgentWithdraw({
            loginid: values.account_number,
            currency,
            amount: values.amount,
            verification_code,
        });
        if (payment_agent_withdraw?.error) {
            actions.setSubmitting(false);
        }
    };

    return (
        <div className='payment-agent-withdraw-form'>
            <div className='payment-agent-withdraw-form__page-return'>
                <Icon icon='icArrowLeftBold' onClick={() => setIsUnlistedWithdraw(false)} />
                <Text as='p' line_height='m' size='xs' weight='bold'>
                    <Localize i18n_default_text='Back to list' />
                </Text>
            </div>

            <Formik
                initialValues={{
                    account_number: '',
                    amount: '',
                }}
                validate={validateWithdrawalPassthrough}
                onSubmit={onWithdrawalPassthrough}
            >
                {({ errors, isSubmitting, isValid, touched }) => {
                    return (
                        <Form className='payment-agent-withdraw-form__form'>
                            <Field name='account_number'>
                                {({ field }) => (
                                    <Input
                                        {...field}
                                        type='text'
                                        className='payment-agent-withdraw-form__form-account-number'
                                        label={localize('Enter the payment agent account number')}
                                        error={touched.account_number && errors.account_number}
                                        hint={localize('Example: CR123456789')}
                                        required
                                        autoComplete='off'
                                        maxLength='30'
                                    />
                                )}
                            </Field>
                            <div className='payment-agent-withdraw-form__form-amount'>
                                <Field name='amount'>
                                    {({ field }) => (
                                        <Input
                                            {...field}
                                            type='text'
                                            label={localize('Enter amount')}
                                            error={touched.amount && errors.amount}
                                            required
                                            autoComplete='off'
                                            maxLength='30'
                                            trailing_icon={
                                                <span
                                                    className={classNames(
                                                        'symbols',
                                                        `symbols--${currency.toLowerCase()}`
                                                    )}
                                                >
                                                    {getCurrencyDisplayCode(currency)}
                                                </span>
                                            }
                                        />
                                    )}
                                </Field>
                                <Button type='submit' is_disabled={!isValid || isSubmitting} primary large>
                                    <Localize i18n_default_text='Continue' />
                                </Button>
                            </div>
                            <ErrorDialog error={error} />
                        </Form>
                    );
                }}
            </Formik>
            <Text as='p' color='less-prominent' line_height='s' size='xxs'>
                <Localize
                    i18n_default_text='Note: {{website_name}} does not charge any transfer fees.'
                    values={{ website_name }}
                />
            </Text>
        </div>
    );
};

PaymentAgentWithdrawForm.propTypes = {
    balance: PropTypes.string,
    currency: PropTypes.string,
    error: PropTypes.object,
    onMount: PropTypes.func,
    requestTryPaymentAgentWithdraw: PropTypes.func,
    verification_code: PropTypes.string,
    setIsUnlistedWithdraw: PropTypes.func,
};

export default connect(({ client, modules }) => ({
    balance: client.balance,
    currency: client.currency,
    error: modules.cashier.payment_agent.error,
    onMount: modules.cashier.payment_agent.onMountPaymentAgentWithdraw,
    requestTryPaymentAgentWithdraw: modules.cashier.payment_agent.requestTryPaymentAgentWithdraw,
    verification_code: client.verification_code.payment_agent_withdraw,
}))(PaymentAgentWithdrawForm);
