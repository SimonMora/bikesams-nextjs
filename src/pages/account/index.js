import { Container, Tab } from 'semantic-ui-react';
import styles from './account.module.scss';
import { BasicLayout } from '@/layouts';
import { useAuth } from '@/hooks';
import { Separator } from '@/components/Shared';
import { Settings } from '@/components/Account/Settings';
import { Address } from '@/components/Account/Address';
import { useState } from 'react';
import { Orders } from '@/components/Account/Orders';


export default function AccountPage() {

    const { logout } = useAuth();
    const [reload, setReload] = useState(false);

    const onReload = () => setReload((prevState) => !prevState);

    const panes = [
        {
            menuItem:"Information",
            render: () => (
                <Tab.Pane>
                    <Settings.AvatarForm />
                    <Separator height={20} />
                    <Settings.NameForm />
                </Tab.Pane>
            ),
        },
        {
            menuItem:"Addresses",
            render: () => (
                <Tab.Pane>
                    <Address.AddAddress onReload={onReload} />
                    <Address.ListAddresses reload={reload} onReload={onReload} />
                </Tab.Pane>
            ),
        },
        {
            menuItem:"Orders",
            render: () => (
                <Tab.Pane>
                    <Orders.ListOrders />
                </Tab.Pane>
            ),
        },
        {
            menuItem: {
                key: 20,
                icon: "log out",
                content:"Close session",
                onClick: () => logout(),
            }
        },

    ];
  return (
    <BasicLayout>
        <Container>
            <Tab 
              panes={panes} 
              className={styles.tabs}
              menu={{ fluid: true, vertical: true, tabular: true }}  
            />
        </Container>       
    </BasicLayout>
  )
}
