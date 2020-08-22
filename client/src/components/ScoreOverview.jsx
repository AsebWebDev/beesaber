import React, { Component } from 'react';
import { MDBContainer, MDBTabPane, MDBTabContent, MDBNav, MDBNavItem, MDBNavLink } from "mdbreact";
import { connect } from 'react-redux';
import { formatDate} from "../helper/formatDate";

class ScoreOverview extends Component {
    state = {
        activeItem: "1"
    };

    toggle = tab => e => {
        if (this.state.activeItem !== tab) {
            this.setState({
                activeItem: tab
            });
        }
    };

    render() {
        const { dataRecent, dataTop } = this.props;
        const difficulties = ['', 'Easy', '', 'Normal', '','Hard', '', 'Expert', '', 'Expert+'];
        return (
            <MDBContainer>
                <h2 style={{"textAlign":"center", "marginTop":"20px", "marginBottom":"20px"}}>Score Overview:</h2>
                <MDBNav className="nav-tabs mt-5">
                    <MDBNavItem>
                        <MDBNavLink link to="#" active={this.state.activeItem === "1"} onClick={this.toggle("1")} role="tab" >
                            Recent
                        </MDBNavLink>
                    </MDBNavItem>
                    <MDBNavItem>
                        <MDBNavLink link to="#" active={this.state.activeItem === "2"} onClick={this.toggle("2")} role="tab" >
                            Top
                        </MDBNavLink>
                    </MDBNavItem>
                </MDBNav>
                <MDBTabContent activeItem={this.state.activeItem} >
                    <MDBTabPane tabId="1" role="tabpanel">
                        <p className="mt-2">
                            <div className="col-md-10">
                                <p>Recent Scores</p>
                                <p>(count: {dataRecent.length})</p>
                                <table className="table table-hover">
                                    <thead>
                                        <tr>
                                        <th scope="col">Rank</th>
                                        <th scope="col">Song</th>
                                        <th scope="col">Level</th>
                                        <th scope="col">Date - Time</th>
                                        <th scope="col">Score</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {dataRecent.map((data, index) => {
                                            return(
                                            <tr key={index}>
                                                <td>#{data.rank}</td>
                                                <td>
                                                <img src={`https://new.scoresaber.com/api/static/covers/${data.songHash}.png`} alt="Cover"/>
                                                {data.songAuthorName} - {data.songName} by {data.levelAuthorName}
                                                </td>
                                                <td>{difficulties[data.difficulty]}</td>
                                                <td>{formatDate(data.timeSet)}</td>
                                                <td>{data.score}</td>
                                                </tr>
                                            )})
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </p>
                    </MDBTabPane>
                    <MDBTabPane tabId="2" role="tabpanel">
                        <p className="mt-2">
                            <div className="col-md-10">
                                <p>Top Scores</p>
                                <p>(count: {dataTop.length})</p>
                                <table className="table table-hover">
                                    <thead>
                                    <tr>
                                        <th scope="col">Rank</th>
                                        <th scope="col">Song</th>
                                        <th scope="col">Level</th>
                                        <th scope="col">Date - Time</th>
                                        <th scope="col">Score</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {dataTop.map((data, index) => {
                                        return(
                                            <tr key={index}>
                                                <td>#{data.rank}</td>
                                                <td>
                                                    <img src={`https://new.scoresaber.com/api/static/covers/${data.songHash}.png`} alt="Cover"/>
                                                    {data.songAuthorName} - {data.songName} by {data.levelAuthorName}
                                                </td>
                                                <td>{difficulties[data.difficulty]}</td>
                                                <td>{formatDate(data.timeSet)}</td>
                                                <td>{data.score}</td>
                                            </tr>
                                        )})
                                    }
                                    </tbody>
                                </table>
                            </div>
                        </p>
                    </MDBTabPane>
                </MDBTabContent>
            </MDBContainer>
        );
    }
}
function mapStateToProps(reduxState){
    return {
        userdata : reduxState.userdata
    };
}
export default connect(mapStateToProps)(ScoreOverview);