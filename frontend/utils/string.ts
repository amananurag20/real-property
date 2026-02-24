/**
 * Capitalize the first letter of a string and lowercase the rest
 */
export function capitalizeFirstLetter(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

/**
 * Normalize city names (e.g., "mumbai" -> "Mumbai")
 */
export function normalizeCity(city: string | null): string {
    if (!city) return 'All';
    return capitalizeFirstLetter(city);
}
