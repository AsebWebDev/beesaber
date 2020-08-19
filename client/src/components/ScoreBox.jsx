import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../styles/pages/Dashboard.scss';

class ScoreBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
            scoresPerPage: 5
        };
        this.handleClick = this.handleClick.bind(this);
    };

    handleClick = (event) => {
        this.setState({
            currentPage: Number(event.target.id)
        });
    };

    numPages = () => {
        return Math.ceil(this.props.data.length / this.state.scoresPerPage);
    };

/*    createPagesUtility = (pages, index) => {
        return function getPages (number) {
            const offset = Math.floor(number / 2);
            let start, end;

            if (index + offset >= pages.length) {
                start = Math.max(0, pages.length - number);
                end = pages.length
            } else {
                start = Math.max(0, index - offset);
                end = Math.min(start + number, pages.length)
            }

            return pages.slice(start, end)
        }
    };*/

    prevPage = () => {
        if (this.state.currentPage > 1) {
            this.setState({
                currentPage: this.state.currentPage-1
            }, () =>
                this.changePage(this.state.currentPage)
            );
        }
    };

    nextPage = () => {
        if (this.state.currentPage < this.numPages()) {
            this.setState({
                currentPage: this.state.currentPage+1
                }, () =>
                    this.changePage(this.state.currentPage)
            );
        }
    };

    changePage = (page) => {
        const btn_next = document.getElementById("btn_next");
        const btn_prev = document.getElementById("btn_prev");

        if (page < 1) page = 1;
        if (page > this.numPages()) page = this.numPages();

        if (page === 1) {
            btn_prev.style.visibility = "hidden";
        } else {
            btn_prev.style.visibility = "visible";
        }

        if (page === this.numPages()) {
            btn_next.style.visibility = "hidden";
        } else {
            btn_next.style.visibility = "visible";
        }
    };

    componentDidMount() {
        document.getElementById("btn_prev").style.visibility = "hidden";
    }

    render() {
        const { data } = this.props;
        const { currentPage, scoresPerPage } = this.state;
        const indexOfLastScore = currentPage * scoresPerPage;
        const indexOfFirstScore = indexOfLastScore - scoresPerPage;
        const currentScores = data.slice(indexOfFirstScore, indexOfLastScore);

        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(data.length / scoresPerPage); i++) {
            pageNumbers.push(i);
        }

        const renderPageNumbers = pageNumbers.map(number => {
            return (
                <li
                    key={number}
                    id={number}
                    onClick={this.handleClick}
                >
                    {number}
                </li>
            );
        });

        return (
            <div className="card-container">
                <div className="col-md-12">
                    <h6 style={{"textAlign":"left", "marginTop":"20px", "marginBottom":"20px"}}>Latest Scores:</h6>
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
                        <ul id="page-numbers">
                            <li type="button" id="btn_prev" className="arrow-left" onClick={this.prevPage}>&#60;</li>
                            {renderPageNumbers}
                            <li type="button" id="btn_next" className="arrow-right" onClick={this.nextPage}>&#62;</li>
                        </ul>

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