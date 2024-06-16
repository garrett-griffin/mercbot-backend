const { Season, Turn } = require('../models'); // Adjust the path if necessary
const { Client, TurnsAPI: TurnsAPI } = require('jmerc');
require('dotenv').config();

const user = process.env.API_USER;
const token = process.env.API_TOKEN;

const syncTurnData = async () => {
    const client = new Client(user, token);

    try {
        const turnData = await client.Turn.get();
        console.log("Turn Number: " + turnData.turn);

        // Check if the turn already exists
        let existingTurn = await Turn.findOne({ where: { turnNumber: turnData.turn } });

        if (existingTurn) {
            // If the turn exists but doesn't have month and year, update it
            if (!existingTurn.month || !existingTurn.year) {
                existingTurn.month = null; // This will trigger the hook to calculate month and year
                existingTurn.year = null;  // This will trigger the hook to calculate month and year
                await existingTurn.save();
                console.log('Turn data updated successfully.');
            } else {
                console.log('Turn already exists with month and year.');
            }
        } else {
            // Create a new turn if it doesn't exist
            await Turn.create({
                turnNumber: turnData.turn,
                seasonId: 1 // Adjust accordingly
            });
            console.log('Turn data synced successfully.');
        }
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
