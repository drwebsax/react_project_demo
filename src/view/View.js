import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { setUserData } from '../store/userInfo';
import { CircularProgress } from '@mui/material';
import UTIL  from '../common/util'
import UserContainer from './useContainer/UseContainer'



export default function View() {

    
    const dispatch = useDispatch();
    const { getUser } = useSelector(state => state.userInfo, shallowEqual);
 
 
    function getInfoApi(){

      
        if (!getUser.isLoding) return

        UTIL.apiCall('https://randomuser.me/api/?results=15')
        .then((res)=>{ 
          
            try{
                if ( res?.code === 500 || res?.status === 'fail' ) throw new Error("API error");
                
                dispatch(setUserData(res));
              
            }catch {
                console.log(res?.massage )
            }

        })  
    }
    
    useEffect(()=>{

        getInfoApi();

    },[])

    const { isLoding } = getUser
    return (
        <>
            {
                isLoding?

                    <CircularProgress />

                    :

                    <UserContainer />
            
            }
        
        </>


    )
}

