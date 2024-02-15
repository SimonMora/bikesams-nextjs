

import { BasicLayout } from '@/layouts';
import styles from './admin.module.scss';
import { Container, Tab } from 'semantic-ui-react';
import { useAuth } from '@/hooks';
import { useRouter } from 'next/router';
import { Search } from '@/components/Shared';
import { Products } from '@/components/Admin';

export default function AdminPage() {
    const { isAdmin } = useAuth();
    const router = useRouter();

    if(!isAdmin) {
        router.push("/");
        return null;
    }

    const panes = [
        {
            menuItem:"Products",
            render: () => (
                <Tab.Pane>
                    <div className={styles.actions}>
                        <Search />
                        <span>Add product</span>
                    </div>
                    <Products.ListProducts />
                </Tab.Pane>
            ),
        },
        {
            menuItem:"Categories",
            render: () => (
                <Tab.Pane>
                    <div className={styles.actions}>
                        <div />
                        <span>Add category</span>
                    </div>
                    <h2>Categories...</h2>
                </Tab.Pane>
            ),
        },
        {
            menuItem:"Users",
            render: () => (
                <Tab.Pane>
                    <h2>Users...</h2>
                </Tab.Pane>
            ),
        },
    ];

    return (
        <BasicLayout>
            <Container>
                <Tab panes={panes} className={styles.tabs} />
            </Container>
        </BasicLayout>
    )
}
