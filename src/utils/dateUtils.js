export const formatDate = (date) => {
    return date.toISOString().split('T')[0];
};

export const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
};

export const getMonthName = (monthIndex) => {
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return months[monthIndex];
};

export const calculateCompletionRate = (habitId, completions, monthDays) => {
    if (!completions) return 0;
    let completedCount = 0;
    monthDays.forEach(date => {
        if (completions[date] && completions[date].includes(habitId)) {
            completedCount++;
        }
    });
    return Math.round((completedCount / monthDays.length) * 100);
};
