export function parseSongPicUrl(hash) {
    return `https://new.scoresaber.com/api/static/covers/${hash}.png`
}

export function parseFullPlayerQueryUrl(query) {
    return 'https://new.scoresaber.com/api/player/'+ query +'/full'
}

export function parsePlayerByNameQueryUrl(query) {
    return 'https://new.scoresaber.com/api/players/by-name/' + query
}

export function parseGetRecentScoresUrl(currentId, count) {
    return 'https://new.scoresaber.com/api/player/'+ currentId +'/scores/recent/' + count
}

export function parseAvatarUrl(playerId) {
    return `https://new.scoresaber.com/api/static/avatars/${playerId}.jpg`
}

export function parseNewsTitle(type) {
    switch (type) {
        case 'ownNewScores': return 'New Highscore'
        case 'morePlayed': return 'News songs played'
        case 'beatScore': return 'You got beaten, catch up!'
        default: return 'There is big news!'
    }
};