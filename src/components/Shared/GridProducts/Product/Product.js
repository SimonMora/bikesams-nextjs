import classNames from "classnames";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Image } from "semantic-ui-react";
import styles from './Product.module.scss';
import { fn } from "@/utils";

const NOT_FOUND_IMAGE = "/image/not-found.png"

export function Product(props) {
    const { product, classProduct } = props;
    const [image, setImage] = useState(NOT_FOUND_IMAGE);

    const lowStock = product.prodStock > 0 && product.prodStock < 5;

    useEffect(() => {
      const imageURL = fn.getImageUrl(product.prodId);
      fn.checkImageExist(imageURL, (exist) => {
        if (exist) {
            setImage(imageURL);
        }
      })
    }, [product])
    
  return (
    <div 
      className={classNames(styles.container, {
        [classProduct]: classProduct,
      })}
    >
        
        <Link href={`/product/${product.prodPath}`}>
            <div className={styles.content}>
                <Image src={image} alt={product.prodTitle}/>
                <h3>{product.prodTitle}</h3>
                <div className={styles.footer}>
                    <span>{product.prodPrice}$</span>
                </div>
                {
                    lowStock && (
                        <p className={styles.lowStock}>
                            {`Just ${product.prodStock} remaining`}
                        </p>
                    ) 
                }
            </div>
        </Link>
    </div>
  )
}
