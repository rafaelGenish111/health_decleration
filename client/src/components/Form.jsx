import React, { useRef, useState } from 'react'
import { TextField, Checkbox, Button, FormControlLabel } from '@mui/material';
import SignatureCanvas from 'react-signature-canvas'


export default function Form() {
    const [id, setId] = useState(null)
    const [first_name, setFirst_name] = useState(null)
    const [last_name, setLast_name] = useState(null)
    const [phone, setPhone] = useState(null)
    const [health_issues, setHealth_issues] = useState({
        לחץ_דם: false,
        אסתמה: false,
        פסוריאזיס: false
    })
    const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
    const [signature, setSignature] = useState(null)
    const sigPad = useRef(null)

    const clearSignature = () => {
        sigPad.current.clear()
        setSignature(null)
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
                key={issue}
                control={
                    <Checkbox
                        name={issue}
                        checked={health_issues[issue]}
                        onChange={handleCheckboxChange}
                    />
                }
                label={issue}
            />
        ));
    };

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
                    body: JSON.stringify({ id, first_name, last_name, phone, health_issues, date, signature })
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
        <form onSubmit={handleSubmit}>
            <p>{date}</p>
            <div>

            <p>תעודת זהות</p>
            <TextField
                label='תעודת זהות'
                variant='outlined'
                value={id}
                onChange={(e) => setId(e.target.value)}
                error={!validateID(id)}
                helperText={!validateID(id) ? 'תעודת זהות לא תקינה' : ''}
                />
            </div>
            <div>
                <p>שם פרטי</p>
            <TextField
                label='שם פרטי'
                variant='outlined'
                value={first_name}
                onChange={(e) => setFirst_name(e.target.value)}
                />
                </div>
            <TextField
                label='שם משפחה'
                variant='outlined'
                value={last_name}
                onChange={(e) => setLast_name(e.target.value)}
            />
            <TextField
                label='טלפון'
                variant='outlined'
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
            />
            <div>
                {createCheckboxes()}
            </div>
            <div className='signature-container'>
                <SignatureCanvas
                    ref={sigPad}
                    onEnd={handleSignatureChange}
                    penColor='red'
                    canvasProps={{width: 500, height: 200, className: 'sigCanvas'}}                   
                    className='signature-pad'
                />
                <Button type='button' onClick={clearSignature}>נקה חתימה</Button>
            </div>
            <Button
                type='submit'
            >אישור</Button>
        </form>
    )
}
