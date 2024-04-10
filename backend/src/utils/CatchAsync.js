const CatchAsync = (fn)=>(req,res,next)=>{
    Promise.resolve(fn(req,res)).catch(next)
}

module.exports = CatchAsync