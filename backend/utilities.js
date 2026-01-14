const jwt= require("jsonwebtoken");

function authenticateToken (req,res,next){
   
const authHeader =req.headers["authorization"];
// console.log(authHeader)
const token = authHeader && authHeader.split(" ")[1];
// console.log(token,'sssssss')
if(!token)return res.sendStatus(401);
// console.log("Jehheheheh")
jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
    console.log(err,"hsshshshsi")
    if(err)return res.sendStatus(403)
    req.user=user;
    next();
})
};
module.exports={
   authenticateToken
}