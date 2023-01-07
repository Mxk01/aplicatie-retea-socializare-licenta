<<<<<<< HEAD
let express = require('express');
let router = express.Router();

router.get('/',(req,res)=>{
    
});
=======
let {isUserAuthenticated} = require('../utilities/middleware/UserAuth')
let express = require('express');
const Message = require('../models/Message');
const User = require('../models/User')
let router = express.Router();

 
>>>>>>> 5a35ef5 (=)
 

module.exports = router;