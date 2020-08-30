// Function returns an Array of News
import api from '../api';

export async function checkForNews(userdata) {
    let bees = userdata.bees
    const myScoreIds = userdata.scoreData.scoredSongsIds
    myScoreIds.push(41918150) // FIXME: for testing
    let news = [];
    // CHECK FOR EACH BEE IN FRIENDS LIST
    for (let i = 0; i < bees.length; i++) {
        const { playerName, playerId } = bees[i]                    // get Playername and ID of Opponent
        const oldTotalPlayCount = bees[i].totalPlayCount            // Get num of Games played from database 
        await api.getScoreSaberUserInfo(playerId, 'id')              // FETCH USERDATA for current Bee
            .then(async userInfo => {
                const newTotalPlayCount = (userInfo) ? userInfo.totalPlayCount : null       // Get Num of Games played from Scoresaber
                if (newTotalPlayCount !== oldTotalPlayCount) {                              // if different === new highscores exist
                    const numPlayedMore = newTotalPlayCount - oldTotalPlayCount             // calc the difference
                    if (userInfo) console.log(userInfo.playerName, " played ", numPlayedMore, " more!")
                    // if (userInfo) news.push(`Your Bee ${userInfo.playerName} played ${numPlayedMore} new songs!`)
                    if (userInfo) news.push({text: `Your Bee ${userInfo.playerName} played ${numPlayedMore} new songs!`, type:"newSong", date: new Date() })
                    await api.getScores(playerId)                                           // FETCH SCORES for current Bee
                        .then(scoreData => {
                            if (scoreData && scoreData.scoresRecent) {
                                const { scoresRecent } = scoreData; 
                                for (let j = 0; j < numPlayedMore; j++) {                           // For each score.... 
                                    const match = (myScoreIds.includes(scoresRecent[j].scoreId))    // check if song exist in our own Songlist
                                    if (match) {                                                    // if so...
                                        const { songName, songAuthorName, score, difficulty } = scoresRecent[j]   // grab Song Infos

                                        // Get my score: filter my Songlist for same songId (can only be 1) and grab score
                                        const myScore = myScoreIds.filter(item => item.scoreId === scoresRecent[j].scoreId).score 
                                        // const myScore = 279100 //FIXME: For testing...
                                        if (score > myScore) {
                                            // news.push(`Your Bee ${playerName} beat you at ${songName} (${songAuthorName}): ${score} ( You: ${myScore}  ) `)
                                            news.push({text: `Your Bee ${playerName} beat you at ${songName} (${songAuthorName}): ${score} ( You: ${myScore}  ) `, type: "beatScore", date: new Date()})
                                        }                           
                                    }
                                }
                            }
                            bees = bees.map(bee => (bee.playerId === playerId) ? bee = { ...userInfo, scoreData } : bee );
                        })
                } 
            })
    }
    console.log("checkForNews -> news", news)
    return { news, bees }
};