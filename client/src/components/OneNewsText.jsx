import React from 'react'

export default function OneNewsText(props) {
    const { type, diff, bee, song} = props.oneNews
    console.log("OneNewsText -> props.oneNews", props.oneNews)
    const classNm = 'card-text'
    const beeNm = <b className="bee-yellow"><i className="fab fa-forumbee" aria-hidden="true"></i>  {bee}</b>

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
                Your Bee {beeNm} beat you at<br/> <b className="neon-blue">{songName}</b> <i>({songAuthorName})</i>!<br/>
                {beeNm}: {score} <span className="greyed-out">( You: {myScore} )</span>
            </p>)
        }

        default: return ( 
                <p className="card-text">{props.oneNews.text}</p>
            )

    }
}
