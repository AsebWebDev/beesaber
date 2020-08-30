import React from 'react'
import { connect } from 'react-redux';

import '../styles/NewsBox.scss'

function NewsBox(props) {
    const news = props.userdata.news.slice(0,5)
    return (
        <div id="newsbox" className="card-container">
            <h3>NewsBox</h3>
            {news.map(oneNews => <div>{oneNews.text}</div>)}
        </div>
    )
}

function mapStateToProps(reduxState){
    return {
      userdata: reduxState.userdata,
    }
  }
  
export default connect(mapStateToProps)(NewsBox)