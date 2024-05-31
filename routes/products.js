const express = require('express');
const router = express.Router();
const db=require("../mysql");
const auth=require("../middlewares/auth");

router.get('/',(req,res)=>{
    db.query("SELECT * from products",(err,result)=>{
        if(err){
            return res.status(404).json({err:err});
        }
        res.status(200).json({data:result,meta:{totalRecords:result.length}})
    })
});
router.post('/',auth,(req,res)=> {
    const {name, description, price} = req.body;

    db.query(`INSERT INTO products
              VALUES (NULL, '${name}', '${description}', ${price});`, (err, result) => {
        if (err) {
            return res.status(404).json({err: err});
        }
        res.status(201).json({
            data: {
                id: result.insertId,
                name: name,
                description: description,
                price: price
            }
        });
    });
});

router.put("/",auth,(req,res)=>{
    const {id,name, description, price} = req.body;

    db.query(`SELECT * from products WHERE productId=${id}`, (err, result) => {
        if (err) {
            return res.status(404).json({err: err});
        }
        if (result.length==0){
            return res.status(400).json({err: `Product with id ${id} does not exist`});
        }
        db.query(`UPDATE products SET name='${name ?? result[0].name}', description='${description ?? result[0].description}', price=${price ?? result[0].price} WHERE productId=${id};`,(err)=>{
            if(err){
                return res.status(404).json({err: err});
            }
            res.status(200).json({data:{
                    id:id,
                    name:name ?? result[0].name,
                    description:description ?? result[0].description,
                    price:price ?? result[0].price
                }})
        })
    });
});

router.delete("/",auth,(req,res)=>{
    const {id} = req.body;
    if(!id){
        return res.status(400).json({err:"You forgot Id"});
    }
    db.query(`DELETE from products WHERE productId=${id};`,(err,result)=>{
        if(err){
            return res.status(404).json({err:err});
        }
        if(result.affectedRows==0){
            return res.status(400).json({err:`Product with id ${id} does not exist`});
        }
        res.status(200).json({message:"Product with id "+id+" was deleted"});
    })
})
module.exports = router;