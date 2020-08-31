import React from 'react'
import { connect } from 'react-redux';
import DiffTag from './DiffTag'
import OneNews from './OneNews'

import '../styles/NewsBox.scss'

function NewsBox(props) {
    const numOfNews = 5
    const news = props.userdata.news.slice(props.userdata.news.length-numOfNews,props.userdata.news.length).reverse() // show last 5 news
    return (
        <div id="newsbox" className="card-container">
            <h3>NewsBox</h3>
            <DiffTag diff="1"/>
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