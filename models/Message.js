let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let messageSchema = new mongoose.Schema({
<<<<<<< HEAD
    subject : {
        type:String,
        required:true
    },
=======
   
>>>>>>> 5a35ef5 (=)
    contents: {
        type:String
    },
    photoPath:{
        type:String,
    },
    messageSender:{
      type:Schema.Types.ObjectId,
      ref:'User'
    },
    messageReceiver:{
    type:Schema.Types.ObjectId,
    ref:'User'
    },
    isGroupMessage: {type:Boolean}, 
    isDirectMessage:{type:Boolean},
    messageGroup: {type:Schema.Types.ObjectId,ref:"Group"}
})
module.exports = mongoose.model('Message',messageSchema)