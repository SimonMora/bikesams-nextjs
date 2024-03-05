import { GridCategories, GridProducts, Separator } from '@/components/Shared';
import { BasicLayout } from '@/layouts';
import { Container } from 'semantic-ui-react';
import styles from './home.module.scss';
import { productControl } from '@/api';
import { useEffect, useState } from 'react';


export default function HomePage() {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await productControl.getAll(1, 100);
        console.log(response);
        setProducts(response.data || []);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [])
  
  return (
    <BasicLayout>
      <Separator height={50} />
      <Container>
        <GridCategories />
        <Separator height={50} />
        <h3>Last Products</h3>
        <Separator height={10} />
        <GridProducts products={products} columns={4} classProduct={styles.product} />
      </Container>
    </BasicLayout>
  )
}
