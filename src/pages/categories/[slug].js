import { BasicLayout } from '@/layouts';
import styles from './CategoryPath.module.scss';
import { Container } from 'semantic-ui-react';
import { GridProducts, Paginator, Separator } from '@/components/Shared';
import { productControl } from '@/api';
import { size } from 'lodash';

export default function CategoryPath(props) {
    const { products , pagination } = props;
    const { page, totalPages } = pagination;


  return (
    <BasicLayout>
        <Container>
            <Separator height={20} />
            <GridProducts products={products} classProduct={styles.product}/>
            {size(products) > 0 && (
              <Paginator currentPage={page} totalPages={totalPages} />
            )}
        </Container>
    </BasicLayout>
  )
}

export async function getServerSideProps(context) {
    const { 
      params: { slug },
      query: { page = 1, search },
    } = context;

    const ITEMS_PER_PAGE = 10;

    if (search) {
      return { props: { products: [], pagination: {} }}
    }
    
    try {
      const response = await productControl.getProductByCategSlug(
        slug,
        page,
        ITEMS_PER_PAGE
      );

      const products = response.data || [];
      const totalPages = Math.ceil(response.totalItems / ITEMS_PER_PAGE);
      const pagination = { page, totalPages };

      return { props: { products, pagination } };
    } catch (error) {
      return { props: { notFound: true } };
    }
}
