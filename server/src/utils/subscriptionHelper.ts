export const calculateEndDate = (duration: string): Date => {
    const startDate = new Date(); 
    let endDate: Date;

    switch (duration) {
        case '30 days':
            endDate = new Date(startDate);
            endDate.setDate(startDate.getDate() + 30); 
            break;
        case '6 months':
            endDate = new Date(startDate);
            endDate.setMonth(startDate.getMonth() + 6); 
            break;
        case '1 year':
            endDate = new Date(startDate);
            endDate.setFullYear(startDate.getFullYear() + 1); 
            break;
        default:
            throw new Error('Invalid duration specified.');
    }

    return endDate;
};
