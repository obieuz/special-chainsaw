const express = require('express');
const router = express.Router();
const db=require("../mysql");

router.get('/',(req,res)=>{
    db.query("SELECT * from products",(err,result)=>{
        if(err){
            return res.status(404).json({err:err});
        }
        res.status(200).json({data:result,meta:{totalRecords:result.length}})
    })
});
router.post('/',(req,res)=> {
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

router.put("/",(req,res)=>{
    const {id,name, description, price} = req.body;

    db.query(`SELECT * from products WHERE productId=${id}`, (err, result) => {
        if (err) {
            return res.status(404).json({err: err});
        }
        db.query(`UPDATE products SET name='${name ?? result.name}', description='${description ?? result.description}', price=${price ?? result.price} WHERE productId=${id};`,(err,result)=>{
            if(err){
                return res.status(404).json({err: err});
            }
            res.status(200).json({data:{
                    id:id,
                    name:name,
                    description:description,
                    price:price
                }})
        })
    });
})
module.exports = router;