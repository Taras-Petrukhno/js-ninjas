import { createSlice } from "@reduxjs/toolkit"
import { fetchPage } from "./superheroAsyncThunk";

const superheroSlice = createSlice({
    name: 'superhero',
    initialState: {
        pageItems: [],
        pageCount: null,
        currentPage: null,
        isLoading: false,
        error: null,
        modals: {
            CUSuperhero: {
                hero: null,
                show: false,
                mode: 'create', //create or update
            },
            superheroCard: {
                hero: null,
                show: false,
            }
        }
    },
    reducers: {
        setError(state, action) {
            state.error = action.payload;
        },

        isSuperheroModalShown(state, action) {
            if (typeof action.payload.show === 'boolean') {
                state.modals.superheroCard.show = action.payload.show;
                state.modals.superheroCard.hero = action.payload.hero;
            }
        },

        isCUSuperheroModalShown(state, action) {
            state.modals.CUSuperhero.show = action.payload.show;
            state.modals.CUSuperhero.hero = action.payload.hero;
            state.modals.CUSuperhero.mode = action.payload.mode;
        }



    },
    extraReducers: (builder) => {
        // fetchPage
        builder.addCase(fetchPage.fulfilled, (state, action) => {

            state.isLoading = false;
            state.error = '';
            state.pageItems = action.payload.documents;
            state.pageCount = action.payload.pageCount;
            state.currentPage = action.payload.currentPage;

        });
        builder.addCase(fetchPage.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(fetchPage.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        });
    }
})

export default superheroSlice.reducer;
export const { setError, isSuperheroModalShown, isCUSuperheroModalShown } = superheroSlice.actions;
// isCUSuperheroModalShown, isSuperheroModalShown