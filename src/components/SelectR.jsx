import React, { useState } from 'react';


function SelectComponent({ options, onSelect, className, placeholder }) {

    const [selectedOption, setSelectedOption] = useState('');

    const handleChange = (event) => {
        setSelectedOption(event.target.value);
        onSelect(event.target.value);
    };

    return (
        <>
            <select id="selectOption" className={className} value={selectedOption} onChange={handleChange}>
                <option value="">{placeholder}</option>
                {options.map((option, index) => (
                    <option key={index} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </>
    );
}

export default SelectComponent;
