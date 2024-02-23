import { fn } from "@/utils";
import { useEffect, useState } from "react";
import { Icon, Image, Table } from "semantic-ui-react";

const NOT_FOUND_IMAGE = '/image/not-found.png';
const ADMIN_STATUS = 0;

export function User(props) {
    const { user } = props;
    const [avatar, setAvatar] = useState(NOT_FOUND_IMAGE);
    const isAdmin = user.userStatus === ADMIN_STATUS;

    useEffect(() => {
      (async () => {
        const url = fn.getImageUrl(user.userUUID);

        fn.checkImageExist(url, (exist) => {
            if (exist) setAvatar(url);
        });
      })();
    }, [user]);
    

  return (
    <>
        <Table.Cell> 
            <Image src={avatar} avatar alt={user.userName} />
        </Table.Cell>
        <Table.Cell>{user.userFirstName}</Table.Cell>
        <Table.Cell>{user.userLastName}</Table.Cell>
        <Table.Cell>{user.userEmail}</Table.Cell>
        <Table.Cell>
            <Icon name={isAdmin ? "check" : "close"} color={isAdmin ? "green": "red"} />
        </Table.Cell>
    </>
    
  )
}
