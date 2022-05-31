import { Fragment } from "react";
import Copyright from "../Copyright";
import classes from "./Footer.module.css";

const Footer = (props) => {
    return (
        <Fragment>
            <footer className={classes.footer}>
                <Copyright websiteName={"Christine Gerard and Thomas Lornsen,"} copyrightYear={new Date().getFullYear()} />
            </footer>
        </Fragment>
    );
};

export default Footer;
