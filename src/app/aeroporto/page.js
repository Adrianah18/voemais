'use client'

import Link from "next/link"
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap"
import { FaPlusCircle, FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Pagina from "../components/Pagina";

export default function Page() {

    const [aeroportos, setAeroportos] = useState([]); // Alterando para aeroportos

    useEffect(() => {
        setAeroportos(JSON.parse(localStorage.getItem('aeroportos')) || []); // Sempre 'aeroportos'
    }, []);

    function excluir(id) {
        if (confirm('Deseja realmente excluir o registro?')) {
            const dados = aeroportos.filter(item => item.id !== id); // Corrigindo o filtro
            localStorage.setItem('aeroportos', JSON.stringify(dados)); // Salvando com 'aeroportos'
            setAeroportos(dados);
        }
    }

    return (
        <Pagina titulo="Aeroportos">

            <Link
                href="/aeroporto/form"
                className="btn btn-primary mb-3"
            >
                <FaPlusCircle /> Novo
            </Link>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nome</th>
                        <th>Sigla</th>
                        <th>UF</th>
                        <th>Cidade</th>
                        <th>País</th>
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
