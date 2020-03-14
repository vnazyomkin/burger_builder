import React from 'react';

import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" active>Конструктор бургера</NavigationItem>
        <NavigationItem link="/order">Заказ</NavigationItem>
    </ul>
);

export default navigationItems;