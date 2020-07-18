import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import RecipeCard from "../../components/RecipeCard/RecipeCard";
import {deletePlaces, getPlaces} from "../../store/actions/placeAction";
import Grid from "@material-ui/core/Grid";

const Places = () => {
    const places = useSelector(state => state.place.places);
    const user = useSelector(state => state.users.user);
    const dispatch = useDispatch();

    useEffect(() => {

        dispatch(getPlaces())
    }, []);

    return (
        <Grid container item spacing={2}>
            {places && places.map(r => (
                <Grid style={{margin:'10px'}}   key={r._id} item>
                <RecipeCard
                    image={r.image}
                    overall={r.overall}
                    name={r.name}
                    id={r._id}
                    user={user}
                    remove={()=>dispatch(deletePlaces(r._id))}

                />
                             </Grid>
            ))}

        </Grid>
    );
};

export default Places;