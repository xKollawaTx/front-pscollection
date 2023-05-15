import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    gameList: [],
}

export const gameSlide = createSlice({
    name: "game",
    initialState,
    reducers: {
        setDataGame : (state, action) => {
            console.log(action);
            state.gameList = [...action.payload]

        }
    }

})

export const { setDataGame } = gameSlide.actions

export default gameSlide.reducer