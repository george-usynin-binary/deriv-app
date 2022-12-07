import React from 'react';
import { StatesList, StatesListResponse } from '@deriv/api-types';
import {
    Autocomplete,
    Input,
    DesktopWrapper,
    MobileWrapper,
    SelectNative,
    useStateCallback,
    Text,
    Loading,
} from '@deriv/components';
import { Formik, Field, FieldProps } from 'formik';
import { localize, Localize } from '@deriv/translations';
import { WS, validAddress, validPostCode, validLetterSymbol, validLength } from '@deriv/shared';
import { useStore } from '../../../../../../hooks';
import { FileUploaderContainer } from '@deriv/account';
import { TReactChangeEvent } from 'Types';
import './proof-of-address-form.scss';

export type TPOAFormValues = {
    address_line_1: string;
    address_line_2: string;
    address_city: string;
    address_state: string;
    address_postcode: string | number;
};

type TDropedFiles = {
    files: File[];
    error_message: string | null;
};

type TProofOfAddressFormProps = {
    address?: TPOAFormValues;
    onSelect: (value: TPOAFormValues) => void;
    selected_country_id?: string;
};

const validate =
    (errors: Partial<TPOAFormValues>, values: TPOAFormValues) =>
    (fn: (value: string) => string, arr: string[], err_msg: string) => {
        arr.forEach(field => {
            const value = values[field as keyof TPOAFormValues];
            if (!fn(value as string) && !errors[field as keyof TPOAFormValues] && !!err_msg !== true)
                errors[field as keyof TPOAFormValues] = err_msg;
        });
    };

let file_uploader_ref = null;

