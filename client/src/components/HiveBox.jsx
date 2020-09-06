import React from 'react'
import { connect } from 'react-redux';
import BeeTag from './BeeTag'
import '../styles/HiveBox.scss'

function HiveBox(props) {
    return (
        <div id="hivebox" className="card-container">
            <h3>HiveBox</h3>
            {props.userdata.bees.slice(0,5).map(( bee, i ) => <BeeTag key={i} bee={bee}/>)}
        </div>
    )
}

function mapStateToProps(reduxState){
    return {
      userdata: reduxState.userdata,
    }
  }
  
export default connect(mapStateToProps)(HiveBox)