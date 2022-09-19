
import '../clientDetails/clientDetails.css';
import Circle from '../../component/PageCircles';
import React, { useState} from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector, shallowEqual } from "react-redux";

import UTIL from '../../../common/util';

import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useNavigate } from 'react-router-dom';

export default function Review(){

    
    const { getUser } = useSelector(state => state.userInfo, shallowEqual);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const location = useLocation()

    const pathNum = UTIL.getPathname(location.pathname);
    const userDetails = UTIL.getUserInfo(getUser, pathNum, 1);
   
    const imgUrl = getUser.imgList[Number(pathNum)];
    const navigate = useNavigate();
    
    function handleClick() {
        
        navigate(-1)
    }

    return (
      
        <div id='client-details-container'> 
            <div className='circles'>
                <Circle>
                    <div> V </div>
                </Circle>
                <span className='line'></span>
                <Circle>
                    <div>2</div>
                </Circle>

            </div>
         
            <div className='border-box'>
                <h1> Review </h1> 

                <div className='review-box'>
                    <div>{`${userDetails.name.first} ${userDetails.name.first} from ${userDetails.country}`}</div>
                    <h2>Details</h2>
                    <div>{`Gender : ${userDetails.gender}`}</div>
                    <div>{`Full Address : ${userDetails.street.number} ${userDetails.street.name} ${userDetails.state} ${userDetails.postcode} `}</div>
                    <div>{`Date of Birth : ${UTIL.dateToText(userDetails.dob)}`}</div>
                    <div>{`Email Address: ${userDetails.email}`}</div>
                </div>
                <img
                    alt="sample"
                    src={imgUrl}
                    style={{ margin: "auto" }}
                />
         

                <div className='review-submit add'>

                  
                    <Button variant="contained" size="large" onClick={handleOpen}>
                        <p> Submit </p>
                    </Button>
                   

                </div>
                <div className='back'>
                    <Button variant="outlined" onClick={handleClick} >
                        go Back
                    </Button>
                </div>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h1">
                            <h3 className='modal-text'>Are You Sure you want to submit?</h3>
                            <b id="xButton" onClick={handleClose}>X</b> 
                            <Button variant="contained" id ="first" size="large" onClick={handleOpen}>
                                <Link to={`/list/success`} style={{'textDecoration': 'none'}}> <p> Yes </p></Link>
                            </Button>
                            <Button variant="outlined" id ="second" onClick={handleClose}>
                                Dismiss
                            </Button>
                           
                        </Typography>
                    </Box>
                </Modal>

                
            </div>
        </div>
       
    )

}

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    height:200,
    bgcolor: 'background.paper',
    border: '0px solid #000',
    boxShadow: 24,
    p: 4,
    borderRadius: '20px'
};
