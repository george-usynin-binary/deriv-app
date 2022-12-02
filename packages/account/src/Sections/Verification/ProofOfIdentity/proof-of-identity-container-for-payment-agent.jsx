import React from 'react';
import POISubmissionForPaymentAgent from './proof-of-identity-submission-for-payment-agent.jsx';
import { service_code } from './proof-of-identity-utils';
import { populateVerificationStatus } from '../Helpers/verification';

const ProofOfIdentityContainerForPaymentAgent = ({
    account_status,
    height,
    is_from_external,
    // onStateChange,
    refreshNotifications,
    selected_country,
    setIDVValues,
}) => {
    const verification_status = populateVerificationStatus(account_status);
    const { idv, has_attempted_idv, identity_last_attempt, is_idv_disallowed, manual, needs_poa, onfido } =
        verification_status;

    const poi_resubmission_cases = ['rejected', 'suspected', 'expired'];

    const has_idv_error =
        identity_last_attempt?.service && service_code.idv && poi_resubmission_cases.includes(idv.status);

    return (
        <POISubmissionForPaymentAgent
            has_attempted_idv={has_attempted_idv}
            has_idv_error={has_idv_error}
            height={height ?? null}
            identity_last_attempt={identity_last_attempt}
            idv={idv}
            is_from_external={!!is_from_external}
            is_idv_disallowed={is_idv_disallowed}
            manual={manual}
            needs_poa={needs_poa}
            onfido={onfido}
            onStateChange={() => {}}
            refreshNotifications={refreshNotifications}
            selected_country={selected_country}
            setIDVValues={setIDVValues}
        />
    );
};

export default ProofOfIdentityContainerForPaymentAgent;
