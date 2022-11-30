/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import classNames from 'classnames';
import { Loading } from '@deriv/components';
import { WS } from '@deriv/shared';
import Unsupported from 'Components/poi/status/unsupported';
import OnfidoUpload from './onfido-sdk-view.jsx';
import OnfidoInstruction from 'Components/poi/onfido-instruction';
import { identity_status_codes, submission_status_code, service_code } from './proof-of-identity-utils';
import { IdvDocSubmitOnSignup } from '../../../Components/poi/poi-form-on-signup/idv-doc-submit-on-signup/idv-doc-submit-on-signup.jsx';

const POISubmissionForPaymentAgent = ({
    idv,
    is_from_external,
    is_idv_disallowed,
    onfido,
    onStateChange,
    refreshNotifications,
    selected_country,
    has_idv_error,
}) => {
    const [is_onfido_loading, setIsOnfidoLoading] = React.useState(true);
    const [submission_status, setSubmissionStatus] = React.useState(); // submitting
    const [submission_service, setSubmissionService] = React.useState();
    React.useEffect(() => {
        if (selected_country) {
            const { submissions_left: idv_submissions_left } = idv;
            const { submissions_left: onfido_submissions_left } = onfido;
            const is_idv_supported = selected_country.identity.services.idv.is_country_supported;
            const is_onfido_supported = selected_country.identity.services.onfido.is_country_supported;
            if (is_idv_supported && Number(idv_submissions_left) > 0 && !is_idv_disallowed) {
                setSubmissionService(service_code.idv);
            } else if (onfido_submissions_left && is_onfido_supported) {
                setSubmissionService(service_code.onfido);
            } else {
                setSubmissionService(service_code.manual);
            }
            setSubmissionStatus(submission_status_code.submitting);
        }
    }, [selected_country]);

    const handlePOIComplete = () => {
        if (onStateChange && typeof onStateChange === 'function') {
            onStateChange(identity_status_codes.pending);
        }
        WS.authorized.getAccountStatus().then(() => {
            refreshNotifications();
        });
    };
    const handleIdvSubmit = values => {
        const { document_number, document_type } = values;
        const submit_data = {
            identity_verification_document_add: 1,
            document_number,
            document_type: document_type.id,
            issuing_country: selected_country.value,
        };

        WS.send(submit_data).then(() => {
            handlePOIComplete();
        });
    };

    if (submission_status === submission_status_code.submitting) {
        switch (submission_service) {
            case service_code.idv:
                return (
                    <IdvDocSubmitOnSignup
                        citizen_data={selected_country}
                        onNext={handleIdvSubmit}
                        has_idv_error={has_idv_error}
                    />
                );
            case service_code.onfido: {
                const country_code = selected_country.value;
                const doc_obj = selected_country.identity.services.onfido.documents_supported;
                const documents_supported = Object.keys(doc_obj).map(d => doc_obj[d].display_name);
                return (
                    <>
                        {is_onfido_loading && <Loading is_fullscreen={false} />}
                        <div
                            className={classNames({
                                'payment-agent-poi__onfido-container--hidden': is_onfido_loading,
                            })}
                        >
                            <OnfidoInstruction setIsOnfidoLoading={setIsOnfidoLoading} />
                            <OnfidoUpload
                                country_code={country_code}
                                documents_supported={documents_supported}
                                handleViewComplete={handlePOIComplete}
                                height='auto'
                                is_from_external={is_from_external}
                                refreshNotifications={refreshNotifications}
                                setIsOnfidoLoading={setIsOnfidoLoading}
                            />
                        </div>
                    </>
                );
            }
            case service_code.manual:
                return <Unsupported is_mt5 handlePOIforMT5Complete={handlePOIComplete} />;
            default:
                return null;
        }
    } else {
        return null;
    }
};

export default POISubmissionForPaymentAgent;
