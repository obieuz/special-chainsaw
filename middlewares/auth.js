const db = require("../mysql");
module.exports = (req,res,next)=>{
    let doesValidate=false;
    db.query("SELECT token from users;",(err,result)=>{
        if(err){
            return res.status(401).json({err:err});
        }
        if(result.length===0){
            return res.status(401).json({err:"Try again later!"});
        }
        result.map(({token})=>{
            if(token !== req.headers["x-auth-token"]){
                return;
            }
            doesValidate=true
        });
        if(!doesValidate){
            return res.status(401).json({err:"Try again later!"});
        }
        next();
    })
}