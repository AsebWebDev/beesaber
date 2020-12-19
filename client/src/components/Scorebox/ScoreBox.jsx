import React, { useState, useEffect} from 'react';
import { MDBContainer, MDBTabContent, MDBNav, MDBNavItem, MDBNavLink, MDBInput} from "mdbreact";
import { connect } from 'react-redux';
import ScoreTabs from '../ScoreTabs/ScoreTabs'
import Pagination from "../Pagination";
import { isInQuery } from '../../helper/utils'
import './ScoreBox.scss'

function ScoreOverview(props) {
    let [activeItem, setActiveItem] = useState('1')
    let [allScores, setAllScores] = useState([])
    let [pageLimit, setPageLimit] = useState(5)
    let [offset, setOffset] = useState(5)
    let [currentScores, setCurrentScores] = useState([])
    let [query, setQuery] = useState('')
    const { data, size, bee } = props;
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
        if (activeItem === '1') setAllScores(data.scoresRecent.filter(item => isInQuery(item, query)))
        if (activeItem === '2') setAllScores(data.scoresTop.filter(item => isInQuery(item, query)))
    }, [data, activeItem, query])

    useEffect(() => {
        setCurrentScores(allScores.slice(offset, offset + pageLimit))
    }, [allScores, offset, pageLimit])

    if (totalScores === 0 && !query) return null;
    else return (
        <MDBContainer id="scorebox" className={"card-container score-box scores-size-" + size}>
                <div id="scorebox-header" className="pt-2">
                    <h3>{bee ? bee.playerName.toUpperCase() : 'MY SCORES'}</h3>
                    <MDBInput 
                        label="Filter Songs..." 
                        size="sm" 
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                    />    
                </div>
                <MDBNav className="nav-tabs mt-4 ml-2 mr-2">
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
                    <MDBNavItem>
                        <MDBNavLink link to="#" active={activeItem === '3'} onClick={() => toggle('3')} role="tab" >
                            Recent Shared
                        </MDBNavLink>
                    </MDBNavItem>
                    <MDBNavItem>
                        <MDBNavLink link to="#" active={activeItem === '4'} onClick={() => toggle('4')} role="tab" >
                            Top Shared
                        </MDBNavLink>
                    </MDBNavItem>
                </MDBNav>
                
                <MDBTabContent activeItem={activeItem} >
                    <ScoreTabs tabId={activeItem} scores={currentScores} size={size}/>
                    {(currentScores.length === 0) && <div className="no-scores">TEST</div>} 
                    {/* // FIXME: Creat "No Scores Found Component" */}
                </MDBTabContent>
                
                <div className="pagination">
                    <div className="d-flex flex-row pb-3 align-items-center">
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