function formartDate(date) {
    // Khi data API k chứa ngày thì k hiển thị
    if (date === undefined) {
        return 'No Date 🚫';
    }

    const [year, month, day] = date.split('-');
    const newDate = `${day}-${month}-${year}`;

    return newDate;
}

export default formartDate;
