import React from 'react';
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Rating from "@material-ui/lab/Rating";
import {NavLink} from "react-router-dom";
import Button from "@material-ui/core/Button";


const Comments = ({comment, remove,user}) => {
    return (
        <Box>
        <Box>
            <Typography variant={"h4"} component={"h4"}>Reviews</Typography>
            <span>
                {'On '+ comment.date+','}

                <NavLink style={{margin:'5px'}} to={"/place/" + comment.recipe} >
                    {comment.user.displayName}
                </NavLink>
                <span> said</span>
            </span>

            <p>{comment.comment}</p>
            { comment.easyToMake && <Box>
            <Box component={'div'} style={{display:'flex',alignItems:'center'}}>
                <Typography variant={"h6"} component={"span"}>EasyToMake: </Typography>
                <Rating name="half-rating-read" value={comment.easyToMake ?? 0.5} precision={0.1} readOnly />
                <Typography style={{marginLeft:'8px'}} variant={"h6"} component={"span"}>
                    {!Number.isSafeInteger(comment.easyToMake)? comment.easyToMake : comment.easyToMake + '.0' }
                </Typography>
            </Box>
            <Box component={'div'} style={{display:'flex',alignItems:'center'}}>
                <Typography variant={"h6"} component={"span"}>QuickToMake: </Typography>
                <Rating name="half-rating-read" value={comment.quickToMake ?? 0.5} precision={0.1} readOnly />
                <Typography style={{marginLeft:'8px'}} variant={"h6"} component={"span"}>
                    {!Number.isSafeInteger(comment.quickToMake)? comment.quickToMake : comment.quickToMake + '.0' }
                </Typography>
            </Box>
            <Box component={'div'} style={{display:'flex',alignItems:'center'}}>
                <Typography variant={"h6"} component={"span"}>Taste: </Typography>
                <Rating name="half-rating-read" value={comment.taste ?? 0.5 } precision={0.1} readOnly />
                <Typography
                    style={{marginLeft:'8px'}}
                    variant={"h6"}
                    component={"span"}>
                    {!Number.isSafeInteger(comment.taste)? comment.taste : comment.taste + '.0'}
                </Typography>
            </Box>
           </Box>}
        </Box>
            {user && user.role ==='admin' && <Button variant="contained" color="secondary" onClick={remove}>Delete</Button>}
        </Box>

    );
};

export default Comments;