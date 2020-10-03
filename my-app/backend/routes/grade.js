const router = require('express').Router();
let Grade = require('../Creator/grade.creator');

router.route('/').get((req, res) => {
    if(req.query.program_id){
        Grade.find({program: req.query.program_id})
        .then(grades => res.json(grades))
        .catch(err => res.status(400).json('Error: '+err))
    }else{
        Grade.find()
        .then(grades => res.json(grades))
        .catch(err => res.status(400).json('Error: ' + err));
    }


    
});


router.route('/add').post(async(req, res) => {
    const Name = req.body.Name;
    const program = req.body.program;
   
    
    const newGrade = await new Grade({
        Name,
        program,
        
    });

    newGrade.save()
    .then(() => res.json('grade added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/:id').get(async(req, res) => {
    if(req.query.program_id){
        Grade.find({program: req.query.program_id})
        .then(grades => res.json(grades))
        .catch(err => res.status(400).json('Error: '+err))
    }else{
        await Grade.findById(req.params.id)
        .then(grade => res.json(grade))
        .catch(err => res.status(400).json('Error: ' + err));
    }
});


module.exports = router;