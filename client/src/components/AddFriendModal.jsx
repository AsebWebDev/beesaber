import React, { useEffect, useState } from 'react';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';

export default function AddFriendModal(props) {

    return (
        <div>
            <MDBContainer>
                {/* <MDBBtn onClick={toggle}>Modal</MDBBtn> */}
                <MDBModal isOpen={true} toggle={props.handleSave}>
                    <MDBModalHeader toggle={props.handleSave}>MDBModal title</MDBModalHeader>
                    <MDBModalBody>
                    (...)
                    </MDBModalBody>
                    <MDBModalFooter>
                    <MDBBtn color="secondary" onClick={props.handleSave}>Close</MDBBtn>
                    <MDBBtn color="primary">Save changes</MDBBtn>
                    </MDBModalFooter>
                </MDBModal>
            </MDBContainer>
        </div>
    )
}
