import React from 'react';
import './Messages.css'

const error= props =>{

    return(
        <div className={props.style}>
            <span className="header">{props.header} </span>
            <span className="msg">{props.msg}</span>
        </div>
    )
}

export default error;