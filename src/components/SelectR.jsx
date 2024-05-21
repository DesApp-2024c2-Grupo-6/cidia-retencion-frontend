import React, { useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


function SelectComponent({ options, onSelect, className, placeholder }) {

    const [selectedOption, setSelectedOption] = useState('');

    const handleChange = (event) => {
        setSelectedOption(event.target.value);
        onSelect(event.target.value);
    };

    return (
        <>
            <FormControl fullWidth>
                <Select
                    id="selectOption"
                    className={className}
                    value={selectedOption}
                    onChange={handleChange}
                    displayEmpty
                    MenuProps={{
                        PaperProps: {
                            style: {
                                maxHeight: '200px',
                            },
                        },
                }}
                >
                    <MenuItem disabled value="">{placeholder}</MenuItem>
                    {options.map((option, index) => (
                        <MenuItem key={index} value={option.value}>{option.label}</MenuItem>
                    ))}
                </Select>
            </FormControl>
        </>
    );
}

export default SelectComponent;
