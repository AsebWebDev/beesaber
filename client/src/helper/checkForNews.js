// Function returns an Array of News
import api from '../api';
import News from '../prototypes/newsProto'

export async function checkForNews(userdata) {
    let bees = userdata.bees
    const myScoreIds = userdata.scoreData.scoredSongsHashes
    // myScoreIds.push(41918150) // FIXME: for testing
    let news = [];

    // CHECK FOR EACH BEE IN FRIENDS LIST
    for (let i = 0; i < bees.length; i++) {
        const { playerName, playerId } = bees[i]                    // get Playername and ID of Opponent
        const oldTotalPlayCount = bees[i].totalPlayCount            // Get num of Games played from database 
        await api.getScoreSaberUserInfo(playerId, 'id')             // FETCH USERDATA for current Bee
            .then( userInfo => compareScores(userInfo, oldTotalPlayCount, playerId, playerName))
    }

    return { news, bees }

    // FUNCTION TO COMPARE SCORES

    async function compareScores(userInfo, oldTotalPlayCount, playerId, playerName) {
        const newTotalPlayCount = (userInfo) ? userInfo.totalPlayCount : null       // Get Num of Games played from Scoresaber
        if (newTotalPlayCount !== oldTotalPlayCount) {                              // if different === new highscores exist
            const numPlayedMore = newTotalPlayCount - oldTotalPlayCount             // calc the difference
            if (userInfo) console.log(userInfo.playerName, " played ", numPlayedMore, " more!")
            await api.getScores(playerId)                                           // FETCH SCORES for current Bee
                .then(scoreData => {
                    if (scoreData && scoreData.scoresRecent) {
                        const { scoresRecent } = scoreData; 
                        news.push(new News({                                        // Create a News with changes data of current bee
                            text: `Your Bee ${userInfo.playerName} played ${numPlayedMore} new songs!`, 
                            title: `Your Bee ${userInfo.playerName} played ${numPlayedMore} new songs!`,
                            bee: userInfo.playerName,
                            numPlayedMore,
                            songs: scoresRecent.slice(0, numPlayedMore),
                            type: "morePlayed",
                            date: new Date().toISOString() 
                        }))
                        for (let j = 0; j < numPlayedMore; j++) {                           // For each score.... 
                            const match = (myScoreIds.includes(scoresRecent[j].scoreId))    // check if song exist in our own Songlist
                            if (match) {                                                    // if so...
                                const { songName, songAuthorName, score } = scoresRecent[j]   // grab Song Infos

                                // Get my score: filter my Songlist for same songId (can only be 1) and grab score
                                // const myScore = myScoreIds.filter(item => item.scoreId === scoresRecent[j].scoreId).score 
                                const myScore = 279100 //FIXME: For testing...
                                if (score > myScore) {
                                    news.push(new News({
                                        text: `Your Bee ${playerName} beat you at ${songName} (${songAuthorName}): ${score} ( You: ${myScore}  ) `, 
                                        type: "beatScore",
                                        bee: playerName,
                                        beeSocre: score,
                                        myScore, 
                                        song: scoresRecent[j], 
                                        date: scoresRecent[j].timeSet
                                    }))
                                }                           
                            }
                        }
                    }
                    bees = bees.map(bee => (bee.playerId === playerId) ? bee = { ...userInfo, scoreData } : bee );
                })
        } 
    }
};