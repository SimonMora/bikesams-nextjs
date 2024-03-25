import { BasicLayout } from "@/layouts";
import { Container, Image } from "semantic-ui-react";
import styles from './ProductPage.module.scss';
import { productControl } from "@/api";
import { useEffect, useState } from "react";
import { Separator } from "@/components/Shared";
import { fn } from "@/utils";
import { Product } from "@/components/Product";
import { useBasket } from "@/hooks";

const NOT_FOUND_IMAGE = "/image/not-found.png";

export default function ProductPage(props) {
    const { product } = props;
    const [image, setImage] = useState(NOT_FOUND_IMAGE);

    const {basket} = useBasket();
    console.log(basket);

    useEffect(() => {
        const imageURL = fn.getImageUrl(product.prodId);
        fn.checkImageExist(imageURL, (exist) => {
          if (exist) {
              setImage(imageURL);
          }
        });
    }, [product]);

  return (
    <BasicLayout>
        <Container>
            <div className={styles.product}>
                <div>
                    <Image src={image} alt={product.prodTitle} /> 
                </div>
                <div>
                    <Product.Info product={product} />
                </div>
                <Separator height={20} />
            </div>
            <Product.Description product={product} />
        </Container>
        <Separator height={50} />
    </BasicLayout>
  )
}

export async function getServerSideProps(context) {
    const {
        params: { slug },
        query: { search },
    } = context;

    if (search) {
        return { props: { products: [], pagination: {} } };
    }

    try {
        const response = await productControl.getBySlug(slug);
        return { props: { product : response.data[0] } };
    } catch (error) {
        return { props: { notFound: true } };
    }
}