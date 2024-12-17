import React from 'react'
import {useState} from 'react'
import { addCardApi } from '../Services/apicalls';


function AddCard({setNewCardResponse}) {
    const [title,setTitle]=useState('')
     const addCard=async()=>{
        if(title.trim()==""){
            alert("please enter a card title")
            return
        }
        try{
            const response=await addCardApi({title,tasks:[]})
            setNewCardResponse(response.data)
            setTitle("")
            getCard()
        }
        catch(err){
            console.log(err);
        }
      
       
    }
  return (
    <div>
        <input  className='m-4 addcard-inp' value={title} type="text" onChange={e=>setTitle(e.target.value)} />
        <button className=' buton' onClick={addCard}>+</button>
       
    </div>
  )
}

export default AddCard