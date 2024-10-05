'use client'

import Link from "next/link"
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap"
import { FaPlusCircle, FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Pagina from "../components/Pagina";

export default function Page() {

    const [passagens, setPassagens] = useState([]); // Alterando para aeroportos

    useEffect(() => {
        setPassagens(JSON.parse(localStorage.getItem('passagens')) || []); // Sempre 'aeroportos'
    }, []);

    function excluir(id) {
        if (confirm('Deseja realmente excluir o registro?')) {
            const dados = passagens.filter(item => item.id !== id); // Corrigindo o filtro
            localStorage.setItem('passagens', JSON.stringify(dados)); // Salvando com 'aeroportos'
            setPassagens(dados);
        }
    }

    return (
        <Pagina titulo="Passagens">

            <Link
                href="/passagens/create"
                className="btn btn-primary mb-3"
            >
                <FaPlusCircle /> Novo
            </Link>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Voo_id</th>
                        <th>Passageiro_id</th>
                        <th>Assento</th>
                        <th>Preço</th>
                    </tr>
                </thead>
                <tbody>
                    {aeroportos.map((item, i) => (
                        <tr key={item.id}>
                            <td>
                                <Link href={`/aeroporto/form/${item.id}`}>
                                    <FaRegEdit title="Editar" className="text-primary" />
                                </Link>
                                <MdDelete
                                    title="Excluir"
                                    className="text-danger"
                                    onClick={() => excluir(item.id)}
                                />
                            </td>
                            <td>{item.nome}</td>
                            <td>{item.sigla}</td>
                            <td>{item.uf}</td>
                            <td>{item.cidade}</td>
                            <td>{item.pais}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Pagina>
    );
}
