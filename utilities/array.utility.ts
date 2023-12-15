export class ArrayUtility {
    static hasEntries<T>(array: T[] | undefined): boolean {
        return (array?.length ?? 0) !== 0;
    }

    static safeGetFirst<T>(list: T[] | undefined): T | null {
        return list !== undefined && ArrayUtility.hasEntries(list)
            ? list[0]
            : null;
    }

    static equal(array1: unknown[], array2: unknown[]) {
        if (array1?.length !== array2?.length) {
            return false;
        }
        for (let i = array1.length; i--; ) {
            if (array1[i] !== array2[i]) {
                return false;
            }
        }
        return true;
    }

    static safeGetLast<T>(list: T[] | undefined): T | null {
        return list !== undefined && ArrayUtility.hasEntries(list)
            ? list[list.length - 1]
            : null;
    }

    /**
     * Get the value in an array at a given index.
     */
    static safeGetNth<T>(list: T[] | undefined, index: number): T | null {
        return list !== undefined &&
            ArrayUtility.hasEntries(list) &&
            list.length >= index
            ? list[index]
            : null;
    }

    /**
     * Get a sequential list of numbers given a start and end range.
     * @param start 
     * @param end 
     * @returns 
     */
    static range(start: number, end: number): number[] {
        if (start > end) {
            throw new Error('Start cannot be greater than end.');
        }

        const numberList: number[] = [];
        while (start <= end) {
            numberList.push(start++);
        }
        return numberList;
    }

    static groupBy<T, TKey>(
        array: T[],
        keySelector: (val: T) => TKey
    ): Map<TKey, T[]> {
        if (!this.hasEntries(array)) {
            return new Map<TKey, T[]>();
        }

        return array.reduce((acc: Map<TKey, T[]>, entity: T) => {
            const key: TKey = keySelector(entity);
            if (acc.has(key)) {
                acc.get(key)?.push(entity);
            } else {
                acc.set(key, [entity]);
            }
            return acc;
        }, new Map<TKey, T[]>());
    }

    /** Sorts the array by a projector after copying it's reference to prevent manipulating the original array */
    static sortBy<T, R>(
        array: T[],
        projector: (entry: T) => R,
        descending?: boolean
    ): T[] {
        if (!this.hasEntries(array)) {
            return [];
        }
        const sign: number = descending ? 1 : -1;
        const sortFn: (a: T, b: T) => number = function (a: T, b: T): number {
            const aR: R = projector(a);
            const bR: R = projector(b);
            const values: number = aR === bR ? 0 : aR < bR ? 1 : -1;
            return values * sign;
        };
        return [...array].sort(sortFn);
    }

    /** Sorts an array by its entries either ascending or descending */
    static sort<T>(array: T[], descending?: boolean): T[] {
        return this.sortBy(array, (r) => r, descending);
    }

    /**
     * Replace an value in an array given the index.
     */
    static replace<T>(array: T[], newValue: T, index: number): T[] {
        array.splice(index, 1, newValue);
        return array;
    }

    /**
     * Find a value in an array and replace it with a new value. If it does not exist,
     * add the new value.
     */
    static findAndReplace<T>(
        array: T[] | null | undefined,
        predicate: (v: T) => boolean,
        newValue: T
    ): T[] {
        let validArray: T[] = (array === undefined || array === null) ? [] : array;
        const index = validArray.findIndex(predicate);
        if (index >= 0) {
            validArray.splice(index, 1, newValue);
        } else {
            if (ArrayUtility.hasEntries(validArray)) {
                validArray.push(newValue);
            } else {
                validArray = [newValue];
            }
        }
        return validArray;
    }

    /**
     * Adds a value in an array if it does not exist.
     */
    static addIfMissing<T>(
        array: T[],
        predicate: (v: T) => boolean,
        newValue: T
    ): T[] {
        const index = array.findIndex(predicate);
        if (index >= 0) {
            return array;
        } else {
            if (ArrayUtility.hasEntries(array)) {
                array.push(newValue);
            } else {
                array = [newValue];
            }
        }
        return array;
    }

    /**
     * Retrieve a random item in a given array. Will return null if the array is empty.
     * @param array
     * @returns
     */
    static getRandomItem<T>(array: T[]): T | null {
        if (ArrayUtility.hasEntries(array) === false) {
            return null;
        }

        const randomIndex: number = Math.floor(Math.random() * array.length);
        return array[randomIndex];
    }

    static sum<T>(
        array: T[] | null | undefined,
        predicate: (v: T) => number
    ): number {
        if(array === null || array === undefined || array?.length === 0) {
            return 0;
        }

        let sum = 0;
        for (const item of array) {
            sum += predicate(item);
        }
        return sum;
    }

    static first<T>(array: T[] | undefined): T | null {
        if(array === undefined) {
            return null;
        }

        if (array.length > 0) {
            return array[0];
        } else {
            return null;
        }
    }

    static last<T>(array: Array<T> | undefined): T | null {
        if(array === undefined) {
            return null;
        }

        if (array.length > 0) {
            return array[array.length - 1];
        } else {
            return null;
        }
    }
}