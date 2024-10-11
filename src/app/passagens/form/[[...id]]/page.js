'use client'

import Pagina from "@/app/components/Pagina";
import { Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { FaCheck } from "react-icons/fa";
import { MdOutlineArrowBack } from "react-icons/md";
import { v4 } from "uuid";

export default function Page({ params }) {

    const route = useRouter()

    const passagens = JSON.parse(localStorage.getItem('passagens')) || []
    const dados = passagens.find(item => item.id == params.id)

    const [passageiro, setPassageiros] = useState([])
    const [voos, setVoos]= useState([])


    useEffect(() => {
        setPassageiros(JSON.parse(localStorage.getItem('passageiros')) || [])
        setVoos(JSON.parse(localStorage.getItem('voos')) || [])
    }, [])

    function salvar(dados) {

        if (passagens.id) {
            Object.assign(passagens, dados)
        } else {
            dados.id = v4()
            passagens.push(dados)
        }

        localStorage.setItem('passagens', JSON.stringify(passagens))
        return route.push('/passagens')
    }

    return (
        <Pagina titulo="Passagens">

            <Formik
                initialValues={passagens}
                onSubmit={values => salvar(values)}
            >
                {({
                    values,
                    handleChange,
                    handleSubmit,
                }) => (
                    <Form>
                        <Form.Group className="mb-3" controlId="Passageiro">
                            <Form.Label>Passageiro</Form.Label>
                            <Form.Select
                                name="Passageiro"
                                value={values.passageiro}
                                onChange={handleChange('Passageiro')}
                            >
                                <option value=''>Selecione</option>
                                {passageiro.map(item => (
                                    <option key={item.sigla} value={item.sigla}>
                                        {item.sigla} - {item.nome}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="Voo">
                            <Form.Label>Voo</Form.Label>
                            <Form.Select
                                name="Voo"
                                value={values.voos}
                                onChange={handleChange('Voo')}
                            >
                                <option value=''>Selecione</option>
                                {voos.map(item => (
                                    <option key={item.nome} value={item.nome}>
                                        {item.nome}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                        
                        
                        <Form.Group className="mb-3" controlId="preco">
                            <Form.Label>Preço</Form.Label>
                            <Form.Control
                                type="text"
                                name="preco"
                                value={values.preco}
                                onChange={handleChange('preco')}
                            />
                        </Form.Group>
                     
                        <div className="text-center">
                            <Button onClick={handleSubmit} variant="success">
                                <FaCheck /> Salvar
                            </Button>
                            <Link
                                href="/passagens"
                                className="btn btn-danger ms-2"
                            >
                                <MdOutlineArrowBack /> Voltar
                            </Link>
                        </div>
                    </Form>
                )}
            </Formik>
        </Pagina>
    )
}