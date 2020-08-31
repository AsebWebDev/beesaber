import React from 'react'
import '../styles/Symbol.scss'

export default function Symbol(props) {
    let symbol, color, font
    switch (props.type) {
        case 'beatScore': symbol='fas fa-trophy'; color='yellow'; font={ color: 'black' }; break;
        case 'morePlayed': symbol='fas fa-gamepad'; color='green'; font={ color: 'white' }; break;
        default: symbol='fas fa-info-circle'; color='light'; font={ color: 'black' }; break;
    }
    return (
        <span id="symbol" className={"badge badge-pill " + color}>
            <i className={symbol} style={font}></i>
        </span>
    )
}
