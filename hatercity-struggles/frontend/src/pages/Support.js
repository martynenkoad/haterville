import React, { useState } from "react"
import questions from "../data/questions"

export default function Support() {

    // State 
    const [showContent, setShowContent] = useState(false)

    /**
     * Function to set the state of the 'showCOntent' to the opposite one
     */
    const toggle = () => {
        setShowContent(!showContent)
    }

    return (
        <div className="support">
            <h1 className="tracking-in-contract">Welcome to Support Page!</h1>
            <h3>If you are here, you have some questions.</h3>
            <p>Here you can find the answers to a couple of the most asked questions {";)"}</p>
            <div className="support-content">
                <div className="content-header">
                    <h4>Content</h4>
                    <span id="arrow"
                        className="show-more-arrow material-symbols-outlined" 
                        onClick={toggle}
                    >{showContent ? "arrow_drop_up" : "arrow_drop_down"}</span>
                </div>
                <div className="content-questions" style={showContent ? {} : { opacity: "0", height: "0" }}>
                {
                    questions &&
                    questions.map(item => {
                        return(
                            <a key={item.id + 1} href={`#${item.id - 1}`}>{item.id}. {item.question}</a>
                        )
                    })
                }
                </div>
            </div>
            <div className="support-questions">
            {
                questions &&
                questions.map(item => {
                    return (
                        <div className="support-question" key={item.id}>
                            <h4 id={item.id}>{item.question}</h4>
                            <p>{item.answer}</p>
                            {item.link && <a href={item.link}>Follow me</a>}
                        </div>
                    )
                })
            }
            </div>

        </div>
    )
}