

import { useSelector, shallowEqual } from "react-redux";
import * as React from 'react';
import { Link } from 'react-router-dom';
import './userList.css';
import UTIL  from '../../../common/util';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


import TablePagination from '@mui/material/TablePagination';
import TableFooter from '@mui/material/TableFooter';

import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';

import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';

import Tooltip from '@mui/material/Tooltip';





export default function UserList(){
    
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const userInfo = useSelector(state => state.userInfo, shallowEqual);
    const handleChangePage = ( event, newPage) => {
      
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    function TablePaginationActions(props) {
        const theme = useTheme();
        const { count, page, rowsPerPage, onPageChange } = props;
      
        const handleFirstPageButtonClick = (event) => {
          onPageChange(event, 0);
        };
      
        const handleBackButtonClick = (event) => {
          onPageChange(event, page - 1);
        };
      
        const handleNextButtonClick = (event) => {
          onPageChange(event, page + 1);
        };
      
        const handleLastPageButtonClick = (event) => {
          onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
        };
      
        return (
            <Box sx={{ flexShrink: 0, ml: 2.5 }}>
                <IconButton
                    onClick={handleFirstPageButtonClick}
                    disabled={page === 0}
                    aria-label="first page"
                >
                    {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
                </IconButton>
                <IconButton
                    onClick={handleBackButtonClick}
                    disabled={page === 0}
                    aria-label="previous page"
                >
                    {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                </IconButton>
                <IconButton
                    onClick={handleNextButtonClick}
                    disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                    aria-label="next page"
                >
                    {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                </IconButton>
                <IconButton
                    onClick={handleLastPageButtonClick}
                    disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                    aria-label="last page"
                >
                    {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
                </IconButton>
            </Box>
        );
    }
  

    const { getUser } = userInfo;
    const resultList = getUser.results;

    return (

        <div className='user-list-container'>
            <h1> Users</h1>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead >
                        <TableRow className='table-head'>
                            <TableCell>name</TableCell>
                            <TableCell>DOB</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Gender</TableCell>
                        </TableRow>
                    </TableHead>
                        <TableBody>

                            {
                                (rowsPerPage > 0
                                    ? resultList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    : resultList
                                ).map((row, i) => {

                                    const { name, dob, email, gender, idx } = row;
                                    const userName = name.first + " " + name.last;
                                    const dobDate = dob.date;
                                    const emailData = email;
                                    const genderData = gender;
                                    const alteredDob = UTIL.dateToText(dobDate);
                                    const trId = `tr_${i}`;
                                    const nameId = `name_${i}_0`;
                                    const emailId = `email_${i}_2`;
                                    const emailClss = `class_email_${i}_2`;
                                  
                                    return (
                                        <TableRow id ={trId} key={i}>
                            
                                            <TableCell id = {nameId} name={Number(idx)} >
                                                <Link to={`/list/${Number(idx)}`} style={{'textDecoration': 'none'}}> {userName}</Link>
                                            </TableCell>
                                            <TableCell>{alteredDob}</TableCell>
                                            <Tooltip title={<span style={{ fontSize: "15px" }}>{emailData} </span>}     placement="top-start">
                                                <TableCell className={emailClss} id={emailId}>
                                                    <div>{emailData}</div>
                                                </TableCell>
                                            </Tooltip>
                                            
                                            <TableCell>{genderData}</TableCell>
                                
                                        </TableRow>
                                    )

                                })
                            }

                        </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[5, 7, { label: 'All', value: -1 }]}
                                colSpan={3}
                                count={resultList.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                SelectProps={{
                                    inputProps: {
                                    'aria-label': 'rows per page',
                                    },
                                    native: true,
                                }}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                                ActionsComponent={TablePaginationActions}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        </div>
      );

}