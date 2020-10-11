export function isInQuery(item, query) {
    return (
        ( item.songName && item.songName.toLowerCase().includes(query.toLowerCase()) )                                  // check song Name for query 
    ||  ( item.songAuthorName && item.songAuthorName.toLowerCase().includes(query.toLowerCase()) )                      // check Author for query 
    )
};