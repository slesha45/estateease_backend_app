const jwt = require('jsonwebtoken')
const User = require("../models/userModels")

const authGuard = async (req, res, next) => {

    //check incoming data
    // console.log(req.headers) //pass

    //get authorization data from headers 
    const authHeader = req.headers.authorization;

    //check or validate 
    if(!authHeader){
        return res.status(400).json({
            success : false,
            message : "Please login first"
        })
    }

    //split the data(format: 'Bearer token - sdfnsdj') - only token
    const token = authHeader.split(' ')[1]

    //if token not found : stop the process (res)
    if(!token || token === ''){
        return res.status(400).json({
            success : false,
            message : "Please provide a token"
        }) 
    }

    //verify
    try {
        const decodeUserData = jwt.verify(token, process.env.JWT_SECRET)
        req.user = await User.findById(decodeUserData.id).select("-password");
        if (!req.user){
            return res.status(400).json({
                success : false,
                message : "User not found"
            })
        }
        next();

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success : false,
            message : "Not Authenticated!"
        })
        
    }
}

module.exports={
    authGuard
}