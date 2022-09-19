
import React, { useEffect, useState } from 'react';
import { Route, Routes, Navigate,} from 'react-router-dom';
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import UserList from './userList/UserList';
import ClientDetails from './clientDetails/ClientDetails';
import Review from './review/Review';
import Success from './seccess/Success'



export default function UserContainer (){

    return (

        <Routes>
            
            <Route path="/" element={ <UserList />} />
            <Route path="/:id" element={ <ClientDetails />} />
            <Route path="/:id/review" element={ <Review />} />
            <Route path="/success" element={ <Success />} />
      
        </Routes>
       
    )
}