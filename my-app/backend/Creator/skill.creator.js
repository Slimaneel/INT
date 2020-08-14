const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const skillSchema = new Schema({
    Code: { type: Number, required: true},
    Name: { type: String, required: true},
    Category: { type: String, required: true},
  
}, {
    
    timestamps: true,
});


const Skill = mongoose.model('SKill', skillSchema);

module.exports = Skill;