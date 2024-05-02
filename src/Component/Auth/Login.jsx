

import React from 'react'
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { TextField, Typography,Button } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import { ori_base_url,log_endpoint } from '../Api/Api_url';
import axios from 'axios';
import { useState } from 'react';
export default function Login() {

 let api_url = ori_base_url + log_endpoint;
 console.log('api url is:',api_url);

 const [data,setData] = useState({
    email:'',
    password:'',
     errors:{
        email:'',
        password:''
     }
 })

 const handleChange=(event)=>{
    let {name,value} = event.target;
    let err = data.errors;

    switch(name){
      case 'email':err.email = value.length < 1 ? 'required' : (value.length < 4 ? 'minimum four character' : '') 
      break;

      case 'password':err.password = value.length < 1 ? 'required' : (value.length < 4 ? 'minimum four character' : '') 
      break;

      default:
        break;
    }

    setData({...data,[name]:value,errors:err})
 }

 const handleSubmit=(event)=>{
    event.preventDefault();
    console.log('submitted sing-in data is:',data);

    let formData = new FormData()
    formData.append('email',data.email)
    formData.append('password',data.password)

    axios.post(api_url,formData,{
        headers:{
            "Content-Type": "application/form-data",
            "Access-Control-Allow-Origin":"*",
        },
    })
    .then((res)=>{
        console.log('axios sign-in data is:',res);
        setData(res.data);
        if(res.data.status == 200){
            window.sessionStorage.setItem('token',res.data.token)
        }
        else{
            alert('login not done')
        }
        
    })
    .catch((err)=> console.log('axios err is:',err))

    }

    
    
  return (
    <>

    <Container maxWidth="sm" sx={{marginTop:'100px'}}>
        <Box sx={{ bgcolor: '#cfe8fc', height: '60vh' }}>

        <br></br><br></br>
        
        <Typography variant='h4'>
            User Login Form
        </Typography>  

        <br></br>
        
        <form action="" onSubmit={handleSubmit}>

        <TextField label="User Email" name='email'  sx={{width:'60%',marginBottom:'35px'}} onChange={handleChange}  />
        {data.errors?.email?.length > 0 ? <p>** {data.errors.email}</p> : ''}

        <TextField label="Usser Password"  name='password' sx={{width:'60%',marginBottom:'35px'}} onChange={handleChange}  />
        {data.errors?.password?.length > 0 ? <p>** {data.errors.password}</p> : ''}


        <br/> <br/>
        <Button type='submit' variant="contained" color='secondary' startIcon={<CloudUploadIcon />}>Submited</Button>

        </form>

        </Box>
      </Container>
    </>
  )
}
