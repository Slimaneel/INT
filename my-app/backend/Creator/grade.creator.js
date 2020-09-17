const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const gradeSchema = new Schema({

    Name: { type: String, required: true}
  
}, {
    
    timestamps: true,
});


const Grade = mongoose.model('Grade', gradeSchema);

module.exports = Grade;
