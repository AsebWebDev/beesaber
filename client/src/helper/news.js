export function parseNewsTitle(type) {
    switch (type) {
        case 'ownNewScores': return 'New Highscore'
        case 'morePlayed': return 'News songs played'
        case 'beatScore': return 'You got beaten, catch up!'
        default: return 'There is big news!'
    }
};