// const axios = require('axios')

// const sendOtp = async (phone, otp) => {

//     //setting state
//     let isSent = false;

//     //url to send otp
//     const url = 'https://api.managepoint.co/api/sms/send'

//     //payload to send
//     const payload = {
//         'apiKey' : 'bbe6f281-8810-4f9d-bc40-6c4c3febbb87',
//         'to' : phone,
//         'message' : `Your verification code is ${otp}`
//     }

//     try {

//         const res = await axios.post(url,payload)
//         if (res.status === 200) {
//             isSent = true;
//         }

//     } catch (error) {
//         console.log('Error Sending OTP', error.message)
//     }

//     return isSent;
// }

// module.exports = sendOtp;
const axios = require("axios");

const sendOtp = async (phone, otp) => {
  // setting state
  let isSent = false;

  //  url to send otp
  const url = "https://api.managepoint.co/api/sms/send";

  // payload to send
  const payload = {
    apiKey: "1d10a2e4-ed54-4456-89b8-d24d48f8b4c0",
    to: phone,
    message: `Your OTP is ${otp}`,
  };
  try {
    const response = await axios.post(url, payload);
    if (response.status === 200) {
      isSent = true;
    }
  } catch (error) {
    console.log("Error in sending OTP", error.message);
  }
  return isSent;
};
module.exports = sendOtp;