const router = require('express').Router();
let Chapter = require('../Creator/chapter.creator');

router.route('/').get((req, res) => {
    if(req.query.grade_id){
        Chapter.find({grade: req.query.grade_id})
        .then(chapters => res.json(chapters))
        .catch(err => res.status(400).json('Error: '+ err))
    }else{
        Chapter.find()
        .then(chapters => res.json(chapters))
        .catch(err => res.status(400).json('Error: ' + err));
    }
});



router.route('/add').post(async(req, res) => {
    const Name = req.body.Name;
    const grade = req.body.grade;
    
    const newChapter = await new Chapter({
        Name,
        grade,
        
    });

    newChapter.save()
    .then(() => res.json('chapter added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/:id').get(async(req, res) => {
    if(req.query.grade_id){
        Chapter.find({grade: req.query.grade_id})
        .then(chapters => res.json(chapters))
        .catch(err => res.status(400).json('Error: '+ err))
    }else{
        await Chapter.findById(req.params.id)
        .then(chapter => res.json(chapter))
        .catch(err => res.status(400).json('Error: ' + err));
    }
});
router.route('/:id').delete((req, res) => {
    Chapter.findByIdAndDelete(req.params.id)
    .then(() => res.json('Chapter deleted.'))
    .catch(err => res.status(400).json('Error: '+ err));
});

router.route('/update/:id').post((req, res) => {
    Chapter.findById(req.params.id)
    .then(chapter => {
        chapter.Name = req.body.Name;
        chapter.save()
        .then(() => res.json('Chapter updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));

});

module.exports = router;