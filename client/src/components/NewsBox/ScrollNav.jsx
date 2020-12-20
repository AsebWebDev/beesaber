import React from "react";
import { connect } from "react-redux";
import { MDBIcon } from "mdbreact";
import "./ScrollNav.scss";

function ScrollNav(props) {
  const isFetchingData = props.fetchingData.status;
  const { handleClick, direction } = props;
  return (
    <div
      className="scrollnav"
      onClick={isFetchingData ? null : () => handleClick(direction)}
    >
      <MDBIcon
        className={isFetchingData ? "spinner-icon" : ""}
        icon={isFetchingData ? "spinner" : `angle-${direction}`}
      />
    </div>
  );
}

function mapStateToProps(reduxState) {
  return {
    fetchingData: reduxState.fetchingData,
  };
}

export default connect(mapStateToProps)(ScrollNav);
