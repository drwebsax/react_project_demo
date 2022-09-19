
const UTIL ={

    apiCall : (url) => {

        const setUrl = url;
   
        return fetch(setUrl).then((res)=> {
    
            if ( res.ok ) return res.json(res)
            
            throw new Error("API error");
    
        }).then( (returnData) => returnData ).catch((err)=>{
    
            return { status : "fail", code : 500,  massage : err }
        })   

    },
    dateToText : (date) => {

        let getDate = date;
        let getNum = [];

        let monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        getDate = getDate.split(/T/g);
        getNum = getDate[0].split(/-/g);


        return getNum[2] + ' ' + monthNames[Number(getNum[1])] + ' ' + getNum[0]

    },
    getPathname : (pathname) => {

        const path = pathname;

        const pathId = path.split('/');
       
        return pathId[2]

    },
    getUserInfo : (info, num, isNum) => {
     
        const user = info.results;
        const userDetail = user[Number(num)];
        const dob = userDetail.dob.date.split(/T/g);
        let infoDetail = {};
        let dataList = [];


        infoDetail.name = userDetail.name;
        infoDetail.email = userDetail.email;
        infoDetail.gender = userDetail.gender;
        infoDetail.dob = dob[0];
        infoDetail.street = userDetail.location.street;
        infoDetail.city = userDetail.location.city;
        infoDetail.state = userDetail.location.state;
        infoDetail.postcode = userDetail.location.postcode;
        infoDetail.country = userDetail.location.country;

        dataList= [
            [
                {title:'First Name', data:infoDetail.name.first }, 
                {title:'Adress(Street Number, Street Name)', data:infoDetail.street.number + "," + infoDetail.street.name }
            ],
            [
                {title:'Last Name', data:infoDetail.name.last }, 
                {title:'City', data:infoDetail.city }
            ],
            [
                {title:'Email Adress', data:infoDetail.email }, 
                {title:'State', data:infoDetail.state }
            ],
            [
                {title:'Gender', data:infoDetail.gender }, 
                {title:'Post Code', data:infoDetail.postcode }
            ],
            [
                {title:'Date of Birth(YYYY-MM-DD)', data:infoDetail.dob }, 
                {title:'Contry', data:infoDetail.country }
            ],

        ]
        
        if (isNum) return infoDetail
       

        return dataList
    },
    getSave : (pathNum, userInfo, title, value) => {

  
        let returnObj= {};
        let locationObj= {};
        let streetObj= {};
        let dobObj= {};
        let nameObj= {};
        let setNumber = 0;


        const userData = userInfo.viewSave?userInfo.results[Number(pathNum)]:userInfo.viewSave;
        const pureData = userData;
      
        if (title.indexOf("Street") > -1) {
            setNumber = 1;
        } else if ((title.indexOf("Email") > -1)){
            setNumber = 2;
        }else if ((title.indexOf("First") > -1)){
            setNumber = 3;
        }else if ((title.indexOf("Last") > -1)){
            setNumber = 4;
        }else if ((title.indexOf("Gender") > -1)){
            setNumber = 5;
        }else if ((title.indexOf("City") > -1)){
            setNumber = 6;
        }else if ((title.indexOf("State") > -1)){
            setNumber = 7;
        }else if ((title.indexOf("Code") > -1)){
            setNumber = 8;
        }else if ((title.indexOf("Date") > -1)){
            setNumber = 9;
        }else if ((title.indexOf("Contry") > -1)){
            setNumber = 10;
        }

    
        switch (setNumber) {
            case 1:

                const splitValue = value.split(',');
                streetObj.number = splitValue[0];
                streetObj.name = splitValue[1];

                locationObj = {...pureData.location, street : streetObj }
                returnObj = {...pureData, location : locationObj}

                break;
        
            case 2:

                returnObj = { email : value}
                break;
            case 3:

                nameObj = {...pureData.name, first : value }
                returnObj = {...pureData, name : nameObj}

                break;
            case 4:

                nameObj = {...pureData.name, last : value }
                returnObj = {...pureData, name : nameObj}
                break;
            case 5:

                returnObj = { gender : value}
                break
            case 6:

                locationObj = {...pureData.location, city : value }
                returnObj = {...pureData, location : locationObj}
                break;
            case 7:

                locationObj = {...pureData.location, state : value }
                returnObj = {...pureData, location : locationObj}
                break;
            case 8:

                locationObj = {...pureData.location, postcode : value }
                returnObj = {...pureData, location : locationObj}
                break;
            case 9:

                dobObj = {...pureData.dob, date : value }
                returnObj = {...pureData, dob : dobObj}
               
                break;
            case 10:
              
                locationObj = {...pureData.location, country : value }
                returnObj = {...pureData, location : locationObj}
                break;
            default:
            // do nothing
        }

        console.log('----->',returnObj);
        return returnObj
       

    },

}

export default UTIL