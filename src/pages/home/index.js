import { ENV } from '@/utils';
import { useAuth } from '@/hooks';
import { Button } from 'semantic-ui-react';

export default function HomePage() {
  const { user, logout } = useAuth();  
  console.log(user);
  
  return (
    <div>
        <h2>You are in the Home Page</h2>
        <Button onClick={logout} basic>
          Logout
        </Button>
    </div>
  )
}
