const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const permit = require('../middleware/permit');
const upload = require('../multer').uploads;
const Comment = require('../models/Comment');
const Place = require('../models/Place');

router.post('/', auth, async (req, res) => {
    const commentData = req.body;

    try {
        let comments = await Comment.findOne({recipe: commentData.recipe});
        if (!comments) {
            let comment = {
                comment: commentData.comment,
                recipe: commentData.recipe,
                easyToMake: commentData.easyToMake,
                quickToMake: commentData.quickToMake,
                taste: commentData.taste,
                user: req.user._id
            };
            let newComment = new Comment(comment);

            let recipe = await Place.findById(commentData.recipe);
            recipe.easyToMake += +commentData.easyToMake;
            recipe.quickToMake += +commentData.quickToMake;
            recipe.taste += +commentData.taste;
            recipe.commentCount += 1;

            await recipe.save();
            await newComment.save();
            return res.send(newComment)

        } else {
            let comment = {
                comment: commentData.comment,
                recipe: commentData.recipe,
                user: req.user._id,
                rating: false
            };
            let newComment = new Comment(comment);
            await newComment.save();
            return res.send(newComment)
        }
    } catch (e) {
        res.status(500).send(e)
    }
});
router.get('/:id',  async (req, res) => {

    try {
        const comment = await Comment.find({recipe: req.params.id}).populate('user');

        if (!comment) {
            return res.status(404).send({message: 'Not found!!!'})
        }
        return res.send(comment)
    } catch (e) {
        return res.status(500).send(e)
    }

});

router.delete('/:id', [auth,permit('admin')], async (req, res) => {
    try {
        const comment = await Comment.findOne({_id: req.params.id});
        if (!comment) {
            return res.status(404).send({message: 'Comment not a found!!!'})
        }
        console.log(comment.rating);
        if (comment.rating) {
            console.log('heare');
            const place = await Place.findById(comment.recipe);
            place.easyToMake -= +comment.easyToMake;
            place.quickToMake -= +comment.quickToMake;
            place.taste -= +comment.taste;
            place.commentCount -= 1;
            await place.save()
        }
        await Comment.deleteOne({_id: req.params.id});

        return res.send('ok');

    } catch (e) {
        return res.status(500).send(e)
    }

});
module.exports = router;