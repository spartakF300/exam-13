import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

import Typography from '@material-ui/core/Typography';
import {apiURL} from "../../constants";
import {NavLink} from "react-router-dom";
import Rating from "@material-ui/lab/Rating";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";


const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
});

export default function MediaCard(props) {
    const classes = useStyles();
    console.log(props.image);
    return (
        <Card className={classes.root}>
            {props &&<CardActionArea>
                <CardMedia
                    className={classes.media}
                    image={apiURL + '/' + props.image}
                    title="Contemplative Reptile"
                />
                <CardContent>
                    <NavLink to={'/place/'+ props.id}>{props.name}</NavLink>
                    <Box component={'div'} style={{display:'flex',alignItems:'center'}}>
                        <Typography variant={"h6"} component={"span"}>Overall: </Typography>
                        <Rating name="half-rating-read" value={+props.overall} precision={0.2} readOnly />
                        <Typography style={{marginLeft:'8px'}} variant={"h6"} component={"span"}>
                            {!Number.isSafeInteger(props.overall)? props.overall : props.overall + '.0' }
                        </Typography>
                    </Box>

                </CardContent>

            </CardActionArea>}
            <Box style={{margin:'10px'}}>
                {props.user && props.user.role === 'admin' && <IconButton onClick={props.remove}  variant="contained" color="secondary">
                    Delete</IconButton>}
            </Box>
        </Card>
    );
}