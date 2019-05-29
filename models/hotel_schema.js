const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const hotelSchema = new mongoose.Schema({
    daycare_name : String,
    daycare_remark : String,
    daycare_type : String,
    start_date : String,
    pet_name : String,
    room_type : String,
    end_date : String,
    end_hour : String,
    end_minute : String,
    count_day : String,
    is_use_service : String,
});

// UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("hotelSchema", hotelSchema);