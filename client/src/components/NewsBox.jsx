import React from 'react'
import { connect } from 'react-redux';
import DiffTag from './DiffTag'
import OneNews from './OneNews'

import '../styles/NewsBox.scss'

function NewsBox(props) {
    const newsLength = props.userdata.news.length
    const startIndex = (newsLength > 5) ? newsLength : 0 // If News Length < 5 show all news
    const numOfNews = (newsLength > 5) ? 5 : 0           // If News Length < 5 show all news
    const news = props.userdata.news.slice(startIndex - numOfNews, newsLength).reverse() // show last 5 news
    console.log("NewsBox -> news", news)
    return (
        <div id="newsbox" className="card-container">
            <h3>NewsBox</h3>
            {news.map(oneNews => <OneNews oneNews={oneNews}/>)}
        </div>
    ) 
}

function mapStateToProps(reduxState){
    return {
      userdata: reduxState.userdata,
    }
  }
  
export default connect(mapStateToProps)(NewsBox)