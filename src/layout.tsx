import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { Icon } from './icon';

import * as strings from './strings';

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
                    { strings.Layout.HideMenu }
                </span>
            </button>
            <ul>
                <li><NavLink activeClassName="a--active" exact to="/">{ strings.Layout.Home }</NavLink></li>
                <li><NavLink activeClassName="a--active" to="/scan">{ strings.Layout.Scan }</NavLink></li>
                <li><NavLink activeClassName="a--active" to="/faq">{ strings.Layout.FAQ }</NavLink></li>
                <li><NavLink activeClassName="a--active" to="/technical-information">{ strings.Layout.TechnicalInformation }</NavLink></li>
                <li className="li--space"><NavLink activeClassName="a--active" to="/privacy">{ strings.Layout.Privacy }</NavLink></li>
                <li><NavLink activeClassName="a--active" to="/cookies">{ strings.Layout.Cookies }</NavLink></li>
            </ul>
        </nav>
        <header>
            <button className="nav__toggle button" onClick={() => { setNavOpen(true) }}>
                <Icon className="button__icon" icon='menu' />
                <span className="button__text">
                    { strings.Layout.ShowMenu }
                </span>
            </button>

            <h1>{ strings.App }</h1>
        </header>
        <main>
            {children}
        </main>
    </div>;
};