function getYear(date) {
    if (date === undefined) {
        return 'No Year 🚫';
    }
    const [year] = date.split('-');

    return year;
}

export default getYear;
