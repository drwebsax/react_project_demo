
export const SET_INFOR_LIST = 'user/SET_INFOR_LIST';
export const SET_IMAGE_LIST = 'user/SET_IMAGE_LIST';
export const SET_SAVE_DATA = 'user/SET_SAVE_DATA';
export const SAVE_PROPS = 'SAVE_PROPS';
export const NEW_SAVE_PROPS = 'NEW_SAVE_PROPS';




export const setUserData = (inforValue ) => ({ type: SET_INFOR_LIST, inforValue  });
export const setImageData = (img ) => ({ type: SET_IMAGE_LIST, img  });
export const setSaveData = (dataObj ) => ({ type: SET_SAVE_DATA, dataObj  });
// export function saveProps(obj) {
// 	return {
// 		type:SAVE_PROPS,
// 		data:obj
// 	}
// }
export function saveProps(obj) {
	return {
		type:NEW_SAVE_PROPS,
		data:obj
	}
}


const initialState = {
    userList: {},
    check: true,
    isLoding : true,
    imgList:["imgurl"],
    saveData:{},
};

const initData = {
    getUser : {
		is_save: false,
		isLoding : true,
        imgList:["imgurl"],
        info:{},
        results:[],
        viewSave: {},
		slideIndex: 0,
		viewSetting: {
			goHome: true,
			sliderData: 0,
		}
	}

};

const userInfo = (state = initData, action) => {

    
    let objSet = {};

    switch (action.type) {

        case SET_INFOR_LIST:

     
            let obj = {}
            let addedList =[];
            let listArray = action.inforValue.results;
         
        
            listArray.map((data, i) => {

                let objData = data;
                objData.idx = Number(i);
                addedList.push(objData);

            })
       
            obj.info = action.inforValue.info;
            obj.results = addedList;
            obj.isLoding = false;
           
        
            objSet = Object.assign({}, state.getUser, obj);
           
			return {
				getUser: Object.assign({}, state.getUser, objSet)
			};

        case SET_IMAGE_LIST:

            let imgList = state.getUser.imgList;
         
            imgList[Number(action.img[1])] = action.img[0];

            objSet = Object.assign({}, state.getUser, imgList);
            return {
				getUser: Object.assign({}, state.getUser, objSet)
			};

        case SET_SAVE_DATA:

          
            objSet = Object.assign({}, state.getUser, action.dataObj);
            return {
				getUser: Object.assign({}, state.getUser, objSet)
			};

        case NEW_SAVE_PROPS :
			objSet = Object.assign({}, state.getProps, action.obj);
			return {
				getProps: Object.assign({}, state.getProps, objSet)
			};
       
        default:
            return state;
    }
};

export default userInfo;


export const userData = (state = initData, action) => {

	let obj = {};
	switch (action.type){

		case SAVE_PROPS :
			obj = Object.assign({}, state.getUser, action.data);
			return {
				getUser: Object.assign({}, state.getUser, obj)
			};

		default:
			return {
				getUser: Object.assign({}, state.getUser, obj)
			};
	}
};

