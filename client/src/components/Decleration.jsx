import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import CheckBoxOutlineBlankOutlinedIcon from '@mui/icons-material/CheckBoxOutlineBlankOutlined';
import {  Typography, Box } from '@mui/material';
import logo from '../images/logo_leah_genish.png';

export default function Decleration() {
    const [fetchedData, setFechedData] = useState(null)
    const [signatureUrl, setSignatureUrl] = useState(null)
    const { decId } = useParams()

    async function fetchData() {
        try {
            const res = await fetch(`http://localhost:4040/declerations/decleration/${decId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const data = await res.json()
            console.log(data);
            setFechedData(data[0])
            const imageUrl = URL.createObjectURL(data[0].signature)
            setSignatureUrl(imageUrl)
            console.log(signatureUrl);

        } catch (error) {

        }
    }

    fetchData()
    
    useEffect(() => {
        if (signatureUrl) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setSignatureUrl(reader.result)
            }
            reader.readAsDataURL(signatureUrl)
        } else {
            console.error("have not signature")
      }

      return () => {

      }
    }, [signatureUrl])


    return (
        <div className='form'>
            {
                fetchedData ?
                    (
                        <div>
                            <Box
                                sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#d1b3b5' }}
                            >
                                <img src={logo} alt="logo" />
                                <Typography variant='h6' component='h2'>טופס הצהרת בריאות {fetchedData.first_name} {fetchedData.last_name} </Typography>
                            </Box>
                            <p>תעודת זהות: {fetchedData.id}</p>
                            <p>טלפון: {fetchedData.phone}</p>
                            {Object.keys(fetchedData.health_issues).map((issue) => (
                                <div className='checkboxes-container'>
                                    {fetchedData.health_issues[issue] ? <CheckBoxOutlinedIcon /> : <CheckBoxOutlineBlankOutlinedIcon />}
                                    <p>{issue}</p>
                                </div>
                            ))}
                            <p>תאריך: {fetchedData.date}</p>
                            {/* {signatureUrl && } */}
                            <img src={signatureUrl} alt="" />

                        </div>
                    )
                    :
                    (
                        <h1>טוען...</h1>
                    )
            }
        </div>
    )
}
