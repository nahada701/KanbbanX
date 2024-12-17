import React,{useState} from 'react'
import AddCard from './components/AddCard'
import NavigationBar from './components/NavigationBar'
import View from './components/View'


function Home() {
  const [newCardResponse,setNewCardResponse]=useState()
  return (
    <>
    <NavigationBar/>
    <AddCard setNewCardResponse={setNewCardResponse} />
    <View newCardResponse={newCardResponse}/>
    </>
  )
}

export default Home