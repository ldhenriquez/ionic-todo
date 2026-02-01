import { ActivatedRouteSnapshot, DetachedRouteHandle, RouteReuseStrategy } from '@angular/router';

/**
 * Disables route caching/detaching.
 *
 * Ionic's default IonicRouteStrategy keeps previous pages attached in the DOM.
 * On some Chromium/Linux setups that can leave an "invisible" page on top
 * still receiving pointer events, making the UI feel unclickable.
 *
 * For this technical test we prefer determinism over caching.
 */
export class NoReuseStrategy implements RouteReuseStrategy {
  shouldDetach(_route: ActivatedRouteSnapshot): boolean {
    return false;
  }

  store(_route: ActivatedRouteSnapshot, _handle: DetachedRouteHandle | null): void {
    // no-op
  }

  shouldAttach(_route: ActivatedRouteSnapshot): boolean {
    return false;
  }

  retrieve(_route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
    return null;
  }

  shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    return future.routeConfig === curr.routeConfig;
  }
}
