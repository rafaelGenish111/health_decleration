import React, { useState } from 'react'
import { TextField, Button, Box, Typography } from '@mui/material';
import SearchResults from './SearchResults';
import logo from '../images/logo_leah_genish.png';

export default function Search() {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState([])




  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch('http://localhost:4040/declerations/find', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ searchTerm })
      })
      console.log(res);
      const data = await res.json()
      setSearchResults(data)
      if (data.err) {
        alert(data.msg)
      } 
    } catch (error) {

    }
  }
  return (
    <div className='form'>
      <form onSubmit={handleSubmit}>
      <Box
                sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#d1b3b5' }}
            >
                <img src={logo} alt="logo" />
                <Typography variant='h6' component='h2'>איתור הצהרה</Typography>
            </Box>
        <Box>
          <Box>
            <TextField
              sx={{ margin: '10px' }}
              className='feilds'
              label='הזיני שם / תעודת זהות'
              variant='outlined'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Box>
          <Box>
            <Button type='submit'>בדקי</Button>
          </Box>
        </Box>
      </form>
      {
        searchResults  ?
          (
            <div>
              <SearchResults  data={searchResults} />
            </div>
          ) :
          (
            <h2>אין נתונים</h2>
          )

      }
    </div>
  )
}
