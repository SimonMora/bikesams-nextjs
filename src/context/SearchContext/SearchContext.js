import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from './SearchContext.module.scss';
import { GridProducts, Separator } from "@/components/Shared";
import { productControl } from "@/api";

export function SearchProvider (props) {
    const { children } = props;

    const { query } = useRouter();
    const [products, setProducts] = useState(null);
    const [totalItems, setTotalItems] = useState(null);


    useEffect(() => {
      if (query.search) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "scroll";
      }
    }, [query.search]);

    useEffect(() => {
        ( async () => {
            try {
                setProducts(null);
                const response = await productControl.getAll(1, 10000, query.search);

                setProducts(response.data || []);
                setTotalItems(response.totalItems || 0);
            } catch (error) {
                console.error(error);
            }
        })();
    }, [query.search]);
    
    return(
        <>
            {children}
            { query.search && 
                <div className={styles.container}>
                    <div className={styles.infoSearch}>
                        <p>Buscando: {query.search}</p>
                        <p>{totalItems} results</p>
                    </div>
                    <Separator height={20} />
                    <GridProducts products={products} columns={6} classProduct={styles.product} />
                </div>
            }
        </>
    );
}