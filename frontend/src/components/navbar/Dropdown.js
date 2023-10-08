import React, {useEffect, useRef, useState} from 'react';

import './Dropdown.css';
function Dropdown({ id, label, items, selectedItem, onSelectItem }) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const toggleDropdown = () => {
        setIsOpen(prevState => !prevState);
    };

    const handleItemClick = (item) => {
        if (onSelectItem) {
            onSelectItem(item);
        }
        setIsOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = event => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        // Cleanup
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <li className={isOpen ? "nav-item dropdown show" : "nav-item dropdown"} ref={dropdownRef}>
            <button className="nav-link dropdown-toggle" id={id} onClick={toggleDropdown} aria-expanded={isOpen}>
                {label}
            </button>
            {isOpen && (
                <ul className="dropdown-menu show" aria-labelledby={id}>
                    {items.map(item => (
                        <li key={item.id}>
                            <button
                                className={`dropdown-item ${selectedItem && selectedItem.id === item.id ? 'active' : ''}`}
                                id={item.id}
                                onClick={() => handleItemClick(item)}
                            >
                                {item.label}
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </li>
    );
}

export default Dropdown;