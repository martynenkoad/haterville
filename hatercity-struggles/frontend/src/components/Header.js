import React from "react"
import { Link } from "react-router-dom"
import "../styles/styles.css"

export default function Header() {

    return(
        <div className="navbar">
            <Link to="/" className="link title">
                <h1>Haterville</h1>
            </Link>
            <Link to="/support">
            <span className="material-symbols-outlined question">
                help
            </span>
            </Link>
        </div>
    )
}