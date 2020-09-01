import React, { Component } from 'react';
import { connect } from 'react-redux';
import Pagination from "./Pagination";
import '../styles/ScoreBox.scss';

class ScoreBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allScores: [],
            currentPage: null,
            currentScores: [],
            totalPages: null
        };
    };

    componentDidMount() {
        this.setState({  allScores: this.props.data });
    }

    onPageChanged = data => {
        const { allScores } = this.state;
        const { currentPage, totalPages, pageLimit } = data;

        const offset = (currentPage - 1) * pageLimit;
        const currentScores = allScores.slice(offset, offset + pageLimit);

        this.setState({ currentPage, currentScores, totalPages });
    };

    render() {
        const { data } = this.props;
        const { allScores, currentScores, currentPage, totalPages } = this.state;
        const totalScores = allScores.length;

        if (totalScores === 0) return null;

        return (
            <div id="scorebox" className="card-container">
                <div className="col-md-12">
                    {/* <h6 style={{"textAlign":"left", "marginTop":"20px", "marginBottom":"20px"}}>Latest Scores:</h6> */}
                    <h3>Latest Scores</h3>
                    <table className="table table-box table-hover">
                        <thead>
                        <tr>
                            <th className="rank" scope="col">Rank</th>
                            <th scope="col">Song</th>
                            <th className="score" scope="col">Score</th>
                        </tr>
                        </thead>
                        <tbody>
                        {currentScores.map((data, index) => {
                            return(
                                <tr key={index}>
                                    <td>{data.rank}</td>
                                    <td>{data.songAuthorName} - {data.songName}</td>
                                    <td>{data.score}</td>
                                </tr>
                            )})
                        }
                        </tbody>
                    </table>
                    <div className="pagination">
                        <div className="d-flex flex-row py-4 align-items-center">
                        <Pagination
                            totalScores={totalScores}
                            pageLimit={5}
                            pageNeighbours={1}
                            onPageChanged={this.onPageChanged}
                        />
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}
function mapStateToProps(reduxState){
    return {
        userdata : reduxState.userdata
    };
}
export default connect(mapStateToProps)(ScoreBox);