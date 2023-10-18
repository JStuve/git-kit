export class StringUtility {

    static hasValue(value: string | undefined | null): boolean {
        if(value === null || value === undefined || value === '') {
            return false;
        };
        
        return true;
    }

    static isString(value: unknown): boolean {
        return typeof value === 'string';
    }

    static replaceWithSpace(value: string, replaceWith: string): string {
        return StringUtility.replaceAll(value, ' ', replaceWith);
    }

    static replaceAll(value: string, match: string, replaceWith: string): string {
        return value.split(match).join(replaceWith);
    }

    static toCurrency(value: number | string): string {
        const stringValue: string = (value === undefined || value === null) ? '0' : value.toString();
        const formattedNumber: number = parseFloat(stringValue);
        if(isNaN(formattedNumber)) {
            return `$0.00`;
        }
        return `$${formattedNumber.toFixed(2)}`;
    }
}