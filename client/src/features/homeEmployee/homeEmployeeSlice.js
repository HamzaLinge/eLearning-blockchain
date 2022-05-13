import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {AuthenticationContractAddress} from "../../config"
import Authentication from "../../contracts/Authentication.json"
import {ethers} from 'ethers'

const initialState = {

}

async function initialProviderAuthentication () {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    return new ethers.Contract(AuthenticationContractAddress, Authentication.abi, signer);
}

export const homeEmployeeSlice = createSlice({
    name: 'homeEmployee',
    initialState,
    reducers: {

    },
    extraReducers: {

    },
});

// export const {} = homeEmployeeSlice.actions;



export default homeEmployeeSlice.reducer;