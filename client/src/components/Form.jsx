import React, { useRef, useState } from 'react'
import { TextField, Checkbox, Button, FormControlLabel, Typography, Box } from '@mui/material';
import SignatureCanvas from 'react-signature-canvas'
import logo from '../images/logo_leah_genish.png';


export default function Form() {
    const [id, setId] = useState(null)
    const [first_name, setFirst_name] = useState(null)
    const [last_name, setLast_name] = useState(null)
    const [phone, setPhone] = useState(null)
    const [health_issues, setHealth_issues] = useState({
        בעיות_גב: false,
        כאבי_שרירים: false,
        מחלות_פרקים: false,
        דלקת_לימפה: false,
        סינוסים: false,
        הפרעות_שינה: false,
        סרטן: false,
        סוכרת: false,
        הפרעות_עיכול: false,
        לחץ_דם: false,
        אסתמה: false,
        פסוריאזיס: false
    })
    const [decleration_date] = useState(new Date().toISOString().slice(0, 10));
    const [signature, setSignature] = useState(null)
    const sigPad = useRef(null)

    function formatDiseaseName(diseaseName) {
        return diseaseName.replace('_', ' ')
    }
    
    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
        setHealth_issues((prevIssues) => ({
            ...prevIssues,
            [name]: checked,
        }));
    };
    
    const createCheckboxes = () => {
        return Object.keys(health_issues).map((issue) => (
            <FormControlLabel
                className='checkbox-container'
            key={issue}
            control={
                <Checkbox
                name={issue}
                checked={health_issues[issue]}
                onChange={handleCheckboxChange}
                />
            }
            label={formatDiseaseName(issue)}
            />
        ));
    };
    
    const clearSignature = () => {
        sigPad.current.clear()
        setSignature(null)
    }

    function validateID(id) {
        if (typeof id !== 'string') {
            return false;
        }

        id = id.trim();

        if (id.length !== 9) {
            return false;
        }

        return /^\d{9}$/.test(id);
    }

    const handleSignatureChange = () => {
        setSignature(sigPad.current.toDataURL());
    };

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            if (validateID(id)) {

                const res = await fetch('http://localhost:4040/declerations/new', {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ id, first_name, last_name, phone, health_issues, decleration_date, signature })
                })
                const data = await res.json();
                if (data.err === false) {
                    alert(`${first_name}, הטופס שלך נקלט בהצלחה!`)
                    console.log('Success:', data);

                } else {
                    if (data.msg.code === 'ER_BAD_NULL_ERROR') {
                        alert("הפרטים שהזנת אינם תקינים")
                    } else {
                        alert('המידע לא נקלט. נסי שנית')
                        console.log('failed:', data);
                    }
                }
            } else {
                alert('תעודת זהות אינה תקינה')
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }
    return (
        // link to other page after sending
        <form onSubmit={handleSubmit} className='form'>
            <Box
                sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#d1b3b5' }}
            >
                <img src={logo} alt="logo" />
                <Typography variant='h6' component='h2'>טופס הצהרת בריאות </Typography>
            </Box>
            <Box className='fields-container'>
                <Box className='feilds'>
                    <TextField
                        sx={{ margin: '10px' }}
                        className='textField'
                        label='תעודת זהות'
                        variant='outlined'
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                        error={!validateID(id)}
                        helperText={!validateID(id) ? 'תעודת זהות לא תקינה' : ''}
                    />
                </Box>
                <Box className='feilds'>
                    <TextField
                        sx={{ margin: '10px' }}
                        className='textField'
                        label='שם פרטי'
                        variant='outlined'
                        value={first_name}
                        onChange={(e) => setFirst_name(e.target.value)}
                    />
                </Box>
                <Box className='feilds'>
                    <TextField
                        sx={{ margin: '10px' }}
                        className='textField'
                        label='שם משפחה'
                        variant='outlined'
                        value={last_name}
                        onChange={(e) => setLast_name(e.target.value)}
                    />
                </Box>

                <TextField
                    sx={{ margin: '10px' }}
                    className='textField'
                    label='טלפון'
                    variant='outlined'
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />
            </Box>
                <p>סמני את התאים הרלוונטיים</p>
            <Box className='checkboxes-container'>
                {createCheckboxes()}
            </Box>
            <Box className='signature-container'>
                <SignatureCanvas
                    ref={sigPad}
                    onEnd={handleSignatureChange}
                    penColor='red'
                    canvasProps={{ width: 500, height: 200, className: 'sigCanvas' }}
                    className='signature-pad'
                />
                <Button type='button' onClick={clearSignature}>נקה חתימה</Button>
            </Box>
            <Button
                type='submit'
            >אישור</Button>
        </form>
    )
}
