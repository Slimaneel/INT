const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const programSchema = new Schema({

    Name: { type: String, required: true}
  
}, {
    
    timestamps: true,
});


const Program = mongoose.model('Program', programSchema);

module.exports = Program;