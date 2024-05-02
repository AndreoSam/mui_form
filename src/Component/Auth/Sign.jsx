

import React from 'react'
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { TextField, Typography,Button } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import { ori_base_url,reg_endpoint } from '../Api/Api_url';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Sign() {

    let api_url = ori_base_url + reg_endpoint;
    console.log('api url is:',api_url);

    let navigate = useNavigate()
  
    const[img,setImg] = useState()
  
    const [data,setData] = useState({
      fname:'',
      lname:'',
      email:'',
      password:''
    })

    const handleChnage=(event)=>{
        let{name,value} = event.target;
        setData({...data,[name]:value})
    }

    const handleImage=(file)=>{
        const fileReader = new FileReader()
        fileReader.addEventListener('load',()=>{
          setImg(fileReader.result)
        })
        fileReader.readAsDataURL(file)
    }

    const handleSubmit = (event)=>{
        event.preventDefault();
        console.log('submitted form data is',data,img);
    
        let formData = new FormData()
        formData.append('first_name',data.fname)
        formData.append('last_name',data.lname)
        formData.append('email',data.email)
        formData.append('password',data.password)
        formData.append('profile_pic',img)
    
    
        // let user ={
        //     firstname: data.firstname,
        //     lastname: data.lastname,
        //     email: data.email,
        //     password: data.password,
        //     myImg:img
        // }
    
        axios.post(api_url,formData,{
            headers:{
                "Content-Type": "application/form-data",
                "Access-Control-Allow-Origin":"*",
            },
        })
        .then((res)=>{
            console.log('axios sign-in data is:',res);
            setData(res.data);
            // navigate('/')
        })
        .catch((err)=> console.log('axios err is:',err))
    }

  return (
    <>
    <Container maxWidth="sm" sx={{marginTop:'100px'}}>
        <Box sx={{ bgcolor: '#cfe8fc', height: '70vh' }}>

        <br></br><br></br>
        
        <Typography variant='h4'>
            User Sign-in Form
        </Typography>  

        <br></br>
        

        <form action="" onSubmit={handleSubmit}>

        <TextField label="First Name" name='fname'  sx={{width:'60%',marginBottom:'35px'}} onChange={handleChnage} />

        <TextField label="Last Name" name='lname'  sx={{width:'60%',marginBottom:'35px'}} onChange={handleChnage} />

        <TextField label="User Email" name='email'  sx={{width:'60%',marginBottom:'35px'}} onChange={handleChnage} />

        <TextField label="User Password" name='password'  sx={{width:'60%',marginBottom:'35px'}} onChange={handleChnage} />
     
        <input type="file" onChange={(event)=> handleImage(event.target.files[0])}  />

        <br/> <br/>
        <Button type='submit' variant="contained" color='secondary' startIcon={<CloudUploadIcon />}>Submited</Button>

        </form>

        </Box>
      </Container>
    </>
  )
}
