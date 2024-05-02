

import React, { useEffect, useState } from 'react'
import { ori_base_url, profile_endpoint } from '../Api/Api_url'
import axios from 'axios';


export default function Profile() {

    let api_url = ori_base_url + profile_endpoint
    console.log('api url is:',api_url);

    const [data,setData] = useState({
        fname:'',
        lname:'',
        email:'',
        image:''
    })


    const token =  window.sessionStorage.getItem("token")

    useEffect(()=>{
        axios.get(api_url,{

            headers: {
                "x-access-token": token,
                "Content-Type": "application/x-www-form-urlencoded",
                "Access-Control-Allow-Origin": "*",
              }
        })

        .then((res)=>{
            // console.log('axios profile page response is:',res.data);
            if(res.data.status == 200){
                let folder_path = "uploads/user/profile_pic/";
                let img_path = ori_base_url + folder_path + res.data.data.profile_pic;
                // console.log(img_path);
                setData({...data,
                fname:res.data.data.first_name,
                lname:res.data.data.last_name,
                email:res.data.data.email,
                image:img_path
            })
            }
        })
        .catch((err)=> console.log('axios profile page err is:',err))
    })

  return (
    <>
    <h4>{data.fname}</h4>
    <img src={data.image} alt="profile_pic" />
    </>
  )
}
