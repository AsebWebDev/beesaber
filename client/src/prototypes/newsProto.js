import React from 'react';

export default class News {
    constructor(news) {
        this.text = news.text
        this.type = news.type
        this.bee = news.bee
        this.beeSocre = news.beeSocre
        this.myScore = news.myScore
        this.song = news.song
        this.songs = news.songs
        this.date = news.date
        this.numPlayedMore = news.numPlayedMore
        this.diff = news.diff
    }

    showText = () => {
        console.log(this.text)
    }

    createText = () => {
        const { text, type, diff, bee, song, numPlayedMore} = this
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
                    {beeNm} played <b>{numPlayedMore}</b> new song{(numPlayedMore > 1)?'s':''}!
                </p>)
    
            }
    
            case 'beatScore': {
                const { songName, songAuthorName, score, myScore  } = song
                return (<p className={classNm}>
                    {beeNm} beat you at <b className="neon-blue">{songName}</b> <i>({songAuthorName}) </i> 
                    with a Score of <b>{score}</b> <i>(<span className="greyed-out">You - {myScore}</span>)</i> !
                </p>)
            }
    
            default: return ( 
                    <p className="card-text">{text}</p>
                )
    
        }
    }
}