const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const gradeSchema = new Schema({

    Name: { type: String, required: true},
    program:{type: mongoose.Schema.Types.ObjectId,
        ref: "Program",
    },
  
}, {
    
    timestamps: true,
});


const Grade = mongoose.model('Grade', gradeSchema);

module.exports = Grade;
