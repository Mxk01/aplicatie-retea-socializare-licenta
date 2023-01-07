
let isUserAuthenticated = async(req,res,next) =>{
    let {authorization} = req.headers;
    if(authorization && authorization.startsWith("Bearer")){
    try{
    
       // get token from authorization request headers
       let token = authorization.split(' ')[1];
      
       // get user id (this data was set up on jwt.sign)
       let {_id} =  jwt.verify(token,process.env.JWT_SECRET)
       req.user = await User.findById(_id).select('--password');
        
       next();
     } 
     catch(e){
        return res.json({message:'You are not authorized to access this resource'})
     } 
    }
     else {
         return res.json({message:'You are not authorized to access this resource'})
 
     }
     
 
 
 
 }
 
module.exports = {isUserAuthenticated};