import React from 'react'

export default function Message(props) {
    return (
        <div class={"alert alert-" + props.type} role="alert">
            {props.text}
        </div>
    )
}
