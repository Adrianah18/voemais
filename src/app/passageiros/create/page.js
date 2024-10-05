'use client'

import Pagina from "@/components/Pagina";
import { Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, Col, Form, Row } from "react-bootstrap";
import { FaCheck } from "react-icons/fa";
import { MdOutlineArrowBack } from "react-icons/md";
import { v4 as uuidv4 } from 'uuid';  // Adicionando função para gerar ID
import InputMask from 'react-input-mask';

export default function Page({ params }) {

    const route = useRouter()

    const passageiros = JSON.parse(localStorage.getItem('passageiros')) || []
    const dados = passageiros.find(item => item.id === params.id)
    const passageiro = dados || { nome: '', tipoDocumento: '', numeroDocumento: '', email: '', telefone: '', dataNascimento: '' }

    function salvar(dados) {
        if (passageiro.id) {
            Object.assign(passageiro, dados)  // Atualiza se já existir
        } else {
            dados.id = uuidv4()  // Gera um novo ID único se for novo passageiro
            passageiros.push(dados)
        }

        localStorage.setItem('passageiros', JSON.stringify(passageiros))
        return route.push('/passageiros')
    }

    return (
        <Pagina titulo="Passageiro">

            <Formik
                initialValues={passageiro}
                onSubmit={values => salvar(values)}
            >
                {({
                    values,
                    handleChange,
                    handleSubmit,
                }) => (
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="nome">
                            <Form.Label>Nome</Form.Label>
                            <Form.Control
                                type="text"
                                name="nome"
                                value={values.nome}
                                onChange={handleChange('nome')}
                            />
                        </Form.Group>

                        {/* Campo de Documento */}
                        <Form.Group className="mb-3" controlId="documento">
                            <Form.Label>Documento</Form.Label>
                            <Row>
                                <Col sm={4}>
                                    <Form.Select
                                        name="tipoDocumento"
                                        value={values.tipoDocumento}
                                        onChange={handleChange('tipoDocumento')}
                                    >
                                        <option value="">Tipo</option>
                                        <option value="cpf">CPF</option>
                                        <option value="cnh">CNH</option>
                                        <option value="rg">RG</option>
                                    </Form.Select>
                                </Col>
                                <Col sm={8}>
                                    <Form.Control
                                        type="text"
                                        placeholder="Número do documento"
                                        name="numeroDocumento"
                                        value={values.numeroDocumento}
                                        onChange={handleChange('numeroDocumento')}
                                    />
                                </Col>
                            </Row>
                        </Form.Group>

                        {/* Campo de Email */}
                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="text"
                                name="email"
                                value={values.email}
                                onChange={handleChange('email')}
                            />
                        </Form.Group>

                        {/* Campo de Telefone */}
                        <Form.Group className="mb-3" controlId="telefone">
                            <Form.Label>Telefone</Form.Label>
                            <InputMask
                                mask="(99) 99999-9999"
                                value={values.telefone}
                                onChange={handleChange('telefone')}
                            >
                                {() => <Form.Control type="text" placeholder="(99) 99999-9999" />}
                            </InputMask>
                        </Form.Group>

                        {/* Campo de Data de Nascimento */}
                        <Form.Group className="mb-3" controlId="dataNascimento">
                            <Form.Label>Data de Nascimento</Form.Label>
                            <InputMask
                                mask="99/99/9999"
                                value={values.dataNascimento}
                                onChange={handleChange('dataNascimento')}
                            >
                                {() => <Form.Control type="text" placeholder="dd/mm/aaaa" />}
                            </InputMask>
                        </Form.Group>

                        <div className="text-center">
                            <Button type="submit" variant="success">
                                <FaCheck /> Salvar
                            </Button>
                            <Link href="/passageiros" className="btn btn-danger ms-2">
                                <MdOutlineArrowBack /> Voltar
                            </Link>
                        </div>
                    </Form>
                )}
            </Formik>
        </Pagina>
    )
}
