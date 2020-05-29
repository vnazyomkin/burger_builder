import React from 'react';

import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';
import controls from '../../UI/LOV/Controls';


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
        <button
            className={classes.OrderButton}
            disabled={!props.purchasable}
            onClick={props.ordered}>{props.isAuth ? 'Заказать сейчас' : 'Войти, чтобы заказать'}</button>
    </div>
    )

export default buildControls;