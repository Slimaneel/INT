const router = require('express').Router();
let Skill = require('../Creator/skill.creator');

router.route('/').get((req, res) => {
    if(req.query.chapter_id){
        Skill.find({chapter: req.query.chapter_id})
        .then(skills => res.json(skills))
        .catch(err => res.status(400).json('Error: '+ err))
    }else{
        Skill.find()
        .then(skills => res.json(skills))
        .catch(err => res.status(400).json('Error: ' + err));
    }
});


router.route('/add').post(async(req, res) => {
    const Code = Number(req.body.Code);
    const Name = req.body.Name;
    const Category = req.body.Category;
    const chapter = req.body.chapter;
    
    const newSkill = await new Skill({
        Code,
        Name,
        Category,
        chapter,
        
    });

    newSkill.save()
    .then(() => res.json('skill added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/:id').get(async(req, res) => {
    await Skill.findById(req.params.id).populate('chapter')
    .then(skill => res.json(skill))
    .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;