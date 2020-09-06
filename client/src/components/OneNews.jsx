import React from 'react'
import TimeAgo from 'react-timeago'
import englishStrings from 'react-timeago/lib/language-strings/en'
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter'
import DiffTags from './DiffTag'
import Symbol from './Symbol'
import { parseNewsTitle } from '../helper/news'
import OneNewsText from './OneNewsText'
import '../styles/OneNews.scss'

export default function OneNews(props) {
    const formatter = buildFormatter(englishStrings)
    const { type, song, date } = props.oneNews
    const difficulty = (song) ? song.difficulty : null

    return (
        <div id="one-news">
            <div className="card"> 
                <div className="card-body">
                    {type === 'beatScore' && <div>
                        <h5 className="card-title">{type && <Symbol type={type}/>}{parseNewsTitle(type)}</h5>
                        <OneNewsText oneNews={props.oneNews} />
                    </div>}
                    
                    {type !== 'beatScore' && 
                    <h5 className="card-title">{type && <Symbol type={type}/>}<OneNewsText oneNews={props.oneNews} /></h5>}
                    
                    {difficulty && <span className="card-link"><DiffTags diff={difficulty} /></span>}
                    <span className="card-link blue-text"><b><TimeAgo date={date} formatter={formatter} /></b></span>
                </div>
                {song && <img className="pic-preview img-thumbnail" src={`https://new.scoresaber.com/api/static/covers/${song.songHash}.png`} alt="Cover"/>}
            </div>
        </div>
    )
}
