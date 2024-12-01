import React, { useState } from 'react'

export default function Search() {
    const [first_name, setFirst_name] = useState(null)
    const [id, setId] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            if (id) {
                
            } else {
                alert("אנא הזיני שם או תעודת זהות")
                console.error("אנא הזיני שם או תעודת זהות")
            }
        } catch (error) {
            
        }
    }
  return (
      <div>
          
    </div>
  )
}
