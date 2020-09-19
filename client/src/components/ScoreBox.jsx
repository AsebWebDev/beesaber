import React, { useState, useEffect} from 'react';
import { MDBContainer, MDBTabContent, MDBNav, MDBNavItem, MDBNavLink } from "mdbreact";
import { connect } from 'react-redux';
import ScoreTabs from './ScoreTabs'
import Pagination from "./Pagination";
import '../styles/ScoreBox.scss'

function ScoreOverview(props) {
    let [activeItem, setActiveItem] = useState('1')
    let [allScores, setAllScores] = useState([])
    let [pageLimit, setPageLimit] = useState(5)
    let [offset, setOffset] = useState(5)
    let [currentScores, setCurrentScores] = useState([])
    const { data, size } = props;
    const totalScores = allScores.length;

    const onPageChanged = data => {
        const { currentPage, pageLimit } = data;
        const offset = (currentPage - 1) * pageLimit;
        setPageLimit(pageLimit)
        setOffset((currentPage - 1) * pageLimit)
        setCurrentScores(allScores.slice(offset, offset + pageLimit))
    };

    const toggle = tab => {
        if (activeItem !== tab) setActiveItem(tab)
    };

    useEffect(() => {
        if (activeItem === '1') setAllScores(data.scoresRecent)
        if (activeItem === '2') setAllScores(data.scoresTop)
    }, [data, activeItem])

    useEffect(() => {
        setCurrentScores(allScores.slice(offset, offset + pageLimit))
    }, [allScores])

    if (totalScores === 0) return null;
    else return (
        <MDBContainer id="scorebox" className={"card-container score-box scores-size-" + size}>
                <h3>MY SCORES</h3>
                <MDBNav className="nav-tabs mt-5">
                    <MDBNavItem>
                        <MDBNavLink link to="#" active={activeItem === '1'} onClick={() => toggle('1')} role="tab" >
                            Recent
                        </MDBNavLink>
                    </MDBNavItem>
                    <MDBNavItem>
                        <MDBNavLink link to="#" active={activeItem === '2'} onClick={() => toggle('2')} role="tab" >
                            Top
                        </MDBNavLink>
                    </MDBNavItem>
                </MDBNav>
                <MDBTabContent activeItem={activeItem} >
                    <ScoreTabs tabId={activeItem} data={currentScores} size={size}/>
                </MDBTabContent>
                <div className="pagination">
                    <div className="d-flex flex-row py-4 align-items-center">
                    <Pagination
                        totalScores={totalScores}
                        pageLimit={5}
                        pageNeighbours={1}
                        onPageChanged={onPageChanged}
                    />
                    </div>
                </div>
        </MDBContainer>
    )
}

function mapStateToProps(reduxState){
    return {
        userdata : reduxState.userdata
    };
}

export default connect(mapStateToProps)(ScoreOverview);