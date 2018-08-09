import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { take, map } from "rxjs/operators";

@Injectable()
export class AccessService implements CanActivate {
  private accessSubject = new BehaviorSubject<boolean>(false);
  private accessState = this.accessSubject.asObservable();

  constructor() {}

  public grantAccess(): void {
    this.accessSubject.next(true);
  }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.accessState.pipe(
      take(1),
      map((state: boolean) => {
        return state;
      })
    );
  }
}
