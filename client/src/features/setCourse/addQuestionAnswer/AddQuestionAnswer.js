import React, {useEffect, useState} from 'react';
import TextField from "@mui/material/TextField";
import {useDispatch} from "react-redux";
import Button from "@mui/material/Button";

function AddQuestionAnswer({_idCourse}) {

    const dispatch = useDispatch()

    const [question, setQuestion] = useState("")
    const [answer, setAnswer] = useState("")

    useEffect(() => {
        console.log(_idCourse)
    }, [])

    const uploadQuestionAnswer = e => {
        e.preventDefault()

    }

    return (
        <form className="addQuestionAnswer">
            <TextField
                value={question}
                onChange={e => setQuestion(e.target.value)}
                label="Question" variant="filled" className={"addQuestionAnswer__input"} />
            <TextField
                value={answer}
                onChange={e => setAnswer(e.target.value)}
                label="Answer" variant="filled" className={"addQuestionAnswer__input"}/>
            <Button
                className={"addQuestionAnswer__btn"}
                disabled={!question || !answer}
            >Upload Question Answer</Button>
        </form>
    );
}

export default AddQuestionAnswer;