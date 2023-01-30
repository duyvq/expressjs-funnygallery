const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const User = mongoose.model('User', userSchema);
const User = require('../models/User');

const photoSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User'
      },
    photoName: {
        type: String,
        required: true
    },
    photoPath: {
        type: String,
        required: true
    },
    photoDescription: {
        type: String,
        required: false
    },
    createdAt: { 
        type: Date, 
        default: Date.now
    }
},{ 
    timestamps: true 
})

module.exports = mongoose.model('Photos', photoSchema)
