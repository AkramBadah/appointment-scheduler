export function getToday(): string {
    const today = new Date();
    return today.toISOString().split('T')[0];
}

export function getDateAfterDays(days: number): string {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date.toISOString().split('T')[0];
}
