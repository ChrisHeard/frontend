import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { selectIndexList, selectSelectedMarkets, selectFocusedMarketDetails, selectExchangeData, selectIndexComponents } from '../store/selectors/markets.selectors';
import { AppState } from '../store/state/app.state';
import { loadIndexList, selectMarket, deselectMarket, focusMarket, loadExchangeData, loadIndexComponents } from '../store/actions/markets.action';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MatSliderModule } from '@angular/material/slider';

@Component({
  standalone: true,
  selector: 'app-markets',
  templateUrl: './markets.component.html',
  styleUrls: ['./markets.component.scss'],
  imports: [CommonModule, FormsModule, NgxDatatableModule, MatSliderModule]
})
export class MarketsComponent implements OnInit, OnDestroy {
  indexList$: Observable<any> = this.store.select(selectIndexList);
  exchangeData$: Observable<any> = this.store.select(selectExchangeData);
  selectedMarkets$: Observable<any[]> = this.store.select(selectSelectedMarkets);
  focusedMarketDetails$: Observable<any> = this.store.select(selectFocusedMarketDetails);
  indexComponents$: Observable<any> = this.store.select(selectIndexComponents);
  selectedCurrency: string = '';
  exchangeTable: any;
  filteredComponents: any[] = [];

  showAdvanced = false;

  advancedFilters: any = {};
  sliderSettings: any = {};
  private destroy$ = new Subject<void>();

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(loadIndexList());
    this.store.dispatch(loadExchangeData());

    this.selectedMarkets$
      .pipe(
        map(markets => markets.map(market => market.id)),
        takeUntil(this.destroy$)
      )
      .subscribe(marketSymbols => {
        if (marketSymbols.length > 0) {
          this.store.dispatch(loadIndexComponents({ marketSymbols }));
        }
      });

    this.indexComponents$
      .pipe(takeUntil(this.destroy$))
      .subscribe(components => {
        this.initializeSliders(components);
        this.applyFilters(); // Apply filters after initialization
      });
  }

  onCurrencyChange(event: any): void {
    this.selectedCurrency = event.target.value;
    this.exchangeData$
      .pipe(
        map(tables => tables[this.selectedCurrency]),
        takeUntil(this.destroy$)
      )
      .subscribe(exchangeTable => {
        this.exchangeTable = exchangeTable;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onMarketFocus(market: string) {
    this.store.dispatch(focusMarket({ market }));
  }

  onMarketSelect(event: Event, market: string) {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      this.store.dispatch(selectMarket({ market }));
    } else {
      this.store.dispatch(deselectMarket({ marketId: market }));
    }
  }

  getObjectKeys(obj: any): string[] {
    return obj ? Object.keys(obj) : [];
  }

  getNestedKeys(data: any, key: string): string[] {
    return data && data[key] ? Object.keys(data[key]) : [];
  }

  getConvertedValue(value: number, baseCurrency: string): string {
    if (this.exchangeTable) {
      const baseToSelectedRate = this.exchangeTable[baseCurrency];
      return (value / baseToSelectedRate).toFixed(2);
    }
    return value.toFixed(2);
  }

  initializeSliders(components: any[]): void {
    const numericParams = [
      'trailingPegRatio', 'marketCap', 'priceToSalesTrailing12Months', 'profitMargins', 'floatShares',
      'sharesOutstanding', 'netIncomeToCommon', 'trailingEps', 'forwardEps', 'pegRatio', 'quickRatio',
      'currentRatio', 'debtToEquity', 'earningsGrowth'
    ];

    numericParams.forEach(param => {
      const values = components.map(c => c[param]).filter(v => v != null && !isNaN(v));
      const min = Math.min(...values);
      const max = Math.max(...values);
      this.sliderSettings[param] = { min, max, lower: min, upper: max };
      this.advancedFilters[param] = { lower: min, upper: max };
    });
  }

  onSliderChange(param: string, event: any): void {
    const lowerValue = this.sliderSettings[param].lower;
    const upperValue = this.sliderSettings[param].upper;
    this.advancedFilters[param] = { lower: lowerValue, upper: upperValue };
    this.applyFilters();
  }

  applyFilters(): void {
    this.indexComponents$
      .pipe(takeUntil(this.destroy$))
      .subscribe(components => {
        this.filteredComponents = components.filter((component: { [x: string]: any; }) => {
          return Object.keys(this.advancedFilters).every(key => {
            const value = component[key];
            const filter = this.advancedFilters[key];
            return value !== null && !isNaN(value) && value >= filter.lower && value <= filter.upper;
          });
        });
      });
  }
}


