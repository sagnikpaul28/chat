const userDataReducers = (state = {
    userData: null
}, action) => {
    switch(action.type) {
        case "SAVE_USER_DATA":
            state = {
                ...state,
                userData: action.payload
            }
    }
    return state;
};

export default userDataReducers;
