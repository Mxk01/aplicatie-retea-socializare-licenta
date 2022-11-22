let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let groupSchema = new mongoose.Schema({
    groupName : {
        type:String,
        required:true
    },
    groupMembers: {
        type:[mongoose.Schema.Types.ObjectId],
        ref:'User'
    },
    isGroupAdmin: {type:Boolean}, 
    groupMessages: {
        type:[mongoose.Schema.Types.ObjectId],
        ref:'Message'
    }
})
module.exports = mongoose.model('Group',groupSchema)