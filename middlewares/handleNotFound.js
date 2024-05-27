module.exports = (req,res,next)=>{
  res.status(404).json({
      error:`Path ${req.path} does not exist`,
      meta:{
          path:req.path,
          method:req.method,
          headers:req.headers,
      }
  })
};