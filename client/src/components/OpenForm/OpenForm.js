import React from 'react'
import './OpenForm.scss'
const OpenForm = (props) => {
    return (
        <div className="openFormBtn">
            <button onClick={props.onClick}>Open Form</button>
        </div>
    )
}

export default OpenForm
