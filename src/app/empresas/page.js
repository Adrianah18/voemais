'use client';
import { Table } from "react-bootstrap";
import Pagina from "../components/Pagina";
import { FaPlus } from "react-icons/fa6";
import Link from "next/link";
export default function Page(){
    return(
        <Pagina titulo ="Empresas">
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>nome</th>
                        <th>logo</th>
                    </tr>
                </thead>
                <tbody>
                        <tr>
                            <td>1</td>
                            <td>Gol</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Latam</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>Azul</td>
                            <td></td>
                        </tr>

                </tbody>
            </Table>
            <div className="text-center">
                <Link href="/empresas/create"className="btn btn-primary ms-2">
                    <FaPlus></FaPlus>Novo</Link>

            </div>
        </Pagina>
    )
}
