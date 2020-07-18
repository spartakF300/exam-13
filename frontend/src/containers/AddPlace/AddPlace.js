import React, {useState} from 'react';
import FormElement from "../../components/UI/Form/FormElement";
import {useDispatch, useSelector} from "react-redux";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Alert from "@material-ui/lab/Alert";
import Button from "@material-ui/core/Button";
import {postPlace} from "../../store/actions/placeAction";
import AlertTitle from "@material-ui/lab/AlertTitle";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

const AddPlace = () => {
    const dispatch = useDispatch();
   const error = useSelector(state=>state.place.error);
    const [state, setState] = useState({

        name: '',
        description: '',
        image: null
    });
    const [check, setCheck] = React.useState({
        checked: false,
    });
    const handleChange = (event) => {
        console.log(event.target.checked);

        setCheck({...check ,checked: event.target.checked });
    };
    console.log(check);
    const inputChangeHandler = event => {
        setState({
            ...state,
            [event.target.name]: event.target.value
        })
    };
    const submitFormHandler = event => {
        event.preventDefault();
        const formData = new FormData();
        Object.keys(state).forEach(key => {
            formData.append(key, state[key])
        });
        formData.append('check', check.checked)
        dispatch(postPlace(formData))
    };

    const fileChangeHandler = (e) => {

        setState({
            ...state,
            [e.target.name]: e.target.files[0]
        })
    };

    return (

        <Grid container justify="center" style={{margin: '0 auto', marginTop: '5%'}} item xs={12} lg={8} sm={7} ml={8}>
            <Box component="div" boxShadow={10} style={{background: '#fff'}} p={5}>

                <Box style={{textAlign: "center", textTransform: 'uppercase'}} pt={2} pb={2}>
                    <Typography variant="h4">add Place</Typography>
                </Box>

                <form onSubmit={submitFormHandler}>
                    <Grid container direction="column" spacing={2}>
                        <Grid item xs>
                        <FormElement
                            propertyName="name"
                            title={"Name"}
                            onChange={inputChangeHandler}
                        />
                        </Grid>
                        <Grid item xs>
                        <FormElement
                            propertyName="description"
                            title={"Description"}
                            onChange={inputChangeHandler}
                        />
                        </Grid>
                        <Grid item xs>
                        <FormElement
                            propertyName="image"
                            title={"Image"}
                            type="file"
                            onChange={fileChangeHandler}
                        />
                        </Grid>
                    </Grid>
                    <Grid item>

                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={check.checked}
                                    onChange={handleChange}
                                    name="checked"
                                    color="primary"
                                />
                            }
                            label="I agree"
                        />
                    </Grid>
                    <Grid item>
                        <span>
                            Lorem ipsum dolor sit amet, consectetur
                            adipisicing elit. Aut consequatur corporis dolorem esse harum iure
                            nemo nulla officiis quisquam unde.
                        </span>
                    </Grid>
                <Grid item xs>

                <Button disabled={!check.checked}  type="submit" color="primary" variant="contained">
                Add
                </Button>

                </Grid>
                </form>
                </Box>
                </Grid>
                );

                };

export default AddPlace;