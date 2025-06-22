export default class Toastservice {
    static toasts: { type: 'default'|'warning'|'error'|'success'; message: string, time: Date }[] = [];

    static addToast(type: 'default' | 'warning' | 'error' | 'success', message: string, expire: number = 5000): void {
        const toast = { type, message, time: new Date() };
        this.toasts.push(toast);
        // Automatically remove the toast after the specified expire time
        if (expire > 0) {
            setTimeout(() => {
                this.removeToast(this.toasts.indexOf(toast));
            }, expire);
        }
    }

    static addWarning(message: string, expire?: number): void {
        this.addToast('warning', message, expire);
    }

    static addError(message: string, expire?: number): void {
        this.addToast('error', message, expire);
    }

    static addSuccess(message: string, expire?: number): void {
        this.addToast('success', message, expire);
    }

    static addDefault(message: string, expire?: number): void {
        this.addToast('default', message, expire);
    }

    static clearToasts(): void {
        this.toasts = [];
    }

    static removeToast(index: number): void {
        if (index >= 0 && index < this.toasts.length) {
            this.toasts.splice(index, 1);
        } else {
            console.warn('Attempted to remove toast at invalid index:', index);
        }
    }
}