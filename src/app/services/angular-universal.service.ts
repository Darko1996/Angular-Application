import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })

export class LocalStorageService {

    constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

    clear(): void {
        if (isPlatformBrowser(this.platformId)) {
            localStorage.clear();
        }
    }

    setItem(key: string, value: string): void {
        if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem(key, value);
        }
    }

    getItem(key: string): any {
        if (isPlatformBrowser(this.platformId)) {
            if (localStorage.getItem(key)) {
                return localStorage.getItem(key);
            } else {
                return null;
            }

        } else {
            return null;
        }
    }

    removeItem(key: string): void {
        if (isPlatformBrowser(this.platformId)) {
            localStorage.removeItem(key);
        }
    }

    key(index: number): any {
        if (isPlatformBrowser(this.platformId)) {
            return localStorage.key(index);
        }
    }

    length(): any {
        if (isPlatformBrowser(this.platformId)) {
            return localStorage.length;
        }
    }
}


@Injectable({ providedIn: 'root' })

export class WindowService {

    constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

    scrollTo(x: number, y: number): void {
        if (isPlatformBrowser(this.platformId)) {
            window.scrollTo(x, y);
        }
    }

    open(url?: string, target?: string, feature?: string, replace?: boolean): void {
        if (isPlatformBrowser(this.platformId)) {
            window.open(url, target, feature, replace);
        }
    }
}
