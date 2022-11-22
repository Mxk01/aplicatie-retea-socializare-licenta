let User = require('../models/User')
let express = require('express');
let router = express.Router();
let bcrypt = require('bcrypt');
let dotenv = require('dotenv');
let jwt = require('jsonwebtoken');
// let upload =  require('../utilities/imageUpload');
let multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './uploads');
    },
    filename: (req, file, cb) => {
      cb(
        null,
        new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname
      );
    },
  });

  const filefilter = (req, file, cb) => {
    if (
      file.mimetype === 'image/png' ||
      file.mimetype === 'image/jpg' ||
      file.mimetype === 'image/jpeg'
    ) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };
  
  const upload = multer({ storage: storage, filefilter: filefilter });
  

dotenv.config()


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
     } }
     else {
         return res.json({message:'You are not authorized to access this resource'})
 
     }
     
 
 
 
 }


// upload.single('profileAvatar')
router.post('/create-user',upload.single('profileAvatar'),async(req,res)=>{
     console.log(upload)
  let user = new User(req.body);
    req.body.password  = await bcrypt.hash(req.body.password,10)
    // req.protocol - http 
    //  req.get('host') - localhost
    req.body.profileAvatar  = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    //   expira in  4 ore de la data curenta 
   let token =  jwt.sign(req.body,process.env.JWT_SECRET,{expiresIn:Date.now()+14400000});
  user.password = req.body.password;
  user.profileAvatar = req.body.profileAvatar;
  user.token = token;
    User.exists({email:req.body.email},(err,doc)=>{
        if(err) { console.log(err.message); }
        else { 
            if(doc){
               return  res.json({message:"Username already exists!"})
            }
        }
    })
    await user.save();
    res.json({message:user});
  
});

router.post('/login-user',(req,res)=>{
     User.exists({email:req.body.email},async(err,doc)=>{
        if(err) { console.log(err.message); }
        else { 
            if(doc){
                let user = await User.findById({_id:doc._id});
                let passwordsMatch = await bcrypt.compare(req.body.password,user.password);
                if(passwordsMatch){
                    let token =  jwt.sign(
                        {
                         _id:user._id 
                        } ,process.env.JWT_SECRET,{expiresIn:Date.now()+14400000});
                        let {username,isTeacher,profilePic} = user;
               return  res.json({username,isTeacher,profilePic,token});
                  
              }
             }
            else {
                res.json({message:"Username doesn't exist!"})
            }
        }
    })    
})

router.get('/students-list',isUserAuthenticated,async(req,res)=>{
   
       let users  = await User.find({}).where('_id').ne(req.user._id);
       return res.json({message:users});

    
  })


module.exports = router;