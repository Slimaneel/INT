const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const chapterSchema = new Schema({

    Name: { type: String, required: true},
    grade:{type: mongoose.Schema.Types.ObjectId,
        ref: "Grade",
    },
  
}, {
    
    timestamps: true,
});


const Chapter = mongoose.model('Chapter', chapterSchema);

module.exports = Chapter;