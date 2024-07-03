export interface Market {
  id: string;
  componentCount: any;
}

export interface MarketsState {
  markets: any;
  filters: any;
  exchangeData: any;
  mlData: any;
  error: any;
  indexList: any[];
  selectedMarkets: Market[];
  focusedMarketDetails: any;
  indexComponents: any[];
  advancedFilters: any; 
}

export const initialState: MarketsState = {
  markets: null,
  filters: {},
  exchangeData: {},
  mlData: {},
  error: null,
  indexList: [],
  selectedMarkets: [],
  focusedMarketDetails: null,
  indexComponents: [],
  advancedFilters: {}
};
