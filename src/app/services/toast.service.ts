import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface Toast {
    type: 'info' | 'error';
    message: string;
}

@Injectable({
    providedIn: 'root',
})
export class ToastService {
    private toastSubject = new Subject<Toast>();
    toast$ = this.toastSubject.asObservable();

    showToast(type: 'info' | 'error', message: string): void {
        this.toastSubject.next({ type, message });
    }
}
