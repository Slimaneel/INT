const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const instructionSchema = new Schema({
    Title: { type: String, required: true},
    InstructionField: { type: String, required: true},
    Solution: { type: String, required: true},
    Hint: { type: Array, required: true},
    skill:{type: mongoose.Schema.Types.ObjectId,
        ref: "Skill",
    },
    chapter:{type: mongoose.Schema.Types.ObjectId,
        ref: "Chapter",
    },
    grade:{type: mongoose.Schema.Types.ObjectId,
        ref: "Grade",
    },
    program:{type: mongoose.Schema.Types.ObjectId,
        ref: "Program",
    }


}, {
    
    timestamps: true,
});


const Exercise = mongoose.model('Exercise', instructionSchema);

module.exports = Exercise;