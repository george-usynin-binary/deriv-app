import PropTypes from 'prop-types';
import classNames from 'classnames';
import React from 'react';
import { ExpansionPanel } from '@deriv/components';
import PaymentAgentCardDescription from './payment-agent-card-description.jsx';
import PaymentAgentCardDepositDetails from './paymen-agent-card-deposit-details.jsx';
import PaymentAgentCardWithdrawalDetails from './payment-agent-card-withdrawal-details.jsx';
import './payment-agent-card.scss';

const PaymentAgentCard = ({ is_dark_mode_on, is_deposit, payment_agent }) => {
    const message = {
        header: <PaymentAgentCardDescription is_dark_mode_on payment_agent={payment_agent} />,
        content: is_deposit ? (
            <PaymentAgentCardDepositDetails payment_agent={payment_agent} />
        ) : (
            <PaymentAgentCardWithdrawalDetails payment_agent={payment_agent} />
        ),
    };
    return (
        <div
            className={classNames('payment-agent-card', {
                'payment-agent-card--dark': is_dark_mode_on,
            })}
        >
            <ExpansionPanel message={message} />
        </div>
    );
};

PaymentAgentCard.propTypes = {
    is_dark_mode_on: PropTypes.bool,
    is_deposit: PropTypes.bool,
    payment_agent: PropTypes.object,
};

export default PaymentAgentCard;
