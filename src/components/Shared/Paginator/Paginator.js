import { Pagination } from 'semantic-ui-react';
import styles from './Paginator.module.scss';
import { useRouter } from 'next/router';


export function Paginator(props) {
    const { currentPage, totalPages } = props;
    const router = useRouter();

    const onPageChange = (some, data) => {
        const { activePage } = data;

        router.replace({ query: { ...router.query, page: activePage }});
    };
    return (
        <div className={styles.container}>
            <Pagination 
            activePage={currentPage} 
            totalPages={totalPages} 
            ellipsisItem={null} 
            firstItem={null} 
            lastItem={null} 
            onPageChange={onPageChange}/>
        </div>
    );
}
