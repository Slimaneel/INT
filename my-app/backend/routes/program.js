const router = require('express').Router();
let Program = require('../Creator/program.creator');

router.route('/').get((req, res) => {
    Program.find()
    .then(programs => res.json(programs))
    .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/add').post((req, res) => {
    const Name = req.body.Name;
    
    const newProgram = new Program({
        Name,
       
    });

    newProgram.save()
    .then(() => res.json('program added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/:id').get((req, res) => {
    Program.findById(req.params.id)
    .then(program => res.json(program))
    .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;