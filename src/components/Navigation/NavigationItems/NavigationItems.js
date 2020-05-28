import React from 'react';

import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" exact>Конструктор бургера</NavigationItem>
        <NavigationItem link="/orders">Заказы</NavigationItem>
        <NavigationItem link="/auth">Регистрация/Вход</NavigationItem>
    </ul>
);

export default navigationItems;