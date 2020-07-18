const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const permit = require('../middleware/permit');
const upload = require('../multer').uploads;
const Place = require('../models/Place');
const Comment = require('../models/Comment')

router.post('/', [auth, upload.single('image')], async (req, res) => {
    const recipesData = req.body;

    try {
        if (!recipesData.check === 'true'){
            return res.status(404).send({message: 'Соглашение подпиши, ежже!'})
        }
        let place = {
            name: recipesData.name,
            description: recipesData.description,
            user: req.user._id,
        };
        if (req.file) {
            place.image = req.file.filename;
        }

        const newPlace = new Place(place);


        await newPlace.save();

        res.send(newPlace)

    } catch (e) {
        res.status(500).send(e)
    }
});

router.get('/', async (req, res) => {

    try {
       let places = await Place.find();

        if (!places) {
            return res.status(404).send({message: 'Not found!!!'})
        }

            places = places.map(r => {
                if(r.commentCount){
                 return    {
                        easyToMake: (r.easyToMake / r.commentCount).toFixed(1),
                            quickToMake: (r.quickToMake / r.commentCount).toFixed(1),
                        taste: (r.taste / r.commentCount).toFixed(1),
                        name: r.name,
                        _id: r._id,
                        image: r.image
                    }
                }else{
                    return r._doc
                }

    }).map(o => (

                {
                    overall: ((+o.easyToMake + +o.quickToMake + +o.taste) / 3).toFixed(1),
                    ...o
                }
            ));

        return res.send(places);

    } catch (e) {

        return res.status(500).send(e)
    }
});


router.get('/:id', async (req, res) => {

    try {


        let place = await Place.findById(req.params.id);

        if (!place) {
            return res.status(404).send({message: 'Not found!!!'})
        }

        if (place.commentCount) {
            place.easyToMake = (place.easyToMake / place.commentCount).toFixed(1);
            place.quickToMake = (place.quickToMake / place.commentCount).toFixed(1);
            place.taste = (place.taste / place.commentCount).toFixed(1);
            place.overall = ((place.easyToMake + place.quickToMake + place.taste) / 3).toFixed(1);
        }

        return res.send(place)

    } catch (e) {
        return res.status(500).send(e)
    }

});

router.put('/:id', [auth, upload.single('image')], async (req, res) => {
    console.log('heare')
    try {

        let place = await Place.findById(req.params.id);

        if (!place) {
            return res.status(404).send({message: 'Not found!!!'})
        };

        if (req.file) {

            place.images.push(req.file.filename)
        }
        await place.save();

        return res.send(place)
    } catch (e) {

        return res.status(500).send(e)
    }
});

router.delete('/:id', [auth,permit('admin')], async (req, res) => {

    try {
        const place = await Place.findOne({_id: req.params.id});
        if (!place) {
            return res.status(404).send({message: 'Place not a found!!!'})
        }
        await Comment.deleteMany({recipe:req.params.id});
        console.log('delete')
        await Place.deleteOne({_id: req.params.id});

        return res.send('ok');

    } catch (e) {
        return res.status(500).send(e)
    }

});


module.exports = router;