import { useState, useEffect } from 'react';

function useDebounce(value, delay) {
    const [deBouncedValue, setDebouncedValue] = useState('');

    useEffect(() => {
        const hanler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => clearTimeout(hanler);
    }, [value]);

    return deBouncedValue;
}

export default useDebounce;
