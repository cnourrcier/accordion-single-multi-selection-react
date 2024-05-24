import { useEffect, useState } from 'react';
import data from './data';
import './styles.css';

export default function Accordion() {
    const [singleSelect, setSingleSelect] = useState(null);
    const [enableMultiSelect, setEnableMultiSelect] = useState(false);
    const [multiSelect, setMultiSelect] = useState([]);

    // Handler for single item selection
    function handleSingleSelect(id) {
        setSingleSelect(singleSelect === id ? null : id); // Toggle selection
    }

    // Enable multi-select mode
    function handleEnableMultiSelect() {
        setEnableMultiSelect(true);
    }

    // Disable multi-select mode
    function handleDisableMultiSelect() {
        setEnableMultiSelect(false);
    }

    // Handler for multi-item selection
    function handleMultiSelect(id) {
        const multiSelectCopy = [...multiSelect];
        const index = multiSelectCopy.indexOf(id);
        index > -1 ? multiSelectCopy.splice(index, 1) : multiSelectCopy.push(id); // Add or remove item
        setMultiSelect(multiSelectCopy);
    }

    useEffect(() => {
        if (enableMultiSelect) {
            if (singleSelect) {
                setMultiSelect([singleSelect]); // transfer single selection to multiSelect
                setSingleSelect(null); // clear singleSelect state
            }
        } else {
            setMultiSelect([]); // clear multiSelect state
        }
    }, [enableMultiSelect])

    return (
        <div className='container'>
            <button onClick={
                enableMultiSelect
                    ? handleDisableMultiSelect
                    : handleEnableMultiSelect
            }
                className='single-multi-select-button'
            >
                Switch to {enableMultiSelect ? 'Single Selection' : 'Multiple Selections'}
            </button>
            <div className='data-list-container'>
                <ul className='data-list'>
                    {
                        data.map(dataItem =>
                            <li onClick={enableMultiSelect ? () => handleMultiSelect(dataItem.id) : () => handleSingleSelect(dataItem.id)}
                                className='data-list-item'
                                key={dataItem.id}
                            >
                                <div className='question'>
                                    {dataItem.question}
                                    <span>+</span>
                                </div>
                                <div
                                    className={
                                        singleSelect === dataItem.id || multiSelect.indexOf(dataItem.id) > -1
                                            ? 'answer'
                                            : 'answer hidden'
                                    }
                                >
                                    {dataItem.answer}
                                </div>
                            </li>)
                    }
                </ul>
            </div>
        </div>
    )
}