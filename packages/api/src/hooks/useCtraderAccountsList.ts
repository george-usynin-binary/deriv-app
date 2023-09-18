import { useMemo } from 'react';
import useFetch from '../useFetch';

/** A custom hook that gets the list of created cTrader accounts. */
const useCtraderAccountsList = () => {
    const { data: ctrader_accounts } = useFetch('trading_platform_accounts', {
        payload: { platform: 'ctrader' },
    });

    /** Adding neccesary properties to cTrader accounts */
    const modified_ctrader_accounts = useMemo(
        () =>
            ctrader_accounts?.trading_platform_accounts?.map(account => ({
                ...account,
                loginid: account.account_id,
            })),
        [ctrader_accounts?.trading_platform_accounts]
    );

    return {
        /** List of all created cTrader accounts */
        data: modified_ctrader_accounts,
    };
};

export default useCtraderAccountsList;
