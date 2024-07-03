import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { MarketsService } from '../../services/markets.service';
import { loadIndexList, loadIndexListSuccess, loadIndexListFailure, focusMarket, focusMarketSuccess, focusMarketFailure, selectMarket, selectMarketDetails, loadExchangeData, loadExchangeDataFailure, loadExchangeDataSuccess, loadIndexComponents, loadIndexComponentsSuccess, loadIndexComponentsFailure } from '../actions/markets.action';

@Injectable()
export class MarketsEffects {

  loadIndexList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadIndexList),
      mergeMap(() =>
        this.marketsService.getIndexList().pipe(
          map((response: any) => loadIndexListSuccess({ indexList: response })),
          catchError(error => of(loadIndexListFailure({ error })))
        )
      )
    )
  );

  handleMarketActions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(focusMarket, selectMarket),
      mergeMap(action => 
        this.marketsService.getIndexData(action.market).pipe(
          map((marketDetails: any) => {
            console.log('Fetched market details:', marketDetails); // Debugging line
            if (action.type === focusMarket.type) {
              return focusMarketSuccess({ marketDetails });
            } else if (action.type === selectMarket.type) {
              return selectMarketDetails({ market: marketDetails });
            } else {
              return { type: '[Markets Component] Unknown Action' };
            }
          }),
          catchError(error => of(focusMarketFailure({ error })))
        )
      )
    )
  );

  loadExchangeData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadExchangeData),
      mergeMap(() =>
        this.marketsService.getExchangeData().pipe(
          map((response: any) => {
            return loadExchangeDataSuccess({ exchangeData: response });
          }),
          catchError(error => {
            return of(loadExchangeDataFailure({ error }));
          })
        )
      )
    )
  );

  loadIndexComponents$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadIndexComponents),
      mergeMap(action =>
        this.marketsService.getIndexComponents(action.marketSymbols).pipe(
          map((response: any) => {
            console.log("response")
            return loadIndexComponentsSuccess({indexComponents: response});
          }),
          catchError(error => {
            return of(loadIndexComponentsFailure({ error }));
          })
        )
      )
    )
  )

  constructor(
    private actions$: Actions,
    private marketsService: MarketsService
  ) {}
}
