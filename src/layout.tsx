import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { Icon } from './icon';

interface LayoutProps {

};

export const Layout: React.FC<LayoutProps> = (props) => {

    const {
        children
    } = props;

    const [navOpen, setNavOpen] = React.useState<boolean>(false);

    return <div className="layout">
        <nav className={navOpen ? 'nav--open' : 'nav--closed'}>
            <button className="nav__button nav__toggle button button--nav" onClick={() => { setNavOpen(false) }}>
                <Icon className="button__icon" icon='cevron-left' />
                <span className="button__text">
                    Hide menu
                </span>
            </button>
            <ul>
                <li><NavLink activeClassName="a--active" exact to="/">Home</NavLink></li>
                <li><NavLink activeClassName="a--active" to="/scan">Scan</NavLink></li>
                <li><NavLink activeClassName="a--active" to="/faq">How does it work?</NavLink></li>
                <li><NavLink activeClassName="a--active" to="/privacy">Privacy</NavLink></li>
                <li><NavLink activeClassName="a--active" to="/cookies">Cookies</NavLink></li>
            </ul>
        </nav>
        <header>
            <button className="nav__toggle button" onClick={() => { setNavOpen(true) }}>
                <Icon className="button__icon" icon='menu' />
                <span className="button__text">
                    Show menu
                </span>
            </button>

            <h1>COVID Passport Checker</h1>
        </header>
        <main>
            {children}
        </main>
    </div>;
};