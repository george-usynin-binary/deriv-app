import OnRampStore from '../on-ramp-store';
import OnrampProviders from 'Config/on-ramp-providers';
import { waitFor } from '@testing-library/react';

let changelly_provider, on_ramp_store, onramp_providers, root_store, WS;

beforeEach(() => {
    root_store = {
        client: {
            is_virtual: false,
            currency: 'BTC',
        },
    };
    WS = {
        authorized: {
            cashier: jest.fn().mockResolvedValueOnce({
                cashier: { deposit: { address: 'deposit address' } },
            }),
        },
    };
    on_ramp_store = new OnRampStore({ WS, root_store });
    onramp_providers = [
        OnrampProviders.createChangellyProvider(on_ramp_store),
        OnrampProviders.createXanPoolProvider(on_ramp_store),
        OnrampProviders.createBanxaProvider(on_ramp_store),
    ];
    changelly_provider = OnrampProviders.createChangellyProvider(on_ramp_store);
});

jest.mock('@deriv/shared', () => ({
    ...jest.requireActual('@deriv/shared'),
    websiteUrl: () => 'https://app.deriv.com/',
}));

describe('OnRampStore', () => {
    it('onramp tab should not be visible for virtual account', () => {
        on_ramp_store.root_store.client.is_virtual = true;

        expect(on_ramp_store.is_onramp_tab_visible).toBeFalse();
    });

    it('onramp tab should not be visible if the client currency is not cryptocurrency', () => {
        on_ramp_store.root_store.client.currency = 'USD';

        expect(on_ramp_store.is_onramp_tab_visible).toBeFalse();
    });

    it('onramp tab should not be visible if there is no onramp providers', () => {
        expect(on_ramp_store.is_onramp_tab_visible).toBeFalse();
    });

    it('onramp tab should be visible if there is at least one onramp provider', () => {
        on_ramp_store.setOnrampProviders(onramp_providers);
        expect(on_ramp_store.is_onramp_tab_visible).toBeTrue();
    });

    it('should return only one provider for USD currency', () => {
        on_ramp_store.setOnrampProviders(onramp_providers);
        on_ramp_store.root_store.client.currency = 'USD';

        expect(on_ramp_store.filtered_onramp_providers.length).toBe(1);
    });

    it('should return three providers for BTC cryptocurrency', () => {
        on_ramp_store.setOnrampProviders(onramp_providers);

        expect(on_ramp_store.filtered_onramp_providers.length).toBe(3);
    });

    it('should return proper onramp popup modal title if should_show_widget = true', () => {
        on_ramp_store.setShouldShowWidget(true);

        expect(on_ramp_store.onramp_popup_modal_title).toBe('Payment channel');
    });

    it('should return proper onramp popup modal title if should_show_widget = false and there is selected provider with should_show_dialog = true', () => {
        on_ramp_store.setSelectedProvider(changelly_provider);
        on_ramp_store.setApiError('API Error');

        expect(on_ramp_store.onramp_popup_modal_title).toBe('Our server cannot retrieve an address.');
    });

    it('should return empty string to render header + close icon if should_show_widget = false and there is selected provider with should_show_dialog = false', () => {
        on_ramp_store.setSelectedProvider(changelly_provider);
        on_ramp_store.setApiError('');

        expect(on_ramp_store.onramp_popup_modal_title).toBe(' ');
    });

    it('should return undefined if should_show_widget = false and there is no selected provider', () => {
        expect(on_ramp_store.onramp_popup_modal_title).toBe(undefined);
    });

    it('should have returned from onMountOnramp method if there is no selected_provider', () => {
        const spyOnMountOnramp = jest.spyOn(on_ramp_store, 'onMountOnramp');
        on_ramp_store.onMountOnramp();
        changelly_provider.getScriptDependencies = jest.fn().mockReturnValueOnce(['dependecy']);
        on_ramp_store.setSelectedProvider(changelly_provider);
        on_ramp_store.setSelectedProvider();

        expect(spyOnMountOnramp).toHaveReturned();
    });

    it('should have returned from onMountOnramp method if there is an empty array without dependencies', async () => {
        const spyOnMountOnramp = jest.spyOn(on_ramp_store, 'onMountOnramp');
        on_ramp_store.onMountOnramp();
        changelly_provider.getScriptDependencies = jest.fn().mockReturnValueOnce([]);
        on_ramp_store.setSelectedProvider(changelly_provider);

        expect(spyOnMountOnramp).toHaveReturned();
    });

    it('should set widget html if it is defined when disposeGetWidgetHtmlReaction reaction is running', async () => {
        const spySetWidgetHtml = jest.spyOn(on_ramp_store, 'setWidgetHtml');
        on_ramp_store.setSelectedProvider(changelly_provider);
        changelly_provider.getWidgetHtml = jest.fn().mockResolvedValueOnce('widget');
        on_ramp_store.onMountOnramp();
        on_ramp_store.setShouldShowWidget(true);

        expect(await spySetWidgetHtml).toHaveBeenCalledWith('widget');
    });

    it('should set should_show_widget into false if html widget is not defined when disposeGetWidgetHtmlReaction reaction is running', async () => {
        const spySetShouldShowWidget = jest.spyOn(on_ramp_store, 'setShouldShowWidget');
        on_ramp_store.setSelectedProvider(changelly_provider);
        changelly_provider.getWidgetHtml = jest.fn().mockResolvedValueOnce('');
        on_ramp_store.onMountOnramp();
        on_ramp_store.setShouldShowWidget(true);

        await waitFor(() => {
            expect(spySetShouldShowWidget).toHaveBeenCalledWith(false);
        });
    });

    it('should set widget error if there is an error when requesting widget when disposeGetWidgetHtmlReaction reaction is running', async () => {
        const spySetWidgetError = jest.spyOn(on_ramp_store, 'setWidgetError');
        on_ramp_store.setSelectedProvider(changelly_provider);
        changelly_provider.getWidgetHtml = jest.fn().mockRejectedValueOnce('Request error');
        on_ramp_store.onMountOnramp();
        on_ramp_store.setShouldShowWidget(true);

        await waitFor(() => {
            expect(spySetWidgetError).toHaveBeenCalledWith('Request error');
        });
    });

    it('should not call setIsRequestingWidgetHtml method if is_requesting_widget_html already equal to true when disposeGetWidgetHtmlReaction reaction is running', () => {
        const spySetIsRequestingWidgetHtml = jest.spyOn(on_ramp_store, 'setIsRequestingWidgetHtml');
        on_ramp_store.is_requesting_widget_html = true;
        on_ramp_store.setSelectedProvider(changelly_provider);
        on_ramp_store.onMountOnramp();
        on_ramp_store.setShouldShowWidget(true);

        expect(spySetIsRequestingWidgetHtml).not.toHaveBeenCalled();
    });

    it('should call disposeThirdPartyJsReaction and disposeGetWidgetHtmlReaction reactions when unmount onramp', () => {
        on_ramp_store.onMountOnramp();
        const spyDisposeThirdPartyJsReaction = jest.spyOn(on_ramp_store, 'disposeThirdPartyJsReaction');
        const spyDisposeGetWidgetHtmlReaction = jest.spyOn(on_ramp_store, 'disposeGetWidgetHtmlReaction');
        on_ramp_store.onUnmountOnramp();

        expect(spyDisposeThirdPartyJsReaction).toBeCalledTimes(1);
        expect(spyDisposeGetWidgetHtmlReaction).toBeCalledTimes(1);
    });

    it('should show and hide deposit address popover when deposit address is copied', async () => {
        jest.useFakeTimers();
        jest.spyOn(document, 'createRange').mockImplementation(() => ({
            selectNodeContents: jest.fn(),
        }));
        jest.spyOn(window, 'window', 'get').mockImplementation(() => ({
            getSelection: () => ({
                addRange: jest.fn(),
                removeAllRanges: jest.fn(),
            }),
        }));
        Object.assign(navigator, {
            clipboard: {
                writeText: jest.fn().mockImplementation(() => Promise.resolve()),
            },
        });
        const spySetIsDepositAddressPopoverOpen = jest.spyOn(on_ramp_store, 'setIsDepositAddressPopoverOpen');
        on_ramp_store.onClickCopyDepositAddress();

        expect(await spySetIsDepositAddressPopoverOpen).toHaveBeenCalledWith(true);
        jest.runAllTimers();
        expect(setTimeout).toHaveBeenCalledTimes(1);
        expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 500);
        expect(await spySetIsDepositAddressPopoverOpen).toHaveBeenCalledWith(false);

        jest.restoreAllMocks();
        jest.useRealTimers();
    });

    it('should show widget when onClickDisclaimerContinue method was called', () => {
        on_ramp_store.onClickDisclaimerContinue();

        expect(on_ramp_store.should_show_widget).toBeTrue();
    });

    it('should go to deposit page when onClickGoToDepositPage method was called', () => {
        window.open = jest.fn();
        on_ramp_store.onClickGoToDepositPage();

        expect(window.open).toHaveBeenCalledWith('https://app.deriv.com/cashier/deposit');

        jest.restoreAllMocks();
    });

    it('should set api error and clear deposit address interval if there is an error in response when pollApiForDepositAddress method was called', async () => {
        jest.useFakeTimers();
        const spySetApiError = jest.spyOn(on_ramp_store, 'setApiError');
        on_ramp_store.WS.authorized.cashier = jest.fn().mockResolvedValueOnce({ error: 'API error' });
        on_ramp_store.pollApiForDepositAddress(false);

        expect(await spySetApiError).toHaveBeenLastCalledWith('API error');
        expect(clearInterval).toHaveBeenCalledTimes(1);

        jest.useRealTimers();
    });

    it('should set empty deposit address when pollApiForDepositAddress method was called with should_allow_empty_address = true', async () => {
        jest.useFakeTimers();
        const spySetDepositAddress = jest.spyOn(on_ramp_store, 'setDepositAddress');
        on_ramp_store.WS.authorized.cashier = jest
            .fn()
            .mockResolvedValueOnce({ cashier: { deposit: { address: '' } } });
        on_ramp_store.pollApiForDepositAddress(true);

        expect(await spySetDepositAddress).toHaveBeenCalledWith('');
        expect(clearInterval).toHaveBeenCalledTimes(1);

        jest.useRealTimers();
    });

    it('should set deposit address when pollApiForDepositAddress method was called with should_allow_empty_address = false', async () => {
        jest.useFakeTimers();
        const spySetDepositAddress = jest.spyOn(on_ramp_store, 'setDepositAddress');
        on_ramp_store.pollApiForDepositAddress(false);

        expect(await spySetDepositAddress).toHaveBeenCalledWith('deposit address');
        expect(clearInterval).toHaveBeenCalledTimes(1);

        jest.useRealTimers();
    });

    it('should set deposit address interval to 3 seconds when pollApiForDepositAddress method was called', async () => {
        jest.useFakeTimers();
        on_ramp_store.pollApiForDepositAddress(false);
        jest.runOnlyPendingTimers();

        expect(setInterval).toHaveBeenCalledTimes(1);
        expect(setInterval).toHaveBeenLastCalledWith(expect.any(Function), 3000);

        jest.useRealTimers();
    });

    it('should clear interval after 30 seconds if there is an empty deposit address in response when pollApiForDepositAddress method was called with should_allow_empty_address = false', async () => {
        jest.useFakeTimers();
        on_ramp_store.pollApiForDepositAddress(false);
        jest.runOnlyPendingTimers();

        expect(setTimeout).toHaveBeenCalledTimes(1);
        expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 30000);

        jest.useRealTimers();
    });

    it('should set deposit address loading when pollApiForDepositAddress method was called', async () => {
        const spySetIsDepositAddressLoading = jest.spyOn(on_ramp_store, 'setIsDepositAddressLoading');
        on_ramp_store.pollApiForDepositAddress(false);

        expect(await spySetIsDepositAddressLoading.mock.calls).toEqual([[true], [false]]);
    });

    it('should reset popup', () => {
        on_ramp_store.resetPopup();

        expect(on_ramp_store.api_error).toBeNull();
        expect(on_ramp_store.deposit_address).toBeNull();
        expect(on_ramp_store.deposit_address_ref).toBeNull();
        expect(on_ramp_store.is_deposit_address_loading).toBeTrue();
        expect(on_ramp_store.selected_provider).toBeNull();
        expect(on_ramp_store.should_show_widget).toBeFalse();
        expect(on_ramp_store.widget_error).toBeNull();
        expect(on_ramp_store.widget_html).toBeNull();
    });

    it('should set api error', () => {
        on_ramp_store.setApiError('API error');

        expect(on_ramp_store.api_error).toBe('API error');
    });

    it('should set copy icon ref', () => {
        on_ramp_store.setCopyIconRef('icon ref');

        expect(on_ramp_store.copy_icon_ref).toBe('icon ref');
    });

    it('should set deposit address', () => {
        on_ramp_store.setDepositAddress('deposit address');

        expect(on_ramp_store.deposit_address).toBe('deposit address');
    });

    it('should set deposit address ref', () => {
        on_ramp_store.setDepositAddressRef('deposit address ref');

        expect(on_ramp_store.deposit_address_ref).toBe('deposit address ref');
    });

    it('should change value of the variable is_deposit_address_loading', () => {
        on_ramp_store.setIsDepositAddressLoading(true);

        expect(on_ramp_store.is_deposit_address_loading).toBeTrue();
    });

    it('should change value of the variable is_deposit_address_popover_open', () => {
        on_ramp_store.setIsDepositAddressPopoverOpen(true);

        expect(on_ramp_store.is_deposit_address_popover_open).toBeTrue();
    });

    it('should change value of the variable is_onramp_modal_open', () => {
        on_ramp_store.setIsOnRampModalOpen(true);

        expect(on_ramp_store.is_onramp_modal_open).toBeTrue();
    });

    it('should change value of the variable is_requesting_widget_html', () => {
        on_ramp_store.setIsRequestingWidgetHtml(true);

        expect(on_ramp_store.is_requesting_widget_html).toBeTrue();
    });

    it('should set selected provider', () => {
        const spyPollApiForDepositAddress = jest.spyOn(on_ramp_store, 'pollApiForDepositAddress');
        on_ramp_store.setSelectedProvider('provider');

        expect(on_ramp_store.selected_provider).toBe('provider');
        expect(on_ramp_store.is_onramp_modal_open).toBeTrue();
        expect(spyPollApiForDepositAddress).toHaveBeenCalledWith(true);
    });

    it('should set selected provider to null if there is no provider', () => {
        on_ramp_store.setSelectedProvider();

        expect(on_ramp_store.selected_provider).toBeNull();
        expect(on_ramp_store.is_onramp_modal_open).toBeFalse();
    });

    it('should change value of the variable should_show_widget', () => {
        on_ramp_store.setShouldShowWidget(true);

        expect(on_ramp_store.should_show_widget).toBeTrue();
    });

    it('should set onramp providers', () => {
        on_ramp_store.setOnrampProviders(onramp_providers);

        expect(on_ramp_store.onramp_providers).toEqual(onramp_providers);
    });

    it('should set widget error', () => {
        on_ramp_store.setWidgetError('Widget error');

        expect(on_ramp_store.widget_error).toBe('Widget error');
    });

    it('should set widget html', () => {
        on_ramp_store.setWidgetHtml('Widget html');

        expect(on_ramp_store.widget_html).toBe('Widget html');
    });
});
