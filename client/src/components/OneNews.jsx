import React from 'react'
import TimeAgo from 'react-timeago'
import germanStrings from 'react-timeago/lib/language-strings/de'
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter'
import '../styles/OneNews.scss'

export default function OneNews(props) {
    const formatter = buildFormatter(germanStrings)
    const { text, type, song, date } = props.oneNews
    const difficulty = (song) ? song.difficulty : null

    return (
        <div id="one-news">
            {text}
            <TimeAgo date={date} formatter={formatter} />
            {difficulty}
        </div>
    )
}
