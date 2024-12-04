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

    // async function fetchData() {
    //     try {
    //         const res = await fetch(`http://localhost:4040/declerations/decleration/${decId}`, {
    //             method: 'GET',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             }
    //         })
    //         const data = await res.json()
    //         setFormData(data[0])
    //     } catch (error) {

    //     }
    // }

    useEffect(() => {
        const fetchData = async () => {
          try {
            const res = await fetch(`http://localhost:4040/declerations/decleration/${decId}`, {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        })
            const data = await res.json();
            setFormData(data);
    
            // בדיקה והמרה של החתימה
            if (data.signature && data.signature.data) {
              const reader = new FileReader();
              reader.onloadend = () => {
                setSignatureUrl(reader.result);
              };
              // התאם את השורה הבאה לפי סוג הנתונים ב-data.signature.data
              reader.readAsDataURL(data.signature.data); // מניח שזה Blob או ArrayBuffer
            }
          } catch (error) {
            console.error(error);
          }
        };
        fetchData();
      }, [decId]);

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
                            {/* {signatureUrl && } */}
                            <img className='sign-img' src={signatureUrl} alt="" />

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
