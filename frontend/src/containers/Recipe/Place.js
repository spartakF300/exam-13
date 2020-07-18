import React, {useEffect, useState} from 'react';
import {getPlace, postPlace, putPlace} from "../../store/actions/placeAction";
import {useDispatch, useSelector} from "react-redux";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {apiURL} from "../../constants";
import Box from "@material-ui/core/Box";
import FormElement from "../../components/UI/Form/FormElement";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import {deleteComment, getComment, postComment} from "../../store/actions/actionComment";
import Rating from "@material-ui/lab/Rating";
import Comments from "../../components/Comments/Comments";

const Place = (props) => {
    const dispatch = useDispatch();
    const place = useSelector(state => state.place.place);
    const comment = useSelector(state => state.comment.comments);
    const user = useSelector(state => state.users.user);
    const [state, setState] = useState({
        comment: '',
        easyToMake: '',
        quickToMake: '',
        taste: '',
    });

    const [image, setImage] = useState({
        image: null
    });

    console.log(state);
    useEffect(() => {
        dispatch(getPlace(props.match.params.id));
        dispatch(getComment(props.match.params.id))
    }, [comment.length]);

    console.log(comment);

    const inputChangeHandler = event => {
        setState({
            ...state,
            [event.target.name]: event.target.value
        })
    };
    const submitFormHandler = event => {
        event.preventDefault();

        dispatch(postComment({...state, recipe: props.match.params.id}));

    };

    const fileChangeHandler = (e) => {

        setImage({
            image: e.target.files[0]
        })
    };

    const submitImageFormHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', image.image);
        dispatch(putPlace(props.match.params.id, formData))
    };


    const options = [

        {title: '5.0', _id: '5.0'},
        {title: '4.0', _id: '4.0'},
        {title: '3.0', _id: '3.0'},
        {title: '2.0', _id: '2.0'},
        {title: '1.0', _id: '1.0'},

    ];

    return (

        <Grid direction="column" container item>
            <Grid container item>
                <Grid item xs>
                    <Typography variant={"h3"} component={"h3"}>{place.name}</Typography>
                    <Typography variant={"h6"} component={"span"}>{place.description}</Typography>
                </Grid>
                {place.image && <Grid style={{width: '300px'}} item xs>
                    <img style={{width: '100%'}} src={apiURL + '/' + place.image} alt={place.image}/>
                </Grid>}
            </Grid>

            <Grid direction="row" style={{display: 'flex', flexWrap: 'wrap'}} container item>
                {place?.images?.map(image => (
                    <Box key={image} style={{width: '100px', height: '100px', margin: '10px'}} component={"div"}>
                        <img style={{width: '100%'}} src={apiURL + '/' + image} alt="image"/>
                    </Box>
                ))}
            </Grid>
            <Divider style={{margin: '10px 0', height: '3px'}}/>
            <Grid container item>
                {place && <Box>
                    <Typography variant={"h4"} component={"h4"}>Average ratings</Typography>

                    <Box component={'div'} style={{display: 'flex', alignItems: 'center'}}>
                        <Typography variant={"h6"} component={"span"}>Overall: </Typography>
                        <Rating name="half-rating-read" value={place.overall ?? 0.5} precision={0.2} readOnly/>
                        <Typography style={{marginLeft: '8px'}} variant={"h6"} component={"span"}>
                            {!Number.isSafeInteger(place.overall) ? place.overall : place.overall + '.0'}
                        </Typography>
                    </Box>
                    <Box component={'div'} style={{display: 'flex', alignItems: 'center'}}>
                        <Typography variant={"h6"} component={"span"}>EasyToMake: </Typography>
                        <Rating name="half-rating-read" value={place.easyToMake ?? 0.5} precision={0.1} readOnly/>
                        <Typography style={{marginLeft: '8px'}} variant={"h6"} component={"span"}>
                            {!Number.isSafeInteger(place.easyToMake) ? place.easyToMake : place.easyToMake + '.0'}
                        </Typography>
                    </Box>
                    <Box component={'div'} style={{display: 'flex', alignItems: 'center'}}>
                        <Typography variant={"h6"} component={"span"}>QuickToMake: </Typography>
                        <Rating name="half-rating-read" value={place.quickToMake ?? 0.5} precision={0.1} readOnly/>
                        <Typography style={{marginLeft: '8px'}} variant={"h6"} component={"span"}>
                            {!Number.isSafeInteger(place.quickToMake) ? place.quickToMake : place.quickToMake + '.0'}
                        </Typography>
                    </Box>
                    <Box component={'div'} style={{display: 'flex', alignItems: 'center'}}>
                        <Typography variant={"h6"} component={"span"}>Taste: </Typography>
                        <Rating name="half-rating-read" value={place.taste ?? 0.5} precision={0.1} readOnly/>
                        <Typography
                            style={{marginLeft: '8px'}}
                            variant={"h6"}
                            component={"span"}>
                            {!Number.isSafeInteger(place.taste) ? place.taste : place.taste + '.0'}
                        </Typography>
                    </Box>
                </Box>}
            </Grid>
            <Divider style={{margin: '10px 0'}}/>
            <Grid direction="column" container item>

                {comment.map(c => (
                    <Grid key={c._id} item>
                        <Comments
                            comment={c}
                            user={user}
                            remove={()=>dispatch(deleteComment(c._id,props.match.params.id))}
                        />
                        <Divider style={{margin: '10px 0'}}/>
                    </Grid>

                ))}
            </Grid>


            <Grid container item>
                <form style={{width: '100%'}} onSubmit={submitFormHandler}>
                    <Grid container item>
                        <Grid item xs>
                            <FormElement
                                propertyName={'comment'}
                                title={'Comment'}
                                onChange={inputChangeHandler}
                                value={state.comment}
                            />
                        </Grid>
                        <Grid container item style={{margin: '10px 0'}}>
                            <Grid item xs>
                                <FormElement
                                    type="select"
                                    propertyName={'easyToMake'}
                                    title={'EasyToMake'}
                                    onChange={inputChangeHandler}
                                    value={state.easyToMake}
                                    options={options}
                                />
                            </Grid>
                            <Grid item xs>
                                <FormElement
                                    type="select"
                                    propertyName={'quickToMake'}
                                    title={'QuickToMake'}
                                    value={state.quickToMake}
                                    onChange={inputChangeHandler}
                                    options={options}
                                />
                            </Grid>
                            <Grid item xs>
                                <FormElement
                                    type="select"
                                    propertyName={'taste'}
                                    title={'Taste'}
                                    value={state.taste}
                                    onChange={inputChangeHandler}
                                    options={options}
                                />
                            </Grid>

                        </Grid>
                        <Grid>
                            <Button color="primary" variant="contained" type="submit">
                                add comment
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Grid>
            <Divider style={{margin: '10px 0'}}/>
            <Grid container item>
                <form onSubmit={submitImageFormHandler}>
                    <Grid item>
                        <FormElement
                            propertyName={'image'}
                            title={'Image'}
                            onChange={fileChangeHandler}
                            type="file"
                        />
                    </Grid>
                    <Grid item>
                        <Button type="submit" variant="contained" color="primary">
                            Add photo
                        </Button>
                    </Grid>
                </form>
            </Grid>
        </Grid>
    );
};

export default Place;