import React from 'react';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {NavLink} from "react-router-dom";
import AssignmentIcon from '@material-ui/icons/Assignment';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import {useSelector} from "react-redux";

export default function SwipeableTemporaryDrawer(props) {
const user = useSelector(state=>state.users.user);
    return (
        <div>
            <React.Fragment>

                <SwipeableDrawer
                    anchor={'left'}
                    open={props.open}
                    onClose={() => props.close(false)}
                    onOpen={() => props.menuHandler(true)}

                >
                   {user && <NavLink onClick={()=> props.close(false)} to="/addPlace" style={{fontSize:'24px',textDecoration:'none',width:'160px', color:'#888'}} >
                        <List>
                            <ListItem button >
                                <AssignmentIcon/>
                                <ListItemText primary="Add place"/>
                            </ListItem>
                        </List>
                    </NavLink>}
                    <NavLink onClick={()=> props.close(false)} to="/" style={{fontSize:'24px',textDecoration:'none',width:'160px', color:'#888'}} >
                        <List>
                            <ListItem button >
                                <AddCircleIcon/>
                                <ListItemText primary="Places"/>
                            </ListItem>
                        </List>
                    </NavLink>

                </SwipeableDrawer>
            </React.Fragment>

        </div>
    );
}