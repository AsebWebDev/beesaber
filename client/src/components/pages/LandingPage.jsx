import React from 'react'
import { connect } from 'react-redux';
import GoolgeOAuth from '../GoolgeOAuth';
import '../../styles/pages/LandingPage.scss'
import BrandLogo from '../BrandLogo'

function LandingPage(props) {
    const loggingIn = props.loggingIn
    return (
        <div id="landing-page">
            <h1 className="beesaber-title"><span className="neon-red">Bee</span><span className="neon-blue">Saber</span></h1>
            <div className="d-flex landing align-items-center">
                <BrandLogo />
                {!loggingIn && <h2 className="neon-yellow">Please login with your Google-Account</h2>}
                <GoolgeOAuth />
                {loggingIn && <h2 className="neon-yellow">Logging you ... wait for it ... </h2>}
            </div>
        </div>
    )
}

function mapStateToProps(reduxState){
    return {
        loggingIn: reduxState.loggingIn
    }
  }
  
export default connect(mapStateToProps)(LandingPage)
