import "./App.css";
import Home from "./pages/Home";
import { Fragment } from "react";
import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";

export default function App() {
    return (
        <Fragment>
            <Header />
            <main>
                <Home />
            </main>

            <Footer />
        </Fragment>
    );
}
