import React from 'react'
import { MDBBtn } from 'mdbreact';
import '../styles/Spinner.scss'

export default function Spinner(props) {
    const { text } = props 

    return (
        <div id="spinner">
            <MDBBtn outline size="sm" color="warning">
            <div className="spinner-border text-warning" role="status" />
                {/* <MDBIcon far icon="paper-plane" className="ml-1" /> */}
                <span>{text}</span>
            </MDBBtn>
        </div>
               
    )
}
