import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {AuthenticationContractAddress, CoursesContractAddress} from "../../config"
import Authentication from "../../contracts/Authentication.json"
import {ethers} from 'ethers'
import {create, urlSource} from 'ipfs-http-client'
import {Buffer} from "buffer"
import Courses from "../../contracts/Courses.json";

const initialState = {
    loadingUploadCourse: false,
    course: {}
}

async function initialProviderAuthentication () {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    return new ethers.Contract(AuthenticationContractAddress, Authentication.abi, signer);
}

export const uploadFile = createAsyncThunk(
    'uploadFile',
    async ({_title, _resume, _bufferPdf, _bufferImage}) => {
        console.log(_resume)
        if(window.ethereum !== 'undefined'){
            const contractCourses = await initialProviderAuthentication()
            const ipfs = create({host: 'ipfs.infura.io', port: 5001, protocol: 'https'})
            try{
                const hashPdf = await ipfs.add(_bufferPdf)
                const hashImage = await ipfs.add(_bufferImage)
                console.log(hashPdf)
                console.log(hashImage)
                // await contractCourses.newCourse("TitleBaghdad", "resumeBaghdad", c)
                // return {errorFlag: false, content: await contractCourses.getCourseById(_idCourse)}
            } catch (e) {
                console.log('Error : ', e);
                return {errorFlag: true, content: "Error fetch Course by Id from the blockchain !"}
            }
        }
    }
)

export const setCoursesSlice = createSlice({
    name: 'setCourse',
    initialState,
    reducers: {
        fileToBuffer : (state, action) => {
            const reader = new window.FileReader()
            reader.readAsArrayBuffer(action.payload)
            reader.onloadend = () => {
                // console.log(Buffer.from(reader.result))
                state.buffer = Buffer.from((reader.result))
            }
        }
    },
    extraReducers: {
        [uploadFile.pending] : state => {
            console.log("uploadFile : Pending")
        },
        [uploadFile.fulfilled] : (state, action) => {
            console.log("uploadFile : fulfilled")
        },
        [uploadFile.rejected] : (state, action) => {
            console.log("uploadFile : Rejected")
        }
    },
});

export const {fileToBuffer} = setCoursesSlice.actions;

export const selectBuffer = state => state.setCourse.buffer

export default setCoursesSlice.reducer;
