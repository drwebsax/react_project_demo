
export const SET_LOGING_STATUS = 'view/SET_LOGING_STATUS'


export const setLoding = (isLoding ) => ({ type: SET_LOGING_STATUS, isLoding  });


const initialState = {

    loding: false,
}

const commonUtils = (state = initialState, action) => {
  
    switch (action.type) {

        case SET_LOGING_STATUS:
            return { ...state, loding: action.isLoding }
        default:
            return state;
    }
};

export default commonUtils;


