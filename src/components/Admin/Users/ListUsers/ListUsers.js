import { userContrl } from "@/api";
import { Loading, Paginator } from "@/components/Shared";
import { useEffect, useState } from "react";
import { Table } from "semantic-ui-react";
import { size, map } from 'lodash';
import { User } from "./User";
import { useRouter } from "next/router";

const ITEMS_PER_PAGE = 10;

export function ListUsers() {
    const [users, setUsers] = useState(null);
    const [totalPages, setTotalPages] = useState(null);
    const { query } = useRouter();

    const page = Number(query.page || 1); 
    
    useEffect(() => {
      (async () => {
        try {
            setUsers(null);
            const response = await userContrl.list(page);

            setUsers(response.data);
            setTotalPages(Math.ceil(response.totalItems / ITEMS_PER_PAGE));
        } catch (error) {
            console.error(error);
        }
      })();
    }, [query.page]);
    
    if(!users) return <Loading text="Loading users.."/>;

  return (
    <>
        <Table striped>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Avatar</Table.HeaderCell>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Last Name</Table.HeaderCell>
                        <Table.HeaderCell>Email</Table.HeaderCell>
                        <Table.HeaderCell>Admin</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>

                    {
                        map(users, (user) => (
                            <Table.Row key={user.userUUID}>
                                <User user={user} />
                            </Table.Row>
                        ))
                    }
                </Table.Body>
            </Table>
            <Paginator currentPage={page} totalPages={totalPages} />
    </>
  )
}
