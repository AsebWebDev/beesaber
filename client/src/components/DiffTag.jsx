import React from 'react'
import '../styles/DiffTag.scss'

export default function DiffTag(props) {
    let badgeColor, badgeText

    switch(props.diff) {
        case '1': badgeColor = "badge badge-success"; badgeText="Easy"; break;
        case '2': badgeColor = "badge badge-primary"; badgeText="Normal"; break;
        case '3': badgeColor = "badge badge-warning"; badgeText="Hard"; break;
        case '4': badgeColor = "badge badge-secondary"; badgeText="Expert"; break;
        case '5': badgeColor = "badge badge-danger"; badgeText="Expert+"; break;
        default: badgeColor = "badge badge-default"; badgeText="Oops"; break;
    }
    
    return (
        <span id="diff-tag" className={badgeColor}>{badgeText}</span>
    )
}
