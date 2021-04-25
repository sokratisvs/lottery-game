import React, { useEffect, useState } from 'react'
import { useHistory } from "react-router-dom";
import "./NumbersGroupForm.scss";

const NumberBlock = ({ value, isChecked, id, onhandleClick }) => {
    return (
        <div
            className="number-block"
            style={{
                color: isChecked ? '#1E90FF' : '#000'
            }}
            onClick={() => isChecked || onhandleClick(id)}
        >
            {value}
        </div>
    )
}

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
        setTotalNumbers(updatedTotalNumbersArray)
    }

    const submitNumbers = (event) => {
        event.preventDefault();
        history.push("/draw")
    }

    return (
        <div className="numbers-form__container">
            <div className="numbers-form__numbers">
                {
                    totalNumbers && totalNumbers.map((item) => {
                        return (
                            <NumberBlock
                                key={item.id}
                                onhandleClick={handleCheckElement}
                                id={item.id}
                                isChecked={item.isChecked}
                                value={item.value}
                            />
                        )
                    })
                }
            </div>
            <div className="numbers-form__numbers">
                {totalNumbers && totalNumbers.map((item) => {
                    return item.isChecked ? <div className="number-block number-block--selected" key={item.value}>{item.value} <span className="number-block__remove">x</span></div> : null
                })
                }
            </div>

            {/* {hasFiveSelectedNumbers && (
                <button onClick={submitNumbers}>
                    submit
                </button>)
            } */}

        </div>
    );
};

export default NumbersGroupForm;