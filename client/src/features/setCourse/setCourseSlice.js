import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {CoursesContractAddress} from "../../config"
import {ethers} from 'ethers'
import {create} from 'ipfs-http-client'
import Courses from "../../contracts/Courses.json";

const initialState = {
    loadingUploadCourse: false
}

async function initialProviderCourses () {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    return new ethers.Contract(CoursesContractAddress, Courses.abi, signer);
}

export const uploadFile = createAsyncThunk(
    'uploadFile',
    async ({_title, _resume, _bufferPdf, _bufferImage}) => {
        // console.log(_resume)
        if(window.ethereum !== 'undefined'){
            const contractCourses = await initialProviderCourses()
            const ipfs = create({host: 'ipfs.infura.io', port: 5001, protocol: 'https'})
            try{
                const hashPdf = await ipfs.add(_bufferPdf)
                const hashImage = await ipfs.add(_bufferImage)
                console.log(hashPdf)
                console.log(hashImage)
                await contractCourses.newCourse(_title, _resume, hashPdf.path, hashImage.path)
                return {errorFlag: false, content: ""}
            } catch (e) {
                console.log('Error add course : ', e);
                return {errorFlag: true, content: "Error add Course by to blockchain !"}
            }
        }
    }
)

export const setCoursesSlice = createSlice({
    name: 'setCourse',
    initialState,
    reducers: {},
    extraReducers: {
        [uploadFile.pending] : state => {
            console.log("uploadFile : Pending")
            state.loadingUploadCourse = true
        },
        [uploadFile.fulfilled] : (state, action) => {
            console.log("uploadFile : fulfilled")
            console.log(action.payload)
            state.loadingUploadCourse = false
        },
        [uploadFile.rejected] : (state, action) => {
            console.log("uploadFile : Rejected")
            console.log(action.payload.content)
            state.loadingUploadCourse = false
        }
    },
});

// export const {} = setCoursesSlice.actions;

export const selectLoadingUploadCourse = state => state.setCourse.loadingUploadCourse

export default setCoursesSlice.reducer;
