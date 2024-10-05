'use client'

import Link from "next/link"
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap"
import { FaPlusCircle, FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Pagina from "../components/Pagina";

export default function Page() {

    const [passageiros, setPassageiros] = useState([])

    useEffect(() => {
        setPassageiros(JSON.parse(localStorage.getItem('passageiros')) || [])  // Sempre 'passageiros' minúsculo
    }, [])

    function excluir(id) {
        if (confirm('Deseja realmente excluir o registro?')) {
            const dados = passageiros.filter(item => item.id !== id)  // Corrigindo o filtro
            localStorage.setItem('passageiros', JSON.stringify(dados))  // Salvando com 'passageiros' minúsculo
            setPassageiros(dados)
        }
    }

    return (
        <Pagina titulo="Passageiros">

            <Link
                href="/passageiros/create"
                className="btn btn-primary mb-3"
            >
                <FaPlusCircle /> Novo
            </Link>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nome</th>
                        <th>Tipo de Documento</th>
                        <th>Documento</th>
                        <th>Email</th>
                        <th>Telefone</th>
                        <th>Data de Nascimento</th>
                    </tr>
                </thead>
                <tbody>
                    {passageiros.map((item, i) => (
                        <tr key={item.id}>
                            <td>
                                <Link href={`/passageiros/form/${item.id}`}>
                                    <FaRegEdit title="Editar" className="text-primary" />
                                </Link>
                                <MdDelete
                                    title="Excluir"
                                    className="text-danger"
                                    onClick={() => excluir(item.id)}
                                />
                            </td>
                            <td>{item.nome}</td>
                            <td>{item.tipoDocumento}</td>
                            <td>{item.numeroDocumento}</td>
                            <td>{item.email}</td>
                            <td>{item.telefone}</td>
                            <td>{item.dataNascimento}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Pagina>
    )
}
