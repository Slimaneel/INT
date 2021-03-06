const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const skillSchema = new Schema({
    Code: { type: Number, required: true},
    Name: { type: String, required: true},
    Category: { type: String, required: true},
    chapter:{type: mongoose.Schema.Types.ObjectId,
        ref: "Chapter",
    },
  
}, {
    
    timestamps: true,
});


const Skill = mongoose.model('Skill', skillSchema);

module.exports = Skill;