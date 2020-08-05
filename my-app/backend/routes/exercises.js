const router = require('express').Router();
let Exercise = require('../Creator/instruction.creator');



router.route('/').get((req, res) => {
    Exercise.find()
    .then(exercises => res.json(exercises))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const InstructionField = req.body.InstructionField;
    const Solution = Array(req.body.Solution);
    const Hint = Array(req.body.Hint);

    
    const newInstruction = new Exercise({
        InstructionField,
        Solution, 
        Hint,
       
        
    });

    newInstruction.save()
    .then(() => res.json('Instruction added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Exercise.findById(req.params.id)
    .then(exercise => res.json(exercise))
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
        exercise.InstructionField = req.body.InstructionField;
        exercise.Solution = Array(req.body.Solution);
        exercise.Hint = Array(req.body.Hint);
   

        exercise.save()
        .then(() => res.json('Exercise updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));

});

module.exports = router;