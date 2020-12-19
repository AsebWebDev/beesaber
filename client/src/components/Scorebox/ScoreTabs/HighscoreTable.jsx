import React from "react";
import BeeTag from "../../BeeTag/BeeTag";

function HighscoreTable(props) {
  const { i, bee } = props;
  const won = bee.myScore > bee.beeScore;
  return (
    <tr key={i}>
      <td>
        <BeeTag bee={bee} />
      </td>
      <td className={!won ? "bold-text" : ""}>{bee.beeScore}</td>
      <td className={won ? "bold-text" : ""}>{bee.myScore}</td>
    </tr>
  );
}

export default HighscoreTable;
