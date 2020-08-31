import React from 'react'
import '../styles/BeeTag.scss'

export default function BeeTag(props) {
    return (
        <span id="beetag" className="badge badge-warning"><i class="fab fa-forumbee" aria-hidden="true"></i>{props.userName}</span>
    )
}
