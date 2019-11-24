import React from 'react';

import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    { label: 'Сатат', type: 'salad'},
    { label: 'Бекон', type: 'bacon'},
    { label: 'Сыр', type: 'cheese'},
    { label: 'Мясо', type: 'meat'},
];

const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <p>Цена: <strong>{props.price}</strong> руб.</p>
        {controls.map(ctrl => (
            <BuildControl
                key={ctrl.label}
                label={ctrl.label}
                added={() => props.ingredientAdded(ctrl.type)}
                remove={() => props.ingredientRemove(ctrl.type)}
                disabled={props.disabled[ctrl.type]}/>
        ))}
    </div>
    )

export default buildControls;