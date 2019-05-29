const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const groomSchema = new mongoose.Schema({
    grooming_wash_name : String,
    grooming_wash_start_date :{
        type: Date,
        default: Date.now
    },
    grooming_type : String,
    grooming_wash_remark : String,
    pet_name : String,
    select_hour : String,
    select_minute : String,
});

// UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("grooming", groomSchema);