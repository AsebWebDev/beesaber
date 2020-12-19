import React from 'react'
import BeeTag from '../BeeTag'

function HighscoreTable(props) {
    const { i, bee } = props;
    return (
        <tr key={i} >
            <td><BeeTag bee={bee}/></td>
            <td className={bee.beeScore > bee.myScore ? "bold-text" : ""}>
                {bee.beeScore}
            </td>
            <td className={bee.beeScore < bee.myScore ? "bold-text" : ""}>
                {bee.myScore}
            </td>
        </tr>
    )
}

export default HighscoreTable
