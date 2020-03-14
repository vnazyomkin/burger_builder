import React from 'react';
import { Link } from 'react-router-dom';


import classes from './NavigationItem.css';

const navigationItem = (props) => (
    <li className={classes.NavigationItem}>
        <Link to={{
            pathname: props.link,
        }}
        className={props.active ? classes.active : null}>{props.children}</Link>
    </li>
);

export default navigationItem;