export default class DateService {
    static formatDate(date: Date): string {
        if (!(date instanceof Date)) {
            throw new Error('Invalid date object');
        }
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        });
    }

    static parseDate(dateString: string|number): Date | null {
        const date = new Date(dateString);
        return isNaN(date.getTime()) ? null : date;
    }
}