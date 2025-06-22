export default class CurrencyService {
    static formatCurrency(amount: number, currency: string = 'USD'): string {
        if (typeof amount !== 'number' || isNaN(amount)) {
            throw new Error('Invalid amount');
        }
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency
        }).format(amount);
    }
}