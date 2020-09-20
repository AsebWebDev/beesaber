import React from 'react'
import { MDBIcon } from 'mdbreact';
import '../styles/NeonButton.scss'

export default function NeonButton(props) {
    return (
        <div id="neon-button">
            <div id="button" className={"neon-button-" + props.color}>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <MDBIcon fab icon={props.logo || ''}/> {props.text}
            </div>
        </div>
    )
}
