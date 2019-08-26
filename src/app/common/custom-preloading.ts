import { PreloadingStrategy, Route } from '@angular/router';
import { Observable, of } from 'rxjs';
export class CustomPreloading implements PreloadingStrategy {
    // tslint:disable-next-line: ban-types
    preload(route: Route, loadFunction: Function): Observable<any> {
        if (route.data && route.data.preload) {
            return loadFunction();
        } else {
            return of(null);
        }
    }
}
