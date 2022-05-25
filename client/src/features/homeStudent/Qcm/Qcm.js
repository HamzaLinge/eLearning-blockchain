import React, {useEffect, useState} from 'react';
import "./Qcm.css";
import {useLocation, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {
    fetchQcmOfCourse,
    saveAnswersToStudent,
    selectErrorFetchQcm, selectErrorSaveAnswers,
    selectLoadingQcm,
    selectQcm, selectSavingAnswers
} from "../homeStudentSlice";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import Button from "@mui/material/Button";

function Qcm() {

    const location = useLocation()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const qcm = useSelector(selectQcm)
    const loadingQcm = useSelector(selectLoadingQcm)
    const errorFetchQcm = useSelector(selectErrorFetchQcm)

    const savingAnswers = useSelector(selectSavingAnswers)
    const errorSaveAnswers = useSelector(selectErrorSaveAnswers)

    const [indexQuestion, setIndexQuestion] = useState(0)
    const [indexAnswer, setIndexAnswer] = useState(null)
    const [idQuestions, setIdQuestions] = useState([])
    const [idAnswers, setIdAnswers] = useState([])

    useEffect(() => {
        dispatch(fetchQcmOfCourse(location.state._idCourse))
    }, [])

    useEffect(() => {
        if(qcm.length !== 0){
            setIndexQuestion(qcm[0].indexQuestion)
        }
    }, [qcm.length])

    const nextQuestion = () => {
        setIdQuestions([...idQuestions, indexQuestion])
        setIdAnswers([...idAnswers, indexAnswer])
        setIndexQuestion(indexQuestion + 1)
        setIndexAnswer(null)
    }

    const saveAnswers = () => {
        setIdQuestions([...idQuestions, indexQuestion])
        setIdAnswers([...idAnswers, indexAnswer])
        dispatch(saveAnswersToStudent({_idCourse: location.state._idCourse, _idQuestions: idQuestions, _idAnswers: idAnswers}))
    }

    const cancelQcm = () => {
        if(idQuestions.length === 0) navigate(-1)
        else{
            dispatch(saveAnswersToStudent({_idCourse: location.state._idCourse, _idQuestions: idQuestions, _idAnswers: idAnswers}))
        }
    }

    return (
        <div className="qcm">
            {
                loadingQcm ?
                    <CircularProgress color="success" />
                    :
                    errorFetchQcm.length !== 0 ?
                        <Alert severity="error">{errorFetchQcm} !</Alert>
                        :
                        qcm.length === 0 ?
                            <Alert severity="warning">There is no QCM for this course</Alert>
                            :
                            <>
                                <p className="qcm__title">QCM : {location.state._title}</p>
                                <div className="qcm__main">
                                    {
                                        savingAnswers ?
                                            <div className="qcm__progress__saveAnswers">
                                                <CircularProgress />
                                            </div>
                                            :
                                            ""
                                    }
                                    <p className="qcm__main__counter">{indexQuestion + 1} / {qcm.length}</p>
                                    <p className="qcm__main__question">{qcm[indexQuestion].question} ?</p>
                                    <RadioGroup
                                        className={"qcm__main__answers"}
                                        value={indexAnswer}
                                        onChange={e => setIndexAnswer(e.target.value)}
                                    >
                                        {
                                            qcm[indexQuestion].answers.map((answer, indexAnswer) => (
                                                <FormControlLabel value={indexAnswer} control={<Radio />} label={answer.text} />
                                            ))
                                        }
                                    </RadioGroup>
                                    <div className="qcm__main__btn">
                                        <Button className="qcm__main__btnCancel"
                                                // disabled={!indexAnswer}
                                                variant="outlined"
                                                onClick={cancelQcm}
                                        >Cancel</Button>
                                        {
                                            indexQuestion < qcm.length - 1 ?
                                                <Button className="qcm__main__btnNext"
                                                        onClick={nextQuestion}
                                                        disabled={!indexAnswer}
                                                        variant="contained"
                                                >Next</Button>
                                                :
                                                <Button className="qcm__main__btnSubmit"
                                                        disabled={!indexAnswer}
                                                        variant="contained"
                                                        onClick={saveAnswers}
                                                >Submit</Button>
                                        }
                                    </div>
                                </div>
                                {
                                    errorSaveAnswers.length !== 0 ?
                                        <Alert severity="error">{errorSaveAnswers} !</Alert>
                                        :
                                        ""
                                }

                            </>
            }
        </div>
    );
}

export default Qcm;