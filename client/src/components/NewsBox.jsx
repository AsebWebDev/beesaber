import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { MDBIcon } from 'mdbreact';
import OneNews from './OneNews'
import '../styles/NewsBox.scss'

function NewsBox(props) {
    let news = [ ...props.userdata.news ]
    const newsLength = news.length
    const maxNumOfNews = 5
    // This part calculates the maximum number of scrolls possible with given array. Start Index is 0 to currently hardcoded 5, or length of
    // array, if lower than 5. Each time the arrows in the component are clicke start and end index are shiftet forward or backwards, when 
    // another scroll is possible (maxScrolls).
    const rest = newsLength % maxNumOfNews
    let maxScrolls; 
      if (newsLength === maxNumOfNews) maxScrolls = 0 // when news length does not exceed limit, no scrolling us needed
      else maxScrolls = (rest > 0) ? ( ( ( newsLength - rest ) / maxNumOfNews ) ) : ( newsLength / maxNumOfNews ) // calc how many scrolls are possible
    const [scrollCounter, setScrollCounter] = useState(0)
    const [startIndex, setStartIndex] = useState(0)
    const [endIndex, setEndIndex] = useState( Math.min(newsLength, maxNumOfNews) )
    
    const handleUpClick = () => {
      if (scrollCounter > 0) {
        setScrollCounter(scrollCounter - 1)
        setStartIndex(startIndex - maxNumOfNews)
        setEndIndex(endIndex - maxNumOfNews)
      }
    }

    const handleDownClick = () => {
      if (scrollCounter < maxScrolls) {
        setScrollCounter(scrollCounter + 1)
        setStartIndex(startIndex + maxNumOfNews)
        setEndIndex(endIndex + maxNumOfNews)
      }
    }

    useEffect(() => {
      setEndIndex(Math.min(newsLength, maxNumOfNews)) 
    }, [props.userdata, newsLength])

    return (
      <div id="newsbox" className="card-container">
          <h3>NewsBox</h3>
          {scrollCounter !== 0 && <div className="scrollnav" onClick={handleUpClick} ><MDBIcon icon="angle-up" /></div>}
          {news && news.slice(startIndex, endIndex).map( ( oneNews, i ) => <OneNews key={i} oneNews={oneNews}/>)}
          {scrollCounter < maxScrolls && <div className="scrollnav" onClick={handleDownClick}><MDBIcon icon="angle-down"/></div>}
      </div>
    ) 
}

function mapStateToProps(reduxState){
    return {
      userdata: reduxState.userdata,
    }
  }
  
export default connect(mapStateToProps)(NewsBox)    