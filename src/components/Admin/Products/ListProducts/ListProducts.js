import { productControl } from "@/api/products";
import { Loading, Paginator } from "@/components/Shared";

import { useEffect, useState } from "react";
import { Table } from "semantic-ui-react";
import { size, map } from 'lodash';
import Product from "./Product/Product";
import { useRouter } from "next/router";

const ITEMS_PER_PAGE = 20;

export function ListProducts(props) {
    const { reload, onReload } = props;
    const [products, setProducts] = useState(null);
    const [totalPages, setTotalPages] = useState(null);
    const { query } = useRouter();

    const page = Number(query.page || 1) ;

    useEffect(() => {
      (async () => {
        try {
            setProducts(null);
            const searchText = query.prodSearch || "";
            const productsResp = await productControl.getAll(page, ITEMS_PER_PAGE, searchText);
            
            setProducts(productsResp.data || []);
            setTotalPages(Math.ceil(productsResp.totalItems / ITEMS_PER_PAGE));
        } catch (error) {
            console.log(error);
        }
      })();
    }, [reload, query.page, query.prodSearch]);

    if(!products) return <Loading text="Loading Products" />;
    
    return (
        <>
            <Table striped>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>ID</Table.HeaderCell>
                        <Table.HeaderCell>Image</Table.HeaderCell>
                        <Table.HeaderCell>Nombre</Table.HeaderCell>
                        <Table.HeaderCell>Precio</Table.HeaderCell>
                        <Table.HeaderCell>Stock</Table.HeaderCell>
                        <Table.HeaderCell></Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {
                        size(products) === 0 && (
                            <Table.Cell colSpan="5">
                                <span>No results</span>
                            </Table.Cell>
                        )
                    }

                    {
                        map(products, (product) => (
                            <Table.Row key={product.prodId}>
                                <Product product={product} onReload={onReload}/>
                            </Table.Row>
                        ))
                    }
                </Table.Body>
            </Table>
            <Paginator currentPage={page} totalPages={totalPages} />
        </>
    );
}
