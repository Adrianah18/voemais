'use client'

import Pagina from "@/app/components/Pagina";
import { Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, Col, Form, Row } from "react-bootstrap";
import { FaCheck } from "react-icons/fa";
import { MdOutlineArrowBack } from "react-icons/md";
import { v4 as uuidv4 } from 'uuid';  // Adicionando função para gerar ID

export default function Page({ params }) {

    const route = useRouter();

    const aeroportos = JSON.parse(localStorage.getItem('aeroportos')) || [];
    const dados = aeroportos.find(item => item.id === params.id);
    const aeroporto = dados || { nome: '', sigla: '', uf: '', cidade: '', pais: '' };

    function salvar(dados) {
        if (aeroporto.id) {
            Object.assign(aeroporto, dados);  // Atualiza se já existir
        } else {
            dados.id = uuidv4();  // Gera um novo ID único se for novo aeroporto
            aeroportos.push(dados);  // Corrigindo para adicionar aos aeroportos
        }

        localStorage.setItem('aeroportos', JSON.stringify(aeroportos)); // Corrigindo para salvar com 'aeroportos'
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

                        <Form.Group className="mb-3" controlId="sigla">
                            <Form.Label>Sigla</Form.Label>
                            <Form.Control
                                type="text"
                                name="sigla"
                                value={values.sigla}
                                onChange={handleChange('sigla')}
                                maxLength={2}  // Limite de 2 caracteres para a sigla
                                placeholder="Digite a sigla"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="uf">
                            <Form.Label>Estado (UF)</Form.Label>
                            <Row>
                                <Col sm={4}>
                                    <Form.Select
                                        name="uf"
                                        value={values.uf}
                                        onChange={handleChange('uf')}
                                    >
                                        <option value="">Selecione o Estado</option>
                                        <option value="AC">Acre (AC)</option>
                                        <option value="AL">Alagoas (AL)</option>
                                        <option value="AP">Amapá (AP)</option>
                                        <option value="AM">Amazonas (AM)</option>
                                        <option value="BA">Bahia (BA)</option>
                                        <option value="CE">Ceará (CE)</option>
                                        <option value="DF">Distrito Federal (DF)</option>
                                        <option value="ES">Espírito Santo (ES)</option>
                                        <option value="GO">Goiás (GO)</option>
                                        <option value="MA">Maranhão (MA)</option>
                                        <option value="MT">Mato Grosso (MT)</option>
                                        <option value="MS">Mato Grosso do Sul (MS)</option>
                                        <option value="MG">Minas Gerais (MG)</option>
                                        <option value="PA">Pará (PA)</option>
                                        <option value="PB">Paraíba (PB)</option>
                                        <option value="PR">Paraná (PR)</option>
                                        <option value="PE">Pernambuco (PE)</option>
                                        <option value="PI">Piauí (PI)</option>
                                        <option value="RJ">Rio de Janeiro (RJ)</option>
                                        <option value="RN">Rio Grande do Norte (RN)</option>
                                        <option value="RS">Rio Grande do Sul (RS)</option>
                                        <option value="RO">Rondônia (RO)</option>
                                        <option value="RR">Roraima (RR)</option>
                                        <option value="SC">Santa Catarina (SC)</option>
                                        <option value="SP">São Paulo (SP)</option>
                                        <option value="SE">Sergipe (SE)</option>
                                        <option value="TO">Tocantins (TO)</option>
                                    </Form.Select>
                                </Col>
                            </Row>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="cidade">
                            <Form.Label>Cidade</Form.Label>
                            <Form.Control
                                type="text"
                                name="cidade"
                                value={values.cidade}
                                onChange={handleChange('cidade')}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="pais">
                            <Form.Label>País</Form.Label>
                            <Form.Control
                                type="text"
                                name="pais"
                                value={values.pais}
                                onChange={handleChange('pais')}
                            />
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
                )}
            </Formik>
        </Pagina>
    );
}
