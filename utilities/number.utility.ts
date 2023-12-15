export class NumberUtility {

    static isNumber(value: unknown): boolean {
        const numberValue: number = +(value as any);
        return isNaN(numberValue) === false;
    }

}