import React from "react";
import { connect } from 'react-redux';
import { MDBNotification, MDBContainer } from "mdbreact";
import { returnNotificationColor, returnNotificationSymbol } from '../helper/notifications'
import TimeAgo from 'react-timeago'
import germanStrings from 'react-timeago/lib/language-strings/de'
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter'
import '../styles/Notification.scss'

const formatter = buildFormatter(germanStrings)

function Notification (props) {
    return (
        <MDBContainer>
                {props.notifications.map((notification,i) => {

                    if (notification.toBeDeleted) return (<div key={i}/>)
                    else return (
                        <div className="notification" key={i}>
                            <MDBNotification
                            autohide={7000} 
                            bodyClassName="notification-body"
                            show
                            fade
                            icon={returnNotificationSymbol(notification.typeOfNotification)}
                            iconClassName={returnNotificationColor(notification.typeOfNotification)}
                            title={notification.typeOfNotification}
                            message={notification.notification}
                            text={<TimeAgo date={notification.created} formatter={formatter} />}                        
                            />
                        </div>
                    )
                }   
            )}
        </MDBContainer>
    );
}


function mapStateToProps(reduxState){
    return { notifications: reduxState.notifications }
}

export default connect(mapStateToProps)(Notification)
