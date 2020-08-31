import React from 'react'

export default function OneNews(props) {
    const { oneNews } = props
    return (
        <div id="one-news">
            {oneNews.text}
        </div>
    )
}
