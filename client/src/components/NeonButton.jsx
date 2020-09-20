import React from 'react'
import { MDBIcon } from 'mdbreact';
import '../styles/NeonButton.scss'

export default function NeonButton(props) {
    return (
        <div id="neon-button">
            <a href="/#">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <MDBIcon fab icon={props.logo}/> {props.text}
            </a>
        </div>
    )
}
