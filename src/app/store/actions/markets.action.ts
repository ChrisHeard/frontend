import { createAction, props } from '@ngrx/store';

export const loadIndexList = createAction('[Markets Component] Load Index List');
export const loadIndexListSuccess = createAction('[Markets Component] Load Index List Success', props<{ indexList: any }>());
export const loadIndexListFailure = createAction('[Markets Component] Load Index List Failure', props<{ error: any }>());

export const selectMarket = createAction('[Markets Component] Select Market', props<{ market: string }>());
export const selectMarketDetails = createAction('[Markets Component] Select Market Details', props<{ market: any }>());
export const deselectMarket = createAction('[Markets Component] Deselect Market', props<{ marketId: string }>());

export const focusMarket = createAction('[Markets Component] Focus Market', props<{ market: string }>());
export const focusMarketSuccess = createAction('[Markets Component] Focus Market Success', props<{ marketDetails: any }>());
export const focusMarketFailure = createAction('[Markets Component] Focus Market Failure', props<{ error: any }>());

export const loadExchangeData = createAction('[Markets Component] Load Exchange Data');
export const loadExchangeDataSuccess = createAction('[Markets Component] Load Exchange Data Success', props<{ exchangeData: any }>());
export const loadExchangeDataFailure = createAction('[Markets Component] Load Exchange Data Failure', props<{ error: any }>());

export const loadIndexComponents = createAction('[Markets Component] Load Components Data', props<{ marketSymbols: any[] }>());
export const loadIndexComponentsSuccess = createAction('[Markets Component] Load Components Data Success', props<{ indexComponents: any[] }>());
export const loadIndexComponentsFailure = createAction('[Markets Component] Load Components Data Failure', props<{ error: any[] }>());

export const applyAdvancedFilters = createAction('[Markets Component] Apply Filters', props<{ advancedFilters: any }>());
