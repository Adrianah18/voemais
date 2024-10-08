'use client'

import Pagina from "@/app/components/Pagina";
import apiLocalidade from "@/services/apiLocalidade";
import { Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { FaCheck } from "react-icons/fa";
import { MdOutlineArrowBack } from "react-icons/md";
import { v4 as uuidv4 } from 'uuid';  // Adicionando função para gerar ID

export default function Page({ params }) {

    const route = useRouter();

    const aeroportos = JSON.parse(localStorage.getItem('aeroportos')) || [];
    const dados = aeroportos.find(item => item.id === params.id);
    const aeroporto = dados || { nome: '', sigla: '', uf: '', cidade: '', pais: 'Brasil' };

    // Parte para puxar a API
    const [paises, setPaises] = useState([]);
    const [ufs, setUfs] = useState([]);
    const [cidades, setCidades] = useState([]);
    const [camposBrasil, setCamposBrasil] = useState(false);

    // Pegar países
    useEffect(() => {
        apiLocalidade.get(`paises`).then(resultado => {
            setPaises(resultado.data);
        });
    }, []);

    // Pegar estados
    useEffect(() => {
        apiLocalidade.get(`estados?orderBy=nome`).then(resultado => {
            setUfs(resultado.data);
        });
    }, []);

    // Atualizar cidades com base no estado selecionado (UF)
    useEffect(() => {
        if (aeroporto.uf) {
            apiLocalidade.get(`estados/${aeroporto.uf}/municipios`).then(resultado => {
                setCidades(resultado.data);
            });
        }
    }, [aeroporto.uf]);

    // Função para salvar o aeroporto
    function salvar(dados) {
        if (aeroporto.id) {
            Object.assign(aeroporto, dados);  // Atualiza se já existir
        } else {
            dados.id = uuidv4();  // Gera um novo ID único se for novo aeroporto
            aeroportos.push(dados);  // Adiciona novo aeroporto
        }

        localStorage.setItem('aeroportos', JSON.stringify(aeroportos)); // Salva no localStorage
        return route.push('/aeroporto');
    }

    return (
        <Pagina titulo="Aeroporto">
            <Formik
                initialValues={aeroporto}
                onSubmit={values => salvar(values)}
            >
                {({
                    values,
                    handleChange,
                    handleSubmit,
                }) => {

                    useEffect(() => {
                        setCamposBrasil(values.pais === 'Brasil');
                    }, [values.pais]);

                    useEffect(() => {
                        if (values.uf) {
                            apiLocalidade.get(`estados/${values.uf}/municipios`).then(resultado => {
                                setCidades(resultado.data);
                            });
                        }
                    }, [values.uf]);

                    return (
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

                            <Form.Group className="mb-3" controlId="sigla">
                                <Form.Label>Sigla</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="sigla"
                                    value={values.sigla}
                                    onChange={handleChange('sigla')}
                                    placeholder="Digite a sigla"
                                />
                            </Form.Group>

                            {camposBrasil && (
                                <>
                                    <Form.Group controlId="uf">
                                        <Form.Label>UF</Form.Label>
                                        <Row>
                                            <Col sm={4}>
                                                <Form.Select
                                                    name="uf"
                                                    value={values.uf}
                                                    onChange={handleChange('uf')}
                                                >
                                                    <option>Selecione</option>
                                                    {ufs.map(item => (
                                                        <option key={item.sigla} value={item.sigla}>
                                                            {item.sigla} - {item.nome}
                                                        </option>
                                                    ))}
                                                </Form.Select>
                                            </Col>
                                        </Row>
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="cidade">
                                        <Form.Label>Cidade</Form.Label>
                                        <Form.Select
                                            name="cidade"
                                            value={values.cidade}
                                            onChange={handleChange('cidade')}
                                        >
                                            <option>Selecione</option>
                                            {cidades.map(item => (
                                                <option key={item.nome} value={item.nome}>
                                                    {item.nome}
                                                </option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>
                                </>
                            )}

                            <Form.Group className="mb-3" controlId="pais">
                                <Form.Label>País</Form.Label>
                                <Form.Select
                                    name="pais"
                                    value={values.pais}
                                    onChange={handleChange('pais')}
                                >
                                    <option>Selecione</option>
                                    {paises.map(item => (
                                        <option key={item.nome} value={item.nome}>
                                            {item.nome}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Form.Group>

                            <div className="text-center">
                                <Button type="submit" variant="success">
                                    <FaCheck /> Salvar
                                </Button>
                                <Link href="/aeroporto" className="btn btn-danger ms-2">
                                    <MdOutlineArrowBack /> Voltar
                                </Link>
                            </div>
                        </Form>
                    );
                }}
            </Formik>
        </Pagina>
    );
}
