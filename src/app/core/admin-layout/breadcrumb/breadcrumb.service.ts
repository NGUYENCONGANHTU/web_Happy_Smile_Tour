import { Injectable, Signal, signal } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

export interface BreadcrumbItem {
  label: string;
  url: string;
}

@Injectable({
  providedIn: 'root',
})
export class BreadcrumbService {
  private _breadcrumbs = signal<BreadcrumbItem[]>([]);
  private overriddenBreadcrumbs = new Map<string, string>(); // Custom breadcrumbs by path

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.generateBreadcrumbs();
      });
  }

  get breadcrumbs(): Signal<BreadcrumbItem[]> {
    return this._breadcrumbs;
  }

  /** Allows overriding breadcrumb labels for specific paths */
  setBreadcrumbOverride(path: string, label: string): void {
    this.overriddenBreadcrumbs.set(path, label);
    this.generateBreadcrumbs();
  }

  /** Auto-generates breadcrumbs based on route structure */
  private generateBreadcrumbs(): void {
    const breadcrumbs: BreadcrumbItem[] = [];
    let currentRoute = this.route.root;
    let url = '';

    while (currentRoute.firstChild) {
      currentRoute = currentRoute.firstChild;
      const routeConfig = currentRoute.routeConfig;

      if (routeConfig?.path) {
        let finalPath = routeConfig.path;
        if (routeConfig.path.includes(':')) {
          const targetParam = routeConfig.path.split(':')[1];
          finalPath = currentRoute.snapshot.params[targetParam];
        }
        url += `/${finalPath}`;
        const label =
          this.overriddenBreadcrumbs.get(url) ??
          (routeConfig.data?.['breadcrumb'] as string | null);
        if (label) {
          breadcrumbs.push({ label, url });
        }
      }
    }

    this._breadcrumbs.set([...breadcrumbs]);
  }
}
