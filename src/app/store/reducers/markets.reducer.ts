import { Action, createReducer, on } from '@ngrx/store';
import { loadIndexListSuccess, selectMarketDetails, deselectMarket, focusMarketSuccess, loadExchangeDataSuccess, loadIndexComponentsSuccess, applyAdvancedFilters } from '../actions/markets.action';
import { MarketsState, initialState } from '../state/markets.state';

const _marketsReducer = createReducer(
  initialState,

  on(loadIndexListSuccess, (state, { indexList }) => ({
    ...state,
    indexList
  })),

  on(selectMarketDetails, (state, { market }) => ({
    ...state,
    selectedMarkets: [...state.selectedMarkets, market]
  })),
  
  on(deselectMarket, (state, { marketId }) => ({
    ...state,
    selectedMarkets: state.selectedMarkets.filter(m => m.id !== marketId)
  })),

  on(focusMarketSuccess, (state, { marketDetails }) => ({
    ...state,
    focusedMarketDetails: marketDetails
  })),

  on(loadExchangeDataSuccess, (state, { exchangeData }) => ({
    ...state,
    exchangeData
  })),

  on(loadIndexComponentsSuccess, (state, { indexComponents }) => ({
    ...state,
    indexComponents
  })),

  on(applyAdvancedFilters, (state, { advancedFilters }) => ({
    ...state,
    advancedFilters
  }))
);

export function marketsReducer(state: MarketsState | undefined, action: Action) {
  return _marketsReducer(state, action);
}
