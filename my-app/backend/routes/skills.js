const router = require('express').Router();
let Skill = require('../Creator/skill.creator');

router.route('/:fields?').get((req, res) => {
    const {fields} = req.params;
    const selectFields = fields ? fields.split(",").join(" ") : "";
    Skill.find().select(selectFields)
    .then(skills => res.json(skills))
    .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/add').post((req, res) => {
    const Code = Number(req.body.Code);
    const Name = req.body.Name;
    const Category = req.body.Category;
    
    const newSkill = new Skill({
        Code,
        Name,
        Category,
        
    });

    newSkill.save()
    .then(() => res.json('skill added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/:id').get((req, res) => {
    Skill.findById(req.params.id)
    .then(skill => res.json(skill))
    .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;