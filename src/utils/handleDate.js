export const formartDate = (date) => {
    if (!date) {
        return '';
    }

    const [year, month, day] = date.split('-');
    const newDate = `${day}-${month}-${year}`;

    return newDate;
};

export const getYear = (date) => {
    if (!date) {
        return 'No Year 🚫';
    }
    const [year] = date.split('-');

    return year;
};

export const getMonthYear = (date) => {
    if (!date) {
        return 'No Year 🚫';
    }
    const [year, month, day] = date.split('-');
    const monthYear = `${month} - ${year}`;

    return monthYear;
};
