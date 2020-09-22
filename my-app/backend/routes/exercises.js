const router = require('express').Router();
let Exercise = require('../Creator/instruction.creator');



router.route('/').get((req, res) => {
    Exercise.find().populate('skill').populate('chapter').populate('grade').populate('program')
    .then(exercises => res.json(exercises))
    .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/:id').get(async(req, res) => {
    await Exercise.findById(req.params.id).populate('skill').populate('chapter').populate('grade').populate('program')
   .then(exercise => res.json(exercise))
   .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/add').post(async(req, res) => {
    const Title = req.body.Title;
    const InstructionField = req.body.InstructionField;
    const Solution = req.body.Solution;
    const Hint = req.body.Hint;
    const skill = req.body.skill;
    const chapter = req.body.chapter;
    const grade = req.body.grade;
    const program = req.body.program;
 

    
    const  newInstruction = await  new Exercise({
        Title,
        InstructionField,
        Solution, 
        Hint,
        skill,
        chapter,
        grade,
        program
        
    });

    newInstruction.save()
    .then(() => res.json('Instruction added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});



router.route('/:id').delete((req, res) => {
    Exercise.findByIdAndDelete(req.params.id)
    .then(() => res.json('Exercise deleted.'))
    .catch(err => res.status(400).json('Error: '+ err));
});

router.route('/update/:id').post((req, res) => {
    Exercise.findById(req.params.id)
    .then(exercise => {
        exercise.Title = req.body.Title;
        exercise.InstructionField = req.body.InstructionField;
        exercise.Solution = req.body.Solution;
        exercise.Hint = req.body.Hint;
        exercise.skill = req.body.skill;
        exercise.chapter = req.body.chapter;
        exercise.grade = req.body.grade;
        exercise.program = req.body.program;


        exercise.save()
        .then(() => res.json('Exercise updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));

});

module.exports = router;