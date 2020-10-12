export function isInQuery(item, query) {
    return (
        ( item.songName && item.songName.toLowerCase().includes(query.toLowerCase()) )                                  // check song Name for query 
    ||  ( item.songAuthorName && item.songAuthorName.toLowerCase().includes(query.toLowerCase()) )                      // check Author for query 
    )
};

export function filterBeeIntersections(userdata) {
    // This functions scans all bees for song interceptions with the own songs of the user. The userdata will be updated with 
    //      a) all interceptions that each bee has got with the user (beeIntersection)
    //      b) all interceptions in general (myIntersections)
    // There probably will occur duplicates, because an interception is mainly scanned for by the unique song hash, but there are
    // different difficulty levels of a song with the same hash. Therefore this functions also identifies these duplicates and
    // removes them, before returning the data. 

    if (Object.keys(userdata).length !== 0 && userdata.constructor === Object) {            // check if Userdata is Object
      const newUserData = { ...userdata }                                                   // make copy of original data  
      const myIntersections = [];                                                           // prepare Array to fill later 
        const mySongs = newUserData.scoreData.scoresRecent
        const myBees = newUserData.bees
        // === ITERATE OVER ALL BEES ===
        myBees.forEach((bee,i) => {                                                         // for each bee....
          const beeSongs = bee.scoreData.scoresRecent                                       // ...get all their songs
          const beeIntersections = []                                                       // ...prepare array for single intersections
          const doubles = []                                                                // ...prepare array for intersection duplicates

          // === ITERATE OVER ALL SONGS OF EACH BEE ===                                     
          beeSongs.forEach(song => {                                                        // ... for each song of current bee
            const songs = mySongs.filter(item => item.songHash === song.songHash)           // ... get all songs that user has also got in list (intersections)
            songs.forEach(song => {
              const myScore = mySongs.filter(score => score.songHash === song.songHash)[0]
              const beeScore = beeSongs.filter(score => score.songHash === song.songHash)[0]
              const { playerName, country, countryRank, rank, avatar, playerId, averageRankedAccuracy, totalPlayCount, rankedPlayCount } = bee
              const beeIntersection = {                                               // prepare new Intersection... 
                song,
                bee: { playerId, playerName, country, countryRank, rank, avatar, playerId, averageRankedAccuracy, totalPlayCount, rankedPlayCount },
                beeScore,
                myScore,
              }                                                                       // ... and push it to the correct array: 
              if (songs.length === 1) beeIntersections.push(beeIntersection)          // if there is only one intersection add it to prepared array
              if (songs.length > 1) doubles.push(beeIntersection)                     // if there are more intersections, add them to filter duplicates later
            })
          })

          // AFTER ALL SONGS ARE SCANNED FOR INTERCEPTIONS 
          
          const filteredDoubles = doubles.filter(                     // ... remove duplicates (same song hash + same song difficulty)
            (elem, i, self) => i === self.findIndex((t) => t.song.songHash === elem.song.songHash && t.song.difficulty === elem.song.difficulty)
          )
          
          beeIntersections.push(...filteredDoubles)                   // ... add the filtered intersections to the main array
          myBees[i].beeIntersections = beeIntersections               // ... add the intersections of this specific bee to the bee data
          myIntersections.push(...beeIntersections)                   // ... add the intersections of this specific bee to all my intersections
        })

        // AFTER ALL BEES ARE SCANNED FOR INTERCEPTIONS 
        newUserData.myIntersections = myIntersections                 // ... add all my Intersections to new userdata that will be returned
        newUserData.bees = myBees                                     // ... update all my bees in new userdata with their interceptions

        // TODO: FLAG MY SONGS, THAT ARE PLAYED BY OTHER BEES
        const myIntersectionsIds = myIntersections.map(item => item.song.songHash)
        mySongs.forEach((song, i)  => {
          if(myIntersectionsIds.indexOf(song.songHash) > -1) {
            mySongs[i].playedByHive = true
            mySongs[i].playedBy = []
            const playedByArray = myIntersections.filter(intersection => song.songHash === intersection.song.songHash).map(item => item.bee)
            mySongs[i].playedBy = playedByArray.filter(                     // ... remove duplicates (same playerId)
              (elem, i, self) => i === self.findIndex((t) => t.playerId === elem.playerId)
            )
          }
        })
      return newUserData                                              // finaly return updated userdata
    } 
  }