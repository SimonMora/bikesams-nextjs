import { categContrl } from "@/api/categories";
import { Loading, NoResults } from "@/components/Shared";
import { useEffect, useState } from "react";
import { size, map } from "lodash";
import { Table } from "semantic-ui-react";
import { Category } from "./Category";

export function ListCategories(props) {
    const { reload, onReload } = props;
    const [categories, setCategories] = useState(null);

    useEffect(() => {
      (async() => {
        try {
            const response = await categContrl.getAllCategories();
            console.log(response);
            setCategories(response);
        } catch (error) {
            console.error(error)
        }
      })()
    }, [reload])
    
    if(!categories) return <Loading text="Loading categories" />

  return (
    <>
        <Table>
            <Table.Header>
                <Table.HeaderCell>Id</Table.HeaderCell>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Slug</Table.HeaderCell>
                <Table.HeaderCell></Table.HeaderCell>
            </Table.Header>
            <Table.Body>
                {size(categories) === 0 && 
                    <Table.Row colSpan={4}>
                        <NoResults text="There are no categories." />
                    </Table.Row>
                }
                {map(categories, (category)=> (
                    <Table.Row key={category.categId}>
                        <Category category={category} onReload={onReload} />
                    </Table.Row>
                ))}
            </Table.Body>
        </Table>
    </>
  )
}
