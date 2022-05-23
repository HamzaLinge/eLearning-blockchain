import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {CoursesContractAddress} from "../../config"
import Courses from "../../contracts/Courses.json"
import {ethers} from 'ethers'

const initialState = {
    courses: [],
    loadingCourses: false,
    errorFetchCourses: "",
    course: {},
}

async function initialProviderCourses () {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    return new ethers.Contract(CoursesContractAddress, Courses.abi, signer);
}

export const fetchCourses = createAsyncThunk(
    'fetchCourses',
    async (_) => {
        // return {errorFlag: false, content: []}
        if(window.ethereum !== 'undefined'){
            const contractCourses = await initialProviderCourses()
            try{
                const ifCoursesIsEmpty = await contractCourses.ifCoursesIsEmpty()
                if(ifCoursesIsEmpty) return {errorFlag: false, content: []}
                return {errorFlag: false, content: await contractCourses.getCourses()}
            } catch (e) {
                console.log('Error fetch Courses from the blockchain : ', e);
                return {errorFlag: true, content: "Error fetch Courses from the blockchain !"}
            }
        }
    }
)

export const fetchCourseById = createAsyncThunk(
    'fetchCourseById',
    async (_idCourse) => {
        if(window.ethereum !== 'undefined'){
            const contractCourses = await initialProviderCourses()
            try{
                return {errorFlag: false, content: await contractCourses.getCourseById(_idCourse)}
            } catch (e) {
                console.log('Error fetch Course by Id from the blockchain : ', e);
                return {errorFlag: true, content: "Error fetch Course by Id from the blockchain !"}
            }
        }
    }
)

export const homeStudentSlice = createSlice({
    name: 'homeStudent',
    initialState,
    reducers: {},
    extraReducers: {
        // Fetch Courses
        [fetchCourses.pending] : state => {
            state.courses = []
            state.errorFetchCourses = ""
            state.loadingCourses = true
        },
        [fetchCourses.fulfilled] : (state, action) => {
            if(action.payload.errorFlag) state.errorFetchCourses = action.payload.content
            else state.courses = action.payload.content
            state.loadingCourses = false
        },
        [fetchCourses.rejected] : (state, action) => {
            state.errorFetchCourses = action.payload.content
            state.loadingCourses = false
        },
        // Fetch Course By Id
        [fetchCourseById.pending] : state => {
            state.course = {}
            state.errorFetchCourses = ""
            state.loadingCourses = true
        },
        [fetchCourseById.fulfilled] : (state, action) => {
            if(action.payload.errorFlag) state.errorFetchCourses = action.payload.content
            else {
                state.course.idCourse = action.payload.content[0].idCourse
                state.course.title = action.payload.content[0].title
                state.course.resume = action.payload.content[0].resume
                state.course.urlPdf = action.payload.content[0].urlPdf
                state.course.urlImage = action.payload.content[0].urlImage
                state.course.timestamp = action.payload.content[0].timestamp
                state.course.questionAnswers = action.payload.content[1]
            }
            state.loadingCourses = false
        },
        [fetchCourseById.rejected] : (state, action) => {
            state.errorFetchCourses = action.payload.content
            state.loadingCourses = false
        },
    },
});

// export const {} = homeStudentSlice.actions;

export const selectCourses = state => state.homeStudent.courses;
export const selectLoadingCourses = state => state.homeStudent.loadingCourses;
export const selectErrorFetchCourses = state => state.homeStudent.errorFetchCourses;
export const selectCourse = state => state.homeStudent.course;

export default homeStudentSlice.reducer;
