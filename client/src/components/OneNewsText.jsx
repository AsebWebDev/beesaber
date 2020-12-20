import React from "react";
import { MDBContainer, MDBTooltip, MDBBadge } from "mdbreact";
import DiffTags from "./DiffTag";

export default function OneNewsText(props) {
  const { type, diff, bee, song, songs, numPlayedMore } = props.oneNews;
  const maxSongs = 4;
  const classNm = "card-text";
  const beeNm = (
    <b className="bee-yellow">
      <i className="fab fa-forumbee" aria-hidden="true"></i> {bee}
    </b>
  );
  // Due to the MDBTooltip we can not render a new compoment on hover without shortcutting the logic of MDBTooltip
  // Instead we just resuse the variable scoreTooltip like this:
  const scoreTooltip =
    songs && songs.length > 0 ? (
      <table className="scores-tooltip">
        {songs && (
          <tbody>
            {songs.slice(0, maxSongs).map((song, i) => (
              <tr key={i}>
                <td>
                  <MDBBadge color="pink">{song.rank}</MDBBadge>
                </td>
                <td>
                  <DiffTags diff={song.difficulty} />
                </td>
                <td>
                  <MDBBadge color="light">{song.songName}</MDBBadge>
                </td>
              </tr>
            ))}

            {songs.length > maxSongs && (
              <tr>
                <td>+{songs.length - maxSongs} more</td>
              </tr>
            )}
          </tbody>
        )}
      </table>
    ) : (
      // FIXME: Due to a known error when login in after a long time and songs played
      // in the meantime the data is not loaded correctly from the BE. So for not we
      // are just showing a message instead of an empty tooltip. Unfortunately MDBReact
      // does not allow to hide the HTML Element on missing data.
      <div>Oops! There has been an error.</div>
    );

  switch (type) {
    case "ownNewScores": {
      return (
        <MDBContainer>
          <MDBTooltip domElement tag="span" placement="top">
            <span className={classNm}>
              You gained <b>{diff}</b> new Score{diff > 1 ? "s" : ""}!
            </span>
            {scoreTooltip}
          </MDBTooltip>
        </MDBContainer>
      );
    }

    case "morePlayed": {
      return (
        <MDBContainer>
          <MDBTooltip domElement tag="span" placement="top">
            <span className={classNm}>
              {beeNm} played <b>{numPlayedMore}</b> new song
              {numPlayedMore > 1 ? "s" : ""}!
            </span>
            {scoreTooltip}
          </MDBTooltip>
        </MDBContainer>
      );
    }

    case "beatScore": {
      const { songName, songAuthorName, score, myScore } = song;
      return (
        <p className={classNm}>
          {beeNm} beat you at <b className="neon-blue">{songName}</b>{" "}
          <i>({songAuthorName}) </i>
          with a Score of <b>{score}</b>{" "}
          <i>
            (<span className="greyed-out">You - {myScore}</span>)
          </i>{" "}
          !
        </p>
      );
    }

    default:
      return <p className="card-text">{props.oneNews.text}</p>;
  }
}
