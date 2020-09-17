const router = require('express').Router();
let Grade = require('../Creator/grade.creator');

router.route('/').get((req, res) => {
    Grade.find()
    .then(grades => res.json(grades))
    .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/add').post((req, res) => {
    const Name = req.body.Name;
   
    
    const newGrade = new Grade({
        Name,
        
    });

    newGrade.save()
    .then(() => res.json('grade added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/:id').get((req, res) => {
    Grade.findById(req.params.id)
    .then(grade => res.json(grade))
    .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;