var express = require('express');
var router = express.Router();
const db=require("../mysql");
router.post('/auth', (req, res, next) => {
  const {login,password} = req.body;
  db.query(`SELECT token from users where login='${login}' AND password='${password}';`,(err,result)=>{
    if(err){
      return res.status(404).json({err:err});
    }
    if(result.length===0){
      return res.status(404).json({err:"Invalid login or password, try again"});
    }
    req.headers["x-auth-token"]=result[0].token;
    res.status(200).json({data:{
      token:result[0].token
      }});
  })
});

module.exports = router;
