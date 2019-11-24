import React from 'react';

import classes from './BuilsControl.css';

const buildControl = (props) => (
    <div className={classes.BuildControl}>
        <div className={classes.Label}>{props.label}</div>
        <button
            className={classes.Less}
            onClick={props.remove}
            disabled={props.disabled}>-1</button>
        <button
            className={classes.More}
            onClick={props.added}>+1</button>
    </div>
);

export default buildControl;