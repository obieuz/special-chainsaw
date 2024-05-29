module.exports = (req,res,next)=>{
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Method","GET,POST,OPTIONS");
    res.header("Access-Control-Allow-Headers","Origin,Content-Type, Accept, X-Auth-Token");
    if(req.method==="OPTIONS"){
        return res.status(204).json();
    }
    next();
}
