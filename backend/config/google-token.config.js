const {OAuth2Client} = require('google-auth-library');
const CLIENT_ID = '448262434589-kk30obbvtsit6dqersqtqgogdp44opd7.apps.googleusercontent.com';
const client = new OAuth2Client(CLIENT_ID);

const googleVerification = async (request, response, next) => {
    try {
        const ticket = await client.verifyIdToken({
            idToken: request.body.idToken,
            audience: CLIENT_ID
        });
        const payload = ticket.getPayload();        
        request.payload = payload;
        next();
    } catch(error) {
        console.log(error);
        
        response.status(404).json({})
    }
}

module.exports = googleVerification;