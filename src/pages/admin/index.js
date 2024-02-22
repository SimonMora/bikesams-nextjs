
import { BasicLayout } from '@/layouts';
import styles from './admin.module.scss';
import { Container, Tab } from 'semantic-ui-react';
import { useAuth } from '@/hooks';
import { useRouter } from 'next/router';
import { Search } from '@/components/Shared';
import { Categories, Products } from '@/components/Admin';
import { useState } from 'react';


export default function AdminPage() {
    const [reload, setReload] = useState(false);
    const { isAdmin } = useAuth();
    const router = useRouter();

    if(!isAdmin) {
        router.push("/");
        return null;
    }

    const onReload = () => setReload((prevState) => !prevState);

    const panes = [
        {
            menuItem:"Products",
            render: () => (
                <Tab.Pane>
                    <div className={styles.actions}>
                        <Search queryName= "prodSearch" />
                        <Products.AddProduct onReload={onReload} />
                    </div>
                    <Products.ListProducts reload={reload} onReload={onReload}/>
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
                    <Categories.ListCategories  reload={reload} onReload={onReload}/>
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
