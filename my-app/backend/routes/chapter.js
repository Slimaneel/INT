const router = require('express').Router();
let Chapter = require('../Creator/chapter.creator');

router.route('/').get((req, res) => {
    Chapter.find()
    .then(chapters => res.json(chapters))
    .catch(err => res.status(400).json('Error: ' + err));
});



router.route('/add').post((req, res) => {
    const Name = req.body.Name;
    
    const newChapter = new Chapter({
        Name,
        
    });

    newChapter.save()
    .then(() => res.json('chapter added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/:id').get((req, res) => {
    Chapter.findById(req.params.id)
    .then(chapter => res.json(chapter))
    .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;