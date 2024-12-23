import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import CheckBoxOutlineBlankOutlinedIcon from '@mui/icons-material/CheckBoxOutlineBlankOutlined';
import {  Typography, Box } from '@mui/material';
import logo from '../images/logo_leah_genish.png';

export default function Decleration() {
    const [formData, setFormData] = useState(null)
    const [signatureUrl, setSignatureUrl] = useState(null)
    const { decId } = useParams()

    useEffect(() => {
        const fetchData = async () => {
             try {
                 const res = await fetch(`http://localhost:4040/declerations/decleration/${decId}`, {
                     method: 'GET',
                     headers: {
                         'Content-Type': 'application/json'
                     }
                 })
                 const data = await res.json()
                 console.log(data);
                 setFormData(data[0])
                 if (data[0].signature && data[0].signature.data) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      setSignatureUrl(reader.result);
                    };
                    reader.readAsDataURL(data[0].signature.data); 
                 } else {
                     console.log("have'nt signature");
                  }
     
             } catch (error) {
     console.error(error)
             }
         }
         fetchData()
      return () => {
        
      }
    }, [decId])
    
    return (
        <div className='form'>
            {
                formData ?
                    (
                        <div>
                            <Box
                                sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#d1b3b5' }}
                            >
                                <img src={logo} alt="logo" />
                                <Typography variant='h6' component='h2'>טופס הצהרת בריאות {formData.first_name} {formData.last_name} </Typography>
                            </Box>
                            <p>תעודת זהות: {formData.id}</p>
                            <p>טלפון: {formData.phone}</p>
                            {Object.keys(formData.health_issues).map((issue) => (
                                <div className='checkboxes-container'
                                key={issue}
                                >
                                    {formData.health_issues[issue] ? <CheckBoxOutlinedIcon /> : <CheckBoxOutlineBlankOutlinedIcon />}
                                    <p>{issue}</p>
                                </div>
                            ))}
                            <p>תאריך: {formData.date}</p>
                            <img src={signatureUrl} alt="" />

                        </div>
                    )
                    :
                    (
                        <h1>...טוען</h1>
                    )
            }
        </div>
    )
}