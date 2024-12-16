import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class MockResolver implements Resolve<boolean> {
  resolve(): Observable<boolean> {
    return of(true).pipe(delay(500));
  }
}
