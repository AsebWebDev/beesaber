import React from 'react'
import TimeAgo from 'react-timeago'
import germanStrings from 'react-timeago/lib/language-strings/de'
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter'
import DiffTags from './DiffTag'
import Symbol from './Symbol'
import OneNewsText from './OneNewsText'
import '../styles/OneNews.scss'

export default function OneNews(props) {
    const formatter = buildFormatter(germanStrings)
    const { text, type, song, date } = props.oneNews
    const difficulty = (song) ? song.difficulty : null
    
    return (
        <div id="one-news">
            <div className="card"> 
                <div className="card-body">
                    <h5 className="card-title">{type && <Symbol type={type}/>}New Score</h5>
                    {/* <p className="card-text">{createNewsText(props.oneNews)}</p> */}
                    <OneNewsText oneNews={props.oneNews} />
                    <a className="card-link"><DiffTags diff={difficulty} /></a>
                    <a className="card-link"><TimeAgo date={date} formatter={formatter} /></a>
                </div>
            </div>
        </div>
    )
}
