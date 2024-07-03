import { createSelector } from '@ngrx/store';
import { AppState } from '../state/app.state';
import { MarketsState } from '../state/markets.state';

export const selectMarketsState = (state: AppState) => state.markets;

export const selectSelectedMarkets = createSelector(
  selectMarketsState,
  (state: MarketsState) => state.selectedMarkets
);

export const selectIndexList = createSelector(
  selectMarketsState,
  (state: MarketsState) => state.indexList
);

export const selectExchangeData = createSelector(
  selectMarketsState,
  (state: MarketsState) => state.exchangeData
);

export const selectFocusedMarketDetails = createSelector(
  selectMarketsState,
  (state: MarketsState) => state.focusedMarketDetails
);

export const selectIndexComponents = createSelector(
  selectMarketsState,
  (state: MarketsState) => state.indexComponents
);

export const selectAdvancedFilters = createSelector(
  selectMarketsState,
  (state: MarketsState) => state.advancedFilters
);