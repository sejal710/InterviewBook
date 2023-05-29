const jwt = require("jsonwebtoken");

const authentication = (req,res,next) => {
    const token = req.token.authorization;
    if(token){
        jwt.verify(token,"sejal",(err,decoded) => {
            if(decoded){
                req.body.user = decoded.userID;
                next();
            }
            else{
                res.send({Message:"Please Login"})
            }
        })
    }
    else{
        res.send({Message:"Please Login"})
    }
}

module.exports = {authentication};