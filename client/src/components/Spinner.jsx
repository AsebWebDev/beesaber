import React from 'react'
import minilogo from '../media/251.jpg'
import '../styles/Spinner.scss'

export default function Spinner(props) {
    const { text } = props 

    return (
        <div id="spinner">
            <div className="spinner-border text-warning" role="status">
                <span><img id="minilogo" src={minilogo}/></span>
            </div>
            {text}  
        </div>
               
    )
}
