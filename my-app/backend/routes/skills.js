const router = require('express').Router();
let Skill = require('../Creator/skill.creator');



router.route('/').get((req, res) => {
    Skill.find()
    .then(skills => res.json(skills))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const Code = Number(req.body.Code);
    const Name = req.body.Name;
    const Collection = req.body.Collection;
    
    const newSkill = new Skill({
        Code,
        Name,
        Collection,
        
    });

    newSkill.save()
    .then(() => res.json('skill added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;