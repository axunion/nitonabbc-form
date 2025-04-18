/**
 * Represents any valid JSON value.
 */
type Json = string | number | boolean | null | Json[] | { [key: string]: Json };

/**
 * Loads and parses data from localStorage.
 *
 * @param key - The key to retrieve from localStorage.
 * @returns The parsed value of type T, or null if not found or parsing fails.
 *
 * @remarks
 * This function returns the value as type T. Ensure that the expected type matches
 * the structure of the stored data, as incorrect assumptions may lead to runtime errors.
 */
export const loadData = <T = Json>(key: string): T | null => {
    try {
        const value = localStorage.getItem(key);
        return value ? (JSON.parse(value) as T) : null;
    } catch (error) {
        console.error(
            `Error loading data from localStorage (key: ${key}):`,
            error,
        );
        return null;
    }
};

/**
 * Serializes and saves data to localStorage.
 *
 * @param key - The key under which to store the data.
 * @param data - The data to be stored. Must be serializable as JSON.
 */
export const saveData = (key: string, data: Json): void => {
    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
        console.error(
            `Error saving data to localStorage (key: ${key}):`,
            error,
        );
    }
};

/**
 * Removes a key and its associated value from localStorage.
 *
 * @param key - The key to remove from localStorage.
 */
export const removeData = (key: string): void => {
    try {
        localStorage.removeItem(key);
    } catch (error) {
        console.error(
            `Error removing data from localStorage (key: ${key}):`,
            error,
        );
    }
};
