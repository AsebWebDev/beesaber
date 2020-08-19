import React, { Component } from 'react';
import { connect } from 'react-redux';
import { formatDate} from "../helper/formatDate";

class ScoreOverview extends Component {

    render() {
        const { data } = this.props;
        const difficulties = ['', 'Easy', '', 'Normal', '','Hard', '', 'Expert', '', 'Expert+'];
        return (
            <div className="col-md-10 offset-md-1">
                <h2 style={{"textAlign":"center", "marginTop":"20px", "marginBottom":"20px"}}>Score Overview:</h2>
                <p>Scores: {data.length} </p>
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
                    {data.map((data, index) => {
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
        );
    }
}
function mapStateToProps(reduxState){
    return {
        userdata : reduxState.userdata
    };
}
export default connect(mapStateToProps)(ScoreOverview);