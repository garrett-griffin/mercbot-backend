const { Season, Turn } = require('../models'); // Adjust the path if necessary
const { Client, Turn: TurnAPI } = require('jmerc');
require('dotenv').config();

const user = process.env.API_USER;
const token = process.env.API_TOKEN;

const syncTurnData = async () => {
    const client = new Client(user, token);
    const turnAPI = new TurnAPI(client);

    try {
        const turnData = await turnAPI.get();
        console.log("Turn Number: " + turnData.turn);

        // Here you would update your database with the turn data
        await Turn.create({
            turnNumber: turnData.turn,
            seasonId: 1 // Adjust accordingly
        });

        console.log('Turn data synced successfully.');
    } catch (error) {
        console.error('Error syncing turn data:', error.message);
    }
};

// Export the sync function for external use
module.exports = syncTurnData;

// Run the sync function if this script is executed directly
if (require.main === module) {
    syncTurnData().then(() => {
        console.log('Sync completed.');
        process.exit(0);
    }).catch(error => {
        console.error('Sync failed:', error);
        process.exit(1);
    });
}
