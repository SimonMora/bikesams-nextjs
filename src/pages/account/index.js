import { Container, Tab } from 'semantic-ui-react';
import styles from './account.module.scss';
import { BasicLayout } from '@/layouts';
import { useAuth } from '@/hooks';
import { Separator } from '@/components/Shared';
import { Settings } from '@/components/Account/Settings';
import { Address } from '@/components/Account/Address';


export default function AccountPage() {

    const { logout } = useAuth();

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
                    <Address.AddAddress />
                    <Address.ListAddresses />
                </Tab.Pane>
            ),
        },
        {
            menuItem:"Orders",
            render: () => (
                <Tab.Pane>
                    <h2>User Orders</h2>
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