const ProofOfAddressForm = ({ address, onSelect, selected_country_id }: TProofOfAddressFormProps) => {
    const [form_values, setFormValues] = useStateCallback(address || {});
    const [form_state, setFormState] = useStateCallback({ should_show_form: true });
    const [document_file, setDocumentFile] = React.useState<TDropedFiles>({ files: [], error_message: null });
    const [states_list, setStatesList] = React.useState<StatesList>();
    const [is_loading, setIsLoading] = React.useState(true);
    const {
        client: { fetchStatesList },
    } = useStore();

    React.useEffect(() => {
        fetchStatesList(selected_country_id).then((response: StatesListResponse) => {
            setStatesList(response.states_list);
            setIsLoading(false);
        });
    }, [selected_country_id, fetchStatesList]);

    const { address_line_1, address_line_2, address_city, address_state, address_postcode } = form_values;

    const form_initial_values = {
        address_line_1,
        address_line_2,
        address_city,
        address_state,
        address_postcode,
    };

    const validateFields = (values: TPOAFormValues) => {
        setFormState({ ...form_state, ...{ should_allow_submit: false } });
        const errors: Partial<TPOAFormValues> = {};
        const validateValues = validate(errors, values);

        const required_fields = ['address_line_1', 'address_city'];
        validateValues(val => val, required_fields, localize('This field is required'));

        const permitted_characters = ". , ' : ; ( ) @ # / -";
        const address_validation_message = localize(
            'Use only the following special characters: {{ permitted_characters }}',
            {
                permitted_characters,
                interpolation: { escapeValue: false },
            }
        );

        if (values.address_line_1 && !validAddress(values.address_line_1)) {
            errors.address_line_1 = address_validation_message;
        }
        if (values.address_line_2 && !validAddress(values.address_line_2)) {
            errors.address_line_2 = address_validation_message;
        }

        const validation_letter_symbol_message = localize(
            'Only letters, space, hyphen, period, and apostrophe are allowed.'
        );

        if (values.address_city && !validLetterSymbol(values.address_city)) {
            errors.address_city = validation_letter_symbol_message;
        }

        // only add state/province validation for countries that don't have states list fetched from API
        if (values.address_state && !validLetterSymbol(values.address_state) && states_list && states_list.length < 1) {
            errors.address_state = validation_letter_symbol_message;
        }

        if (values.address_postcode) {
            if (!validLength(values.address_postcode, { min: 0, max: 20 })) {
                errors.address_postcode = localize('Please enter a {{field_name}} under {{max_number}} characters.', {
                    field_name: localize('Postal/ZIP code'),
                    max_number: 20,
                    interpolation: { escapeValue: false },
                });
            } else if (!validPostCode(values.address_postcode)) {
                errors.address_postcode = localize('Only letters, numbers, space, and hyphen are allowed.');
            }
        }

        return errors;
    };

    const onSubmitValues = (values: TPOAFormValues) => {
        onSelect(values);
    };

    if (is_loading) return <Loading is_fullscreen />;

    return (
        <Formik initialValues={form_initial_values} onSubmit={onSubmitValues} validate={validateFields}>
            {({ values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue }) => (
                <form className='pa-signup-wizard__step-address' noValidate onSubmit={handleSubmit}>
                    <div className='pa-signup-wizard__step-form-container'>
                        <fieldset>
                            <Input
                                data-lpignore='true'
                                autoComplete='off' // prevent chrome autocomplete
                                type='text'
                                maxLength={70}
                                name='address_line_1'
                                label={localize('First line of address*')}
                                value={values.address_line_1}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.address_line_1 && errors.address_line_1}
                                required
                            />
                        </fieldset>
                        <fieldset>
                            <Input
                                data-lpignore='true'
                                autoComplete='off' // prevent chrome autocomplete
                                type='text'
                                maxLength={70}
                                name='address_line_2'
                                label={localize('Second line of address (optional)')}
                                value={values.address_line_2}
                                error={touched.address_line_2 && errors.address_line_2}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </fieldset>
                        <fieldset>
                            <Input
                                data-lpignore='true'
                                autoComplete='off' // prevent chrome autocomplete
                                type='text'
                                name='address_city'
                                label={localize('Town/City*')}
                                value={values.address_city}
                                error={touched.address_city && errors.address_city}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                required
                            />
                        </fieldset>
                        <fieldset>
                            {states_list && states_list.length ? (
                                <React.Fragment>
                                    <DesktopWrapper>
                                        <Field name='address_state'>
                                            {({ field }: FieldProps<string>) => (
                                                <Autocomplete
                                                    {...field}
                                                    data-lpignore='true'
                                                    autoComplete='new-password' // prevent chrome autocomplete
                                                    type='text'
                                                    label={localize('State/Province*')}
                                                    error={touched.address_state && errors.address_state}
                                                    list_items={states_list}
                                                    onItemSelection={({
                                                        value,
                                                        text,
                                                    }: {
                                                        value: string;
                                                        text: string;
                                                    }) => setFieldValue('address_state', value ? text : '', true)}
                                                />
                                            )}
                                        </Field>
                                    </DesktopWrapper>
                                    <MobileWrapper>
                                        <SelectNative
                                            placeholder={localize('Please select*')}
                                            label={localize('State/Province*')}
                                            value={values.address_state}
                                            list_items={states_list}
                                            error={touched.address_state && errors.address_state}
                                            use_text={true}
                                            onChange={(e: TReactChangeEvent) =>
                                                setFieldValue('address_state', e.target.value, true)
                                            }
                                        />
                                    </MobileWrapper>
                                </React.Fragment>
                            ) : (
                                <Input
                                    data-lpignore='true'
                                    autoComplete='off' // prevent chrome autocomplete
                                    type='text'
                                    name='address_state'
                                    label={localize('State/Province*')}
                                    value={values.address_state}
                                    error={touched.address_state && errors.address_state}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    required
                                />
                            )}
                        </fieldset>
                        <fieldset>
                            <Input
                                data-lpignore='true'
                                autoComplete='off' // prevent chrome autocomplete
                                type='text'
                                name='address_postcode'
                                label={localize('Postal/ZIP code*')}
                                value={values.address_postcode}
                                error={touched.address_postcode && errors.address_postcode}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                required
                            />
                        </fieldset>
                    </div>

                    <div className='pa-signup-wizard__step-address-upload-section'>
                        <Text as='p' weight='bold' size='xs' color='prominent' line-height='m'>
                            <Localize i18n_default_text='Please upload one of the following:' />
                        </Text>
                        <ul className='pa-signup-wizard__step-address-upload-section-list'>
                            <li>
                                <Text as='p' size='xs' color='less-prominent' line-height='m'>
                                    <Localize i18n_default_text='A recent utility bill (e.g. electricity, water, gas, phone or internet).' />
                                </Text>
                            </li>
                            <li>
                                <Text as='p' size='xs' color='less-prominent' line-height='m'>
                                    <Localize i18n_default_text='A recent bank statement or government-issued letter with your name and address.' />
                                </Text>
                            </li>
                        </ul>
                        <div className='pa-signup-wizard__step-form-container'>
                            <FileUploaderContainer
                                onRef={(ref: unknown) => (file_uploader_ref = ref)}
                                onFileDrop={(df: TDropedFiles) =>
                                    setDocumentFile({ files: df.files, error_message: df.error_message })
                                }
                                getSocket={WS.getSocket}
                            />
                        </div>
                    </div>
                </form>
            )}
        </Formik>
    );
};

export default ProofOfAddressForm;
