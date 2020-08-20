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

    pageNumber = (number) => {
        return (
            <li
                key={number}
                id={number}
                onClick={this.handleClick}
            >
                {number}
            </li>
        );
    };

    renderPagination = (number, currentPage) => {
        const showSDots = currentPage > 4;
        const showEDots = currentPage < number - 3;

        const pagination = [];
        if (currentPage !== 1) {
            pagination.push(this.pageNumber(1));
        }
        if (showSDots) {
            pagination.push(this.pageNumber('..'));
        } else {
            for (let i = 2; i < currentPage-1; i++) {
                pagination.push(this.pageNumber(i));
            }
        }
        if (currentPage > 2) pagination.push(this.pageNumber(currentPage-1));
        pagination.push(this.pageNumber(currentPage));
        if (currentPage < number-1) pagination.push(this.pageNumber(currentPage+1));
        if (showEDots) {
            pagination.push(this.pageNumber('...'));
        } else {
            for (let i = currentPage + 2; i <number; i++) {
                pagination.push(this.pageNumber(i));
            }
        }
        /*pagination.push(this.pageNumber(number));*/
        return pagination;
    };

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
        for (let i = 1; i <= this.numPages(); i++) {
            pageNumbers.push(i);
        }

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
                            {this.renderPagination(pageNumbers, currentPage)}
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