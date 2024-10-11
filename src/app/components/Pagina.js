'use client'
import { Container, Nav, Navbar } from "react-bootstrap";

export default function Pagina(props){
    return(
         <>
        <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">VoeMais</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/empresas">Empresas</Nav.Link>
          </Nav>

          <Nav className="me-auto">
            <Nav.Link href="/aeroporto">Aeroportos</Nav.Link>
          </Nav>
          <Nav className="me-auto">
            <Nav.Link href="/voos">Voos</Nav.Link>
          </Nav>
          <Nav className="me-auto">
            <Nav.Link href="/passageiros">Passageiros</Nav.Link>
          </Nav>
          <Nav className="me-auto">
            <Nav.Link href="/passagens">Passagens</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <div className="bg-secondary text-white text-center p-3">
        <h1>{props.titulo}</h1>
      </div>
      <Container>
        {props.children}
      </Container>
    </>
    
    )
  }