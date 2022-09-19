
import './clientDetails.css';
import Circle from '../../component/PageCircles';
import React, { useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { setImageData, setSaveData } from '../../../store/userInfo';
import UTIL from '../../../common/util';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import RadioGroup from '@mui/material/RadioGroup';



export default function ClientDetails(){

  
    const  { getUser } = useSelector(state => state.userInfo, shallowEqual);
    const location = useLocation();
    const pathNum = UTIL.getPathname(location.pathname);
    const userDetails = UTIL.getUserInfo(getUser, pathNum);
  
    return (
      
        <div id='client-details-container'> 
            <div className='circles'>
                <Circle>
                    <div>1</div>
                </Circle>
                <span className='line'></span>
                <Circle>
                    <div>2</div>
                </Circle>

            </div>
         
            <div className='border-box'>
                <h1> Client Details</h1> 
                {
                    userDetails.map((data, i)=>{
                    
                        return <InputContainer  key ={i} userInfo={data} pathNum={pathNum}/>
                    })
                }
                <div className='input-container next'>

                    <ImageUpload num={pathNum} />
                    <Button variant="contained"  endIcon={<SendIcon />} size="large">
                        <Link to={`/list/${Number(pathNum)}/review`} style={{'textDecoration': 'none'}}> <p> Next </p></Link>
                    </Button>

                </div>
                
            </div>
        </div>
       
    )

}

function InputContainer (props){
   
    const { userInfo } = props;
    
    return (
        <div className='input-container'>

            {
                userInfo.map((data,i)=>{
                   
                    return <InputSection key={i} id={i}  title={data.title} val ={data.data} pathNum={props.pathNum} />

                })
            }

        </div>
    )
}
function InputSection (props){


    const dispatch = useDispatch();
    const [value, setValue] = React.useState('male');
    const inputRef = useRef(null);
    const { getUser} = useSelector(state => state.userInfo, shallowEqual);


    const controlProps = (item) => ({
        checked: props.val === item,
        value: item,
        name: 'size-radio-button-demo',
        inputProps: { 'aria-label': item },
    });
    function loadData(e){

        if ( e.target.value !== '') return
        inputRef.current.value = e.target.name;
    }
    function changeData(e){
      
        const title = e.target.getAttribute('data-title');
        const value = e.target.value;
        const savedData = UTIL.getSave(props.pathNum, getUser, title, value);
       
        dispatch(setSaveData({

            viewSave: Object.assign({}, getUser.viewSave, savedData),

        }));
  
    }


    const handleChange = (event) => {
      
        setValue(event.target.value);

        dispatch(setSaveData({

            viewSave: Object.assign({}, getUser.viewSave, {gender:event.target.value}),

        }));

    };
    return (

        <>
       
            {
                props?.title === 'Gender'?
        
                    <div className='input-section'>
                        <div>{props.title}</div>
                        <div className='radio-box'>

                            <RadioGroup
                               row
                                aria-labelledby="demo-controlled-radio-buttons-group"
                                name="controlled-radio-buttons-group"
                                value={value}
                                onChange={handleChange}
                            >
                                <FormControlLabel value="male" control={<Radio />}  label="Male" />
                                <FormControlLabel value="female" control={<Radio />} label="Female" />
                                <FormControlLabel value="other"  control={<Radio />} label="Other" />
                            </RadioGroup>
                        </div>
                   
                    </div>
                :
                    <div className='input-section'>
                        <div>{props.title}</div>
                        <input type="text" ref={inputRef} defaultValue={ !props.id?props.val:"" } data-title={props.title} name ={ props.val } id={props.id} onChange={changeData} onClick={loadData} />
                    </div>

            }
        </>
       
     
    )
}

function ImageUpload(props) {
  
    let arrayImg = []
    const dispatch = useDispatch();
   
    const [fileImage, setFileImage] = useState("");

    const saveFileImage = (e) => {

        setFileImage(URL.createObjectURL(e.target.files[0]));
        alert('Press upsload button!!')
     
    };

    const upload =()=>{

        arrayImg[0] = fileImage;
        arrayImg[1] = props.num;
    
       
        dispatch(setImageData(arrayImg));
    }

  return (
    <div className='input-section' style={{marginRight:'250px'}}>  
        <div>Profile Picture</div>
        <input name="imgUpload" type="file" accept="image/*" onChange={saveFileImage} />
        <button className='upload' onClick={upload}> Upload! </button>
    </div>
)
}

