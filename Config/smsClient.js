const axios = require("axios");
const BASE_URL = "https://api.textlocal.in/"
const API_KEY = "rpimxtMCbh8-FyP07DH1mnPgRsiHRA1AgKyLm7eYp91"
const SENDER = "VALITE"

const smsClient = {
    sendTextSMS: (req, callback) => {
        if (req && req.phone && req.message) {
            const { message } = req
            const mobile_no = parseInt("91" + req.phone)
            let URL = `${BASE_URL}send/?apikey=${API_KEY}&numbers=${mobile_no}sender=${SENDER}&message=${encodeURIComponent(message)}`
            // Make a request for a user with a given ID
            axios.get(URL)
                .then((response) => {
                    console.log("------ SMS Gateway Response ------", response.data);
                    callback(null, response.data)
                })
                .catch((error) => {
                    console.log("error");
                    callback(error)
                });
        }
    }
};

module.exports = smsClient;