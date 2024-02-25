import { Icon } from "semantic-ui-react";
import styles from "./Account.module.scss";
import Link from "next/link";
import { useAuth } from "@/hooks";

export function Account() {

    const { user } = useAuth();
    const url = user ? "/account" : "/join/login";

  return (
    <Link href={url} className={styles.account}>
        <Icon name="user"/>
        {user?.userEmail ? user.userEmail.slice(0, 10) + "..." : "Login"}
    </Link>
    
  )
}
