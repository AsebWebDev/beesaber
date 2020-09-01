import React from 'react'
import BeeTag from './BeeTag'
import { createNewsText } from "../helper/createNewsText";

export default function OneNewsText(props) {
    const { type, diff, bee, song} = props.oneNews
    console.log("OneNewsText -> props.oneNews", props.oneNews)
    const classNm = 'one-news-text card-text'
    const beeNm = <b><i className="fab fa-forumbee" aria-hidden="true"></i>  {bee}</b>

    switch(type) {
        case 'ownNewScores': {
            return (<p className={classNm}>
                You gained <b>{diff}</b> new Score{(diff > 1)?'s':''}!
            </p>)
        }

        case 'morePlayed': {
            return (<p className={classNm}>
                Your Bee {beeNm} played <b>{diff}</b> new song{(diff > 1)?'s':''}!
            </p>)

        }

        case 'beatScore': {
            const { songName, songAuthorName, score, myScore  } = song
            return (<p className={classNm}>
                Your Bee {beeNm} beat you at {songName} ({songAuthorName})!
                {beeNm}:{score} / You: {myScore}
            </p>)
        }

        default: return ( 
                <p className="card-text">{props.oneNews.text}</p>
            )

    }
}
