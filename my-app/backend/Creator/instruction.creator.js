const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const instructionSchema = new Schema({
    
    InstructionField: { type: String, required: true},
    Solution: { type: Array, required: true},
    Hint: { type: Array, required: true},
   

}, {
    
    timestamps: true,
});


const Exercise = mongoose.model('Exercise', instructionSchema);

module.exports = Exercise;