'use client';

import Pagina from "@/app/components/Pagina";
import { Formik } from "formik";
import Link from "next/link";
import { Button, Form } from "react-bootstrap";
import { FaCheck } from "react-icons/fa";
import { IoChevronBack } from "react-icons/io5";

export default function Page(){
    function salvar(dados){
        console.log(dados)
    }


    return(
        <Pagina titulo ="empresa">
            <Formik
            initialValues={{ nome: '', logo: '' }}
            onSubmit={values=>salvar(values)}
            >
            {({
                values,
                handleChange,
                handleSubmit,
            }) => (

           


        <Form>
            <Form.Group className="mb-3" controlId="nome">
            <Form.Label>Nome</Form.Label>
            <Form.Control 
                type="nome" 
                name="nome"
                value={values.nome}
                onChange={handleChange('nome')}
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="logo">
            <Form.Label>Logo</Form.Label>
            <Form.Control 
                type="nome" 
                name="logo"
                value={values.logo}
                onChange={handleChange('logo')}
                />
            </Form.Group>
            <div className="text-center">
                <Button onClick={handleSubmit} variant="success">
                    <FaCheck></FaCheck>salvar
                </Button>
                <Link href="/empresas"className="btn btn-danger ms-2">
                    <IoChevronBack></IoChevronBack>Voltar</Link>

            </div>


        </Form>
         )}
         </Formik>

        </Pagina>
    )
}
