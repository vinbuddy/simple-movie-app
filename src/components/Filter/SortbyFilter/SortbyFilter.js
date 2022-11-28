import { useContext } from 'react';
import Select from 'react-select';
import { FilterContext } from 'src/context/FilterContext';

const customStyles = {
    option: (styles, { isFocused, isSelected }) => ({
        ...styles,
        background: isFocused ? '#e9ecef' : isSelected ? '#e9ecef' : undefined,
        color: isFocused ? '#54585c' : isSelected ? '#54585c' : undefined,
        marginBottom: 7,
        borderRadius: 8,
        cursor: 'pointer',
        '&:last-child': {
            marginBottom: 0,
        },
        '&:active': {
            background: isFocused ? '#e9ecef' : isSelected ? '#e9ecef' : undefined,
        },
    }),

    dropdownIndicator: (styles, state) => ({
        ...styles,
        transform: state.selectProps.menuIsOpen && 'rotate(180deg)',
        transition: 'transform ease 0.2s',
    }),

    menu: (styles) => ({
        ...styles,
        padding: 7,
        animation: 'showDropdown ease-in-out 0.25s',
    }),

    singleValue: (styles) => ({
        ...styles,
        color: 'var(--text-color)',
    }),

    control: (styles, state) => ({
        ...styles,
        cursor: 'pointer',
        background: 'var(--app-background)',
        borderRadius: '7px',
        // Overwrittes the different states of border
        borderColor: state.isFocused
            ? 'var( --border-color-sortby-option)'
            : 'var( --border-color-sortby-option)',
        borderWidth: '2px',
        // Removes weird border around container
        boxShadow: state.isFocused ? null : null,
        '&:hover': {
            // Overwrittes the different states of border
            borderColor: state.isFocused
                ? 'var( --border-color-sortby-option)'
                : 'var( --border-color-sortby-option)',
        },
    }),
};

function SortbyFilter({ sortbyType, options = [] }) {
    const { fetchSortbyData } = useContext(FilterContext);

    return (
        <div>
            <Select
                autoFocus={false}
                styles={customStyles}
                options={options}
                placeholder="Sort by"
                isClearable
                isSearchable={false}
                onChange={(selected) => {
                    if (!selected) {
                        fetchSortbyData(sortbyType, null);
                    } else {
                        fetchSortbyData(sortbyType, selected.value);
                    }
                }}
            />
        </div>
    );
}

export default SortbyFilter;
