import { productControl } from "@/api/products";
import { Loading } from "@/components/Shared";

import { useEffect, useState } from "react";
import { Table } from "semantic-ui-react";
import { size, map } from 'lodash';
import Product from "./Product/Product";

const ITEMS_PER_PAGE = 5;

export function ListProducts() {

    const [products, setProducts] = useState(null);
    const page = 1;

    useEffect(() => {
      (async () => {
        try {
            setProducts(null);
            const searchText = ""
            const productsResp = await productControl.getAll(page, ITEMS_PER_PAGE, searchText);
            
            setProducts(productsResp.data || []);
            //TODO: paginate
            console.log(productsResp.totalItems);
        } catch (error) {
            console.log(error);
        }
      })();
    }, [])

    if(!products) return <Loading text="Loading Products" />
    
  return (
    <div>
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
                            <Product product={product}/>
                        </Table.Row>
                    ))
                }
            </Table.Body>
        </Table>
    </div>
  );
}
