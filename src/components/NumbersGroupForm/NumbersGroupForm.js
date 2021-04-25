import React, { useEffect, useState } from 'react'
import { useHistory } from "react-router-dom";
import removeIcon from '../../assets/remove.png';
import "./NumbersGroupForm.scss";

const NumberBlock = ({ value, isChecked, id, onhandleClick }) => (
    <div
        className="number-block number-block--pointer"
        style={{
            color: isChecked ? '#1E90FF' : '#000'
        }}
        onClick={() => isChecked || onhandleClick(id)}
    >
        {value}
    </div>
)

const SelectedNumber = ({ value, id, onhandleClick }) => (
    <div
        className="number-block number-block--selected"

    >
        {value} <span onClick={() => onhandleClick(id)} className="number-block__remove number-block--pointer"><img src={removeIcon} alt="remove" className="number-block__remove" /></span>
    </div>
)

const NumbersGroupForm = () => {
    const history = useHistory();
    const [totalNumbers, setTotalNumbers] = useState([]);
    const [hasFiveSelectedNumbers, setHasFiveSelectedNumbers] = useState(false);

    useEffect(() => {
        // populate an array with unique objects (unique reference)
        // we could use [...new Array(30)].map((item, index)=> { id: i + 1, value: i + 1, isChecked: false });
        // but map can get expensive
        let totalNumbersArray = new Array(30);
        for (let i = 0; i < totalNumbersArray.length; i++) {
            totalNumbersArray[i] = { id: i + 1, value: i + 1, isChecked: false };
        }
        setTotalNumbers(totalNumbersArray)
    }, [])

    const handleCheckElement = (id) => {
        // we need to render a copy of the component to render
        const updatedTotalNumbersArray = totalNumbers.map((item) =>
            item.id === id ? { ...item, isChecked: !item['isChecked'] } : item
        );
        const searchForChecked = updatedTotalNumbersArray.filter(item => item.isChecked === true);
        searchForChecked.length >= 5 ? setHasFiveSelectedNumbers(true) : setHasFiveSelectedNumbers(false);
        setTotalNumbers(updatedTotalNumbersArray)
    }

    const submitNumbers = (event) => {
        event.preventDefault();
        history.push("/draw")
    }

    return (
        <div className="numbers-form__container">
            <div className="numbers-form__numbers numbers-form__numbers--pool">
                {
                    totalNumbers && totalNumbers.map((item) => {
                        return (
                            <NumberBlock
                                key={item.id}
                                onhandleClick={hasFiveSelectedNumbers || handleCheckElement}
                                id={item.id}
                                isChecked={item.isChecked}
                                value={item.value}
                            />
                        )
                    })
                }
                <div className="description">{hasFiveSelectedNumbers ? 'Submit if you are ready' : 'Please choose 5 numbers'}</div>
            </div>
            <div className="numbers-form__numbers numbers-form__numbers--selected">
                {totalNumbers && totalNumbers.map((item) => {
                    return item.isChecked ?
                        <SelectedNumber
                            key={item.id}
                            onhandleClick={handleCheckElement}
                            id={item.id}
                            value={item.value}
                        /> : null
                })
                }
                {hasFiveSelectedNumbers && (
                    <button onClick={submitNumbers} className="numbers-form__button">
                        submit
                    </button>)
                }
            </div>
        </div>
    );
};

export default NumbersGroupForm;