const inputReducers = (state = {
    homeUsername: '',
    homePassword: '',
    homeUsernameLabelClass: '',
    homePasswordLabelClass: '',
    signUpName: '',
    signUpUsername: '',
    signUpEmail: '',
    signUpNumber: '',
    signUpPassword: '',
    signUpConfirmPassword: '',
    signUpNameLabel: '',
    signUpUsernameLabel: '',
    signUpEmailLabel: '',
    signUpNumberLabel: '',
    signUpPasswordLabel: '',
    signUpConfirmPasswordLabel: '',
    signUpErrorMessage: '',
    chatMessage: '',
    chatSearch: ''
}, action) => {
    switch (action.type) {
        case "HOME_USERNAME_CHANGE" :
            state = {
                ...state,
                homeUsername: action.payload
            };
            break;
        case "HOME_PASSWORD_CHANGE":
            state = {
                ...state,
                homePassword: action.payload
            };
            break;
        case "HOME_USERNAME_LABEL_CHANGE":
            state = {
                ...state,
                homeUsernameLabelClass: action.payload
            };
            break;
        case "HOME_PASSWORD_LABEL_CHANGE":
            state = {
                ...state,
                homePasswordLabelClass: action.payload
            };
            break;
        case "SIGN_UP_NAME_CHANGE":
            state = {
                ...state,
                signUpName: action.payload
            };
            break;
        case "SIGN_UP_EMAIL_CHANGE":
            state = {
                ...state,
                signUpEmail: action.payload
            };
            break;
        case "SIGN_UP_USERNAME_CHANGE":
            state = {
                ...state,
                signUpUsername: action.payload
            };
            break;
        case "SIGN_UP_NUMBER_CHANGE":
            state = {
                ...state,
                signUpNumber: action.payload
            };
            break;
        case "SIGN_UP_PASSWORD_CHANGE":
            state = {
                ...state,
                signUpPassword: action.payload
            };
            break;
        case "SIGN_UP_CONFIRM_PASSWORD_CHANGE":
            state = {
                ...state,
                signUpConfirmPassword: action.payload
            };
            break;
        case "SIGN_UP_NAME_LABEL_CHANGE":
            state = {
                ...state,
                signUpNameLabel: action.payload
            };
            break;
        case "SIGN_UP_EMAIL_LABEL_CHANGE":
            state = {
                ...state,
                signUpEmailLabel: action.payload
            };
            break;
        case "SIGN_UP_USERNAME_LABEL_CHANGE":
            state = {
                ...state,
                signUpUsernameLabel: action.payload
            };
            break;
        case "SIGN_UP_NUMBER_LABEL_CHANGE":
            state = {
                ...state,
                signUpNumberLabel: action.payload
            };
            break;
        case "SIGN_UP_PASSWORD_LABEL_CHANGE":
            state = {
                ...state,
                signUpPasswordLabel: action.payload
            };
            break;
        case "SIGN_UP_CONFIRM_PASSWORD_LABEL_CHANGE":
            state = {
                ...state,
                signUpConfirmPasswordLabel: action.payload
            };
            break;
        case 'SIGN_UP_ERROR_MESSAGE_CHANGE':
            state = {
                ...state,
                signUpErrorMessage: action.payload
            };
            break;
        case 'SIGN_UP_INPUT_CLEAR':
            state = {
                ...state,
                signUpUsername: '',
                signUpName: '',
                signUpEmail: '',
                signUpNumber: '',
                signUpPassword: '',
                signUpConfirmPassword: ''
            };
            break;
        case 'CHAT_MESSAGE_CHANGE':
            state = {
                ...state,
                chatMessage: action.payload
            };
            break;
        case 'CONTACT_SEARCH_CHANGE':
            state = {
                ...state,
                chatSearch: action.payload
            };
            break;
    }
    return state;
};

export default inputReducers;
