import { localize } from 'deriv-translations/lib/i18n';
import config       from '../../../../constants';

Blockly.Blocks.ohlc_values = {
    init() {
        this.jsonInit(this.definition());
    },
    definition(){
        return {
            message0: localize('Make a List of %1 values in candles list with interval: %2'),
            args0   : [
                {
                    type   : 'field_dropdown',
                    name   : 'OHLCFIELD_LIST',
                    options: config.ohlcFields,
                },
                {
                    type   : 'field_dropdown',
                    name   : 'CANDLEINTERVAL_LIST',
                    options: config.candleIntervals,
                },
            ],
            output         : 'Array',
            outputShape    : Blockly.OUTPUT_SHAPE_ROUND,
            colour         : Blockly.Colours.Base.colour,
            colourSecondary: Blockly.Colours.Base.colourSecondary,
            colourTertiary : Blockly.Colours.Base.colourTertiary,
            tooltip        : localize('Returns a list of specific values from a candle list according to selected time interval'),
            category       : Blockly.Categories.Tick_Analysis,
        };
    },
    meta(){
        return {
            'display_name': localize('Create a list of candle values (1)'),
            'description' : localize('This block gives you the selected candle value from a list of candles within the selected time interval.'),
        };
    },
};

Blockly.JavaScript.ohlc_values = block => {
    const selectedGranularity = block.getFieldValue('CANDLEINTERVAL_LIST');
    const granularity = selectedGranularity === 'default' ? 'undefined' : selectedGranularity;
    const ohlcField = block.getFieldValue('OHLCFIELD_LIST');

    const code = `Bot.getOhlc({ field: '${ohlcField}', granularity: ${granularity} })`;
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
