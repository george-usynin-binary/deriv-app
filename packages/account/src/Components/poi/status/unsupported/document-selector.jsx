import React from 'react';
import { DesktopWrapper, Dropdown, MobileWrapper, SelectNative, Text } from '@deriv/components';
import { localize } from '@deriv/translations';

const DocumentSelector = ({ country_code, onChange, selected_document_index }) => {
    const document_list = React.useMemo(
        () => [
            { text: localize('Passport'), value: '0' },
            { text: localize('Driving licence'), value: '1' },
            { text: localize('Identity card'), value: '2' },
            ...(country_code === 'ng' ? [{ text: localize('NIMC slip and proof of age'), value: '3' }] : []),
        ],
        [country_code]
    );

    const selected_document = React.useMemo(
        () => document_list.find(document => document.value === selected_document_index),
        [document_list, selected_document_index]
    );

    return (
        <>
            <Text as='p' line-height='m' size='xs'>
                {localize('Please select one of the following documents:')}
            </Text>
            <DesktopWrapper>
                <Dropdown
                    is_align_text_left
                    name='document_types'
                    list={document_list}
                    placeholder={localize('Document type')}
                    value={selected_document?.value}
                    onChange={onChange}
                />
            </DesktopWrapper>
            <MobileWrapper>
                <SelectNative
                    name='document_types'
                    label={localize('Document type')}
                    list_items={document_list}
                    placeholder={localize('Please select')}
                    value={selected_document?.value}
                    onChange={e =>
                        onChange({
                            target: {
                                name: 'document_types',
                                value: e.target.value,
                            },
                        })
                    }
                />
            </MobileWrapper>
        </>
    );
};

export default React.memo(DocumentSelector);
