import React, { Component } from 'react';
import { connect } from 'react-redux';

class ScoreOverview extends Component {

    formatDate = (date) => {
        let d = new Date(date);
        const formattedDate = ("0" + d.getDate()).slice(-2) + "/" + ("0"+(d.getMonth()+1)).slice(-2) + "/" +
            d.getFullYear() + " - " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2);
        return formattedDate;
    };

    render() {
        //console.log(this.props.data);
        const { data } = this.props;
        return (
            <div className="col-md-10 offset-md-1">
                <h2 style={{"textAlign":"center", "marginTop":"20px", "marginBottom":"20px"}}>Score Overview:</h2>
                <p>Scores: {data.length} </p>
                <table className="table table-hover">
                    <thead>
                    <tr>
                        <th scope="col">Rank</th>
                        <th scope="col">Song</th>
                        <th scope="col">Date - Time</th>
                        <th scope="col">Score</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data.map((data, index) => {
                            return(
                                <tr key={index}>
                                    <td>{data.rank}</td>
                                    <td>{data.songAuthorName} - {data.songName} by {data.levelAuthorName}</td>
                                    <td>{this.formatDate(data.timeSet)}</td>
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