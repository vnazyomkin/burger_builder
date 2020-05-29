import React from 'react';

import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => {
    const auth = !props.isAuth 
        ? <NavigationItem link="/auth">Войти</NavigationItem>
        : <NavigationItem link="/logout">Выйти</NavigationItem>
    return <ul className={classes.NavigationItems}>

        <NavigationItem link="/" exact>Конструктор бургера</NavigationItem>
        {props.isAuth ? <NavigationItem link="/orders">Заказы</NavigationItem> : null}
        {auth}
    </ul>
};

export default navigationItems;