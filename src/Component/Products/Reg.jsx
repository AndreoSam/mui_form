import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { TextField, Typography,Button } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import{base_url,reg_url} from '../Api/Api_url'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Reg() {

  let api_url = base_url + reg_url
  console.log('api url is:',api_url);

  let navigate = useNavigate()

  const[img,setImg] = useState()

  const [data,setData] = useState({
    fname:'',
    lname:'',
    email:'',
    phone:'',
      errors:{
        fname:'',
        lname:'',
        email:'',
        phone:'',
      }
  })

  const handleChnage=(event)=>{
    let{name,value} = event.target;
    let err = data.errors;
    setData({...data,[name]:value,errors:err})

    switch(name){
      case 'fname':err.fname = value.length < 1 ? 'required' : (value.length < 4 ? 'minimum four character' : '') 
      break;

      case 'lname':err.lname = value.length < 1 ? 'required' : (value.length < 4 ? 'minimum four character' : '') 
      break;

      case 'email':err.email = value.length < 1 ? 'required' : (value.length < 4 ? 'minimum four character' : '') 
      break;

      case 'phone':err.phone = value.length < 1 ? 'required' : (value.length < 4 ? 'minimum four character' : '') 
      break;

      default:
        break
    }

    
  }

  const handleImage=(file)=>{
    const fileReader = new FileReader()
    fileReader.addEventListener('load',()=>{
      setImg(fileReader.result)
    })
    fileReader.readAsDataURL(file)
  }

  const handleSubmit=(event)=>{
    event.preventDefault();
    console.log('submitted data is:',data);

    let user={
      fname:data.fname,
      lname:data.lname,
      email:data.email,
      phone:data.phone,
      My_img:img
    }

    axios.post(api_url,user)
    .then((res)=>{
      console.log('axios response is:',res.data);
      setData(res.data)
      alert('reg form data submitted !')
      navigate('sign')
    })
    .catch((err)=> console.log('axios err is:',err))

  }

  return (
    <>
     <Container maxWidth="sm" sx={{marginTop:'100px'}}>
        <Box sx={{ bgcolor: '#cfe8fc', height: '70vh' }}>

        <br></br><br></br>
        
        <Typography variant='h4'>
            User Registration Form
        </Typography>  

        <br></br>
        

        <form action="" onSubmit={handleSubmit}>

        <TextField label="First Name" name='fname'  sx={{width:'60%',marginBottom:'35px'}} onChange={handleChnage} />
       {data.errors.fname.length > 0 ? <p>** {data.errors.fname}</p> : ''}

        <TextField label="Last Name"  name='lname' sx={{width:'60%',marginBottom:'35px'}} onChange={handleChnage} />
        {/* {data.errors.lname.length > 0 ? <p>** {data.errors.lname}</p> : ''} */}

        <TextField label="User Email" name='email'  sx={{width:'60%',marginBottom:'35px'}} onChange={handleChnage} />
        {/* {data.errors.email.length > 0 ? <p>** {data.errors.email}</p> : ''} */}

        <TextField label="User Contact" name='phone' sx={{width:'60%',marginBottom:'35px'}} onChange={handleChnage} />
        {/* {data.errors.phone.length > 0 ? <p>** {data.errors.phone}</p> : ''} */}

        <input type="file" onChange={(event)=> handleImage(event.target.files[0])}  />

        <br/> <br/>
        <Button type='submit' variant="contained" color='secondary' startIcon={<CloudUploadIcon />}>Submited</Button>

        </form>

        </Box>
      </Container>
    </>
  )
}
