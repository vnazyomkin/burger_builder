import React from 'react';

import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';

const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <div>Меню</div>
        <Logo/>
        <nav>
            <ul>...</ul>
        </nav>
    </header>
);

export default toolbar;