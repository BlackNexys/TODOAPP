// Core Angular imports
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

// Service imports
import ToastService from '../../../services/toast.service';
import { NgFor } from '@angular/common';

@Component({
    standalone: true,
    selector: 'c-toasts',
    templateUrl: './c-toasts.component.html',
    styleUrls: ['./c-toasts.component.scss'],
    imports: [MatButtonModule, MatIconModule, CommonModule]
})
export class CToasts {
    toasts = ToastService.toasts;

    removeToast(index: number): void {
        ToastService.removeToast(index);
    }
 }