import React, {useEffect, useRef, useState} from "react"
import "./AddCourse.css"
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {useDispatch, useSelector} from "react-redux";
import {Buffer} from "buffer";
import LoadingButton from "@mui/lab/LoadingButton";
import {selectLoadingUploadCourse} from "../adminSlice.js";
import {baghdad} from "../../authentication/authenticationSlice";
import {selectErrorUploadCourse, uploadCourseToBlockchain} from "../adminSlice";
import Alert from "@mui/material/Alert";

export const AddCourse = () => {

    const dispatch = useDispatch()

    const loadingUploadCourse = useSelector(selectLoadingUploadCourse);
    const errorUploadCourse = useSelector(selectErrorUploadCourse);

    const [title, setTitle] = useState("")
    const [resume, setResume] = useState("")
    const refPdf = useRef(undefined)
    const refImage = useRef(undefined)

    const uploadNewCourse = e => {
        e.preventDefault()
        const readePdf = new window.FileReader()
        readePdf.readAsArrayBuffer(refPdf.current.files[0])
        readePdf.onloadend = () => {
            const readeImage = new window.FileReader()
            readeImage.readAsArrayBuffer(refImage.current.files[0])
            readeImage.onloadend = () => {
                dispatch(uploadCourseToBlockchain({
                    _title: title,
                    _resume: resume,
                    _bufferPdf: Buffer.from(readePdf.result),
                    _bufferImage: Buffer.from((readeImage.result))
                }))
            }
        }
    }

    // const uploadCoursesFromJsonMetaData = e => {
    //     e.preventDefault()
    //     setLoadingUploadCourses(true)
    //     courses_meta.forEach(courseMeta => {
    //         console.log(pathCoursesMeta + courseMeta.path + "/" + courseMeta.path + ".pdf")
    //         console.log(pathCoursesMeta + courseMeta.path + "/" + courseMeta.path + courseMeta.extImage)
    //         const filePdf = new File(["arrayBuffer"], courseMeta.path + ".pdf")
    //         const fileImage = new File(["arrayBuffer"], pathCoursesMeta + courseMeta.path + "/" + courseMeta.path + courseMeta.extImage)
    //         console.log(filePdf)
    //         console.log(fileImage)
    //         const readerPdf = new window.FileReader()
    //         readerPdf.readAsArrayBuffer(filePdf)
    //         readerPdf.onloadend = () => {
    //             const readerImage = new window.FileReader()
    //             readerImage.readAsArrayBuffer(fileImage)
    //             readerImage.onloadend = () => {
    //                 dispatch(uploadFile({
    //                     _title: courseMeta.title,
    //                     _resume: courseMeta.resume,
    //                     _bufferPdf: Buffer.from(readerPdf.result),
    //                     _bufferImage: Buffer.from(readerImage.result)
    //                 }))
    //             }
    //         }
    //     })
    //     setLoadingUploadCourses(false)
    // }

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
                       accept="application/pdf"
                />
            </Button>
            <Button className={"addCourse__input"} variant="contained" component="label">
                Upload Image
                <input type={"file"}
                       hidden
                       ref={refImage}
                       accept="image/*"
                />
            </Button>
            <LoadingButton type={"submit"} loading={loadingUploadCourse} variant="contained"
                           className={"addCourse__upload"}
                           onClick={uploadNewCourse}
                           disabled={!title || !resume}
            >Upload</LoadingButton>
            {
                errorUploadCourse.length !== 0 ?
                    <Alert severity="error">{errorUploadCourse}</Alert>
                    :
                    ""
            }
        </form>
    )
}