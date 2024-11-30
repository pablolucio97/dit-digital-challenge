export function getSecondName(fullName: string): string {
    const nameParts = fullName.trim().split(" ");
    if (nameParts.length < 2) {
        throw new Error("The input must have at least two words.");
    }
    return nameParts[1];
}