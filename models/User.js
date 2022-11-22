let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let userSchema = new mongoose.Schema({
    username : {
        type:String,
        required:true
    },
    password: {
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    profileAvatar : {
        type:String,
        default:''
    },
    token : {
        type:String
    },
    isSender:{type:Boolean},
    isReceiver:{type:Boolean},
    isAdmin: {type:Boolean},
    isGroupMember:{type:Boolean},
    messages:{type:Schema.Types.ObjectId,ref:'Message'},
    groups: {type:Schema.Types.ObjectId,ref:'Group'},
    friends: {type:Schema.Types.ObjectId,ref:'User'},
 })
module.exports = mongoose.model('User',userSchema)