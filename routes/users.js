const express = require('express');
const router = express.Router();
const db=require("../mysql");
const {v4 : uuid}=require("uuid");
const auth=require("../middlewares/auth");
router.get('/',auth,(req,res)=>{
    db.query("SELECT * from users",(err,result)=>{
        if(err){
            return res.status(404).json({err:err});
        }
        res.status(200).json({data:result,meta:{usersCount:result.length}})
    })
});
router.post('/',(req,res)=> {
    const {login, password} = req.body;
    const token=uuid();

    db.query(`INSERT INTO users
              VALUES (NULL, '${login}', '${password}', '${token}');`, (err, result) => {
        if (err) {
            return res.status(404).json({err: err});
        }
        res.status(201).json({
            data: {
                id: result.insertId,
                login: login,
            }
        });
    });
});

router.put("/",auth,(req,res)=>{
    const {id,login, password} = req.body;

    db.query(`SELECT * from users WHERE userId=${id}`, (err, result) => {
        if (err) {
            return res.status(404).json({err: err});
        }
        if(result.length==0){
            return res.status(400).json({err: `User with id ${id} does not exist`});
        }
        db.query(`UPDATE users SET login='${login ?? result[0].login}', password='${password ?? result[0].password}' WHERE userId=${id};`,(err,result)=> {
            if (err) {
                return res.status(404).json({err: err});
            }
            res.status(204).json()
        });
    });
});

router.delete("/",auth,(req,res)=>{
    const {id} = req.body;
    if(!id){
        return res.status(400).json({err:"You forgot Id"});
    }
    db.query(`DELETE from users WHERE userId=${id};`,(err,result)=>{
        if(err){
            return res.status(404).json({err:err});
        }
        if(result.affectedRows==0){
            return res.status(400).json({err:`User with id ${id} does not exist`});
        }
        res.status(204).json();
    })
})
module.exports = router;