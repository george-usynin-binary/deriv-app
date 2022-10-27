import React from 'react';
import { setWebsocket } from '@deriv/shared';
import { init } from 'Utils/server_time';
import Routes from 'Containers/routes';
import { MobxContentProvider } from 'Stores/connect';
import { StoreProvider } from './hooks';
import { ThemeProvider } from '@deriv/ui';

const App = ({ passthrough: { WS, root_store } }) => {
    React.useEffect(() => {
        setWebsocket(WS);
        init();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <MobxContentProvider store={root_store}>
            <ThemeProvider>
                <StoreProvider store={root_store}>
                    <Routes />
                </StoreProvider>
            </ThemeProvider>
        </MobxContentProvider>
    );
};

export default App;
