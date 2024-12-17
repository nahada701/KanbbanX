import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import icon from '../assets/kSign-removebg-preview.png'
function NavigationBar() {
  return (
    <div>
        <Navbar bg="primary" data-bs-theme="dark">
    <Container>
      
      <Navbar.Brand href="#home"> <img src={icon} alt="" width={"30px"} className='me-3' /> KanbanX</Navbar.Brand>
    
    </Container>
  </Navbar>
    </div>
  )
}

export default NavigationBar

