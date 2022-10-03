export const formartDate = (date) => {
    // Khi data API k chứa ngày thì k hiển thị
    if (!date) {
        return 'No Date 🚫';
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
