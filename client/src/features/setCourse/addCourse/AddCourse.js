import React, {useEffect, useRef, useState} from "react"
import "./AddCourse.css"
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {useDispatch, useSelector} from "react-redux";
import {fileToBuffer, selectBuffer, uploadFile} from "../setCourseSlice";
import {Buffer} from "buffer";

export const AddCourse = () => {

    const dispatch = useDispatch()

    const [title, setTitle] = useState("")
    const [resume, setResume] = useState("")
    const refPdf = useRef()
    const refImage = useRef()

    const uploadNewCourse = () => {
        if(!refPdf.current || !refImage.current) return true;
        const readePdf = new window.FileReader()
        readePdf.readAsArrayBuffer(refPdf.current.files[0])
        readePdf.onloadend = () => {
            const readeImage = new window.FileReader()
            readeImage.readAsArrayBuffer(refImage.current.files[0])
            readeImage.onloadend = () => {
                dispatch(uploadFile({_title: title, _resume: resume, _bufferPdf: Buffer.from((readePdf.result)), _bufferImage: Buffer.from((readeImage.result))}))
            }
        }
    }

    return (
        <form className={"addCourse"}>
            <p className={"addCourse__title"}>New Course</p>
            <TextField className={"addCourse__input"} label="Title" variant="outlined"
                       value={title}
                       onChange={e => setTitle(e.target.value)}
            />
            <TextField className={"addCourse__input"} label="Resume" variant="outlined"
                       value={resume}
                       onChange={e => setResume(e.target.value)}
                       multiline
                       rows={4}
            />
            <Button className={"addCourse__input"} variant="contained" component="label">
                Upload PDF
                <input type={"file"}
                       hidden
                       ref={refPdf}
                />
            </Button>
            <Button className={"addCourse__input"} variant="contained" component="label">
                Upload Image
                <input type={"file"}
                       hidden
                       ref={refImage}
                />
            </Button>
            <Button className={"addCourse__upload"}
                    onClick={uploadNewCourse}
                    disabled={!title || !resume}
            >Upload</Button>
        </form>
    )
}