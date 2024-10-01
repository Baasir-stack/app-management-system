export const calculateEndDate = (duration: string): Date => {
    const startDate = new Date(); // Current date
    let endDate: Date;

    switch (duration) {
        case '30 days':
            endDate = new Date(startDate);
            endDate.setDate(startDate.getDate() + 30); // Add 30 days
            break;
        case '6 months':
            endDate = new Date(startDate);
            endDate.setMonth(startDate.getMonth() + 6); // Add 6 months
            break;
        case '1 year':
            endDate = new Date(startDate);
            endDate.setFullYear(startDate.getFullYear() + 1); // Add 1 year
            break;
        default:
            throw new Error('Invalid duration specified.');
    }

    return endDate;
};
