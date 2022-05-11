import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {AuthenticationContractAddress} from "../../config"
import Authentication from "../../contracts/Authentication.json"
import {ethers} from 'ethers'

const initialState = {
    addressAccount : "",
    user: {
        addressAccount: "",
        firstName : "",
        familyName: "",
        typeUser: ""
    },
    loading: false,
    signedUp: false
}

async function initialProviderAuthentication () {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    return new ethers.Contract(AuthenticationContractAddress, Authentication.abi, signer);
}

export const getAddressAccount = createAsyncThunk(
    'getAddressAccount',
    async (_) => {
        const account = await window.ethereum.request({ method: 'eth_requestAccounts' });
        return account[0]
    }
)

export const testFromBlockchain = createAsyncThunk(
    'testFromBlockchain',
    async (_) => {
        if(window.ethereum !== 'undefined'){
            const contractAuthentication = await initialProviderAuthentication()
            try{
                const test = await contractAuthentication.test()
                console.log(test)
            } catch (e) {
                console.log('Error test : ', e);
            }
        }
    }
)

export const signUp__blockchain = createAsyncThunk(
    'signUp__blockchain',
    async (signUpInputs) => {
        if(window.ethereum !== 'undefined'){
            const contractAuthentication = await initialProviderAuthentication()
            try{
                await contractAuthentication.signUp(signUpInputs.firstName, signUpInputs.familyName, signUpInputs.typeUser, signUpInputs.password)
            } catch (e) {
                console.log('Error sign up to the blockchain : ', e);
            }
        }
    }
)

export const logIn__blockchain = createAsyncThunk(
    'logIn__blockchain',
    async (_password) => {
        if(window.ethereum !== 'undefined'){
            const contractAuthentication = await initialProviderAuthentication()
            try{
                return await contractAuthentication.logIn(_password)
            } catch (e) {
                console.log('Error sign up to the blockchain : ', e);
            }
        }
    }
)

export const authenticationSlice = createSlice({
    name: 'authentication',
    initialState,
    reducers: {

    },
    extraReducers: {

        [getAddressAccount.fulfilled] : (state, action) => {
            state.addressAccount = action.payload
        },

        [signUp__blockchain.pending] : state => {
            state.loading = true
        },
        [signUp__blockchain.fulfilled] : (state, action) => {
            state.signedUp = true
        },
        [signUp__blockchain.rejected] : (state, action) => {
            console.log("Error sign up : " + action.payload)
        },

        [logIn__blockchain.pending] : state => {
            state.loading = true
        },
        [logIn__blockchain.fulfilled] : (state, action) => {
            state.user.addressAccount = action.payload[1]
            state.user.firstName = action.payload[2]
            state.user.familyName = action.payload[3]
            state.user.typeUser = action.payload[4]
            state.signedUp = false
        }
    },
});

export const {} = authenticationSlice.actions;

export const selectAddressAccount = state => state.authentication.addressAccount
export const selectUser = state => state.authentication.user
export const selectLoading = state => state.authentication.loading
export const selectSignedUp = state => state.authentication.signedUp

export default authenticationSlice.reducer;
