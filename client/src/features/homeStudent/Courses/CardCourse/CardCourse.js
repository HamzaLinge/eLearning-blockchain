import React, {useState} from 'react'
import "./CardCourse.css"
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf'
import IconButton from "@mui/material/IconButton";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import CodeIcon from '@mui/icons-material/Code';
import {DEV_MODE, URL_STUDENT_COURSES_COURSE} from "../../../../config";
import {useNavigate} from "react-router-dom";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import {useDispatch} from "react-redux";
import {uploadQuestionAnswersOfCourse} from "../../../setCourse/setCourseSlice";
import {qcm} from "../../../setCourse/datas/course_1/course_1_qcm";

function CardCourse({_idCourse, _title, _resume, _urlPdf, _urlImage, _timestamp}) {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [open, setOpen] = useState(false)

    const goToCourse = () => {
        navigate(URL_STUDENT_COURSES_COURSE + "/" + _idCourse, {
            state: {
                _idCourse,
                _title,
                _resume,
                _urlPdf,
                _urlImage,
                _timestamp
            }
        })
    }

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    }

    const submitQuestionAnswers = () => {
        const _question = document.querySelector(".addQCM__question").value
        const _answers = []
        const _flags = []
        document.querySelectorAll(".addQCM__answer").forEach(answer => {
            const text = answer.querySelector(".addQCM__answer__text").value
            if(text.length !== 0){
                _answers.push(text)
                const flag = answer.querySelector(".addQCM__answer__flag").value
                if(flag === "true") _flags.push(true)
                else _flags.push(false)
            }
        })
        dispatch(uploadQuestionAnswersOfCourse({_idCourse, _question, _answers, _flags}))
    }

    const submitQCM = () => {
        const _QCM = qcm;
        _QCM.forEach((q) => {
            const _question = q.question;
            const _answers = q.answers;
            const _flags = q.flags;
            dispatch(uploadQuestionAnswersOfCourse({_idCourse, _question, _answers, _flags}));
        })
    }

    return (
        <div className="cardCourse">
            <img className={"cardCourse__img"} src={`https://ipfs.io/ipfs/${_urlImage}`} alt={""} />
            <p className="cardCourse__title">{_title}</p>
            <p className="cardCourse__resume">
                {
                    _resume.length >= 25 ?
                        _resume.substr(0, 25).concat(". . .")
                        :
                        _resume
                }
            </p>
            <div className="cardCourse__links">
                <IconButton className="cardCourse__links__link"
                            variant="contained"
                            color={"success"}
                            size={"small"}
                            onClick={() => {
                                window.open(`https://ipfs.io/ipfs/${_urlPdf}`, "_blank")
                            }}
                >
                    <PictureAsPdfIcon fontSize="inherit" />
                </IconButton>
                {
                    DEV_MODE ?
                        <IconButton className="cardCourse__btnDownload"
                                    variant="contained"
                                    color={"success"}
                                    size={"small"}
                                    onClick={() => setOpen(true)}
                        >
                            <CodeIcon fontSize="inherit" />
                        </IconButton>
                        :
                        ""
                }
                <IconButton className="cardCourse__btnDownload"
                            variant="contained"
                            color={"secondary"}
                            size={"small"}
                            onClick={goToCourse}
                >
                    <MoreHorizIcon fontSize="inherit" />
                </IconButton>
            </div>
            <Modal
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <p className="addQCM__title">Add Question and Answers</p>
                    <input placeholder={"question"} type="text" className="addQCM__question"/>
                    <div className="addQCM__answer">
                        <input placeholder={"answer"} type="text" className="addQCM__answer__text"/>
                        <select className="addQCM__answer__flag">
                            <option value={false} className="addQCM__answer__flag__option">False</option>
                            <option value={true} className="addQCM__answer__flag__option">True</option>
                        </select>
                    </div>
                    <div className="addQCM__answer">
                        <input placeholder={"answer"} type="text" className="addQCM__answer__text"/>
                        <select className="addQCM__answer__flag">
                            <option value={false} className="addQCM__answer__flag__option">False</option>
                            <option value={true} className="addQCM__answer__flag__option">True</option>
                        </select>
                    </div>
                    <div className="addQCM__answer">
                        <input placeholder={"answer"} type="text" className="addQCM__answer__text"/>
                        <select className="addQCM__answer__flag">
                            <option value={false} className="addQCM__answer__flag__option">False</option>
                            <option value={true} className="addQCM__answer__flag__option">True</option>
                        </select>
                    </div>
                    <div className="addQCM__answer">
                        <input placeholder={"answer"} type="text" className="addQCM__answer__text"/>
                        <select className="addQCM__answer__flag">
                            <option value={false} className="addQCM__answer__flag__option">False</option>
                            <option value={true} className="addQCM__answer__flag__option">True</option>
                        </select>
                    </div>
                    <div className="addQCM__answer">
                        <input placeholder={"answer"} type="text" className="addQCM__answer__text"/>
                        <select className="addQCM__answer__flag">
                            <option value={false} className="addQCM__answer__flag__option">False</option>
                            <option value={true} className="addQCM__answer__flag__option">True</option>
                        </select>
                    </div>
                    <button className="addQCM__submit"
                            onClick={submitQCM}
                    >Submit</button>
                </Box>
            </Modal>
        </div>
    );
}

export default CardCourse;