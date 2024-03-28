import { productControl } from "@/api";
import { Basket } from "@/components/Basket";
import { Loading, NoResults } from "@/components/Shared";
import { useBasket } from "@/hooks";
import { BasketLayout } from "@/layouts";
import { size } from "lodash";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function BasketPage() {
  const { basket} = useBasket();
  const [products, setProducts] = useState(null);
  const { query : { step = 1 } } = useRouter();
  const currentStep = Number(step);

  useEffect(() => {
    (async()=>{
      try {
        const data = [];
  
        for await (const item of basket) {
          const response = await productControl.getById(item.id);
          data.push({ ...response, quantity: item.quantity });
        }

        setProducts(data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [basket]);
  
  return (
    <BasketLayout>
        {!products && currentStep != 4 && <Loading />}

        {products && size(products) === 0 && currentStep < 4 && (
          <NoResults text="The Basket is empty.." />
        )}

        {size(products) > 0 && currentStep === 1 && (
          <Basket.StepOne products={products} />
        )}

        {size(products) > 0 && currentStep === 2 && (
          <div>
            <p>Step 2</p>
          </div>
        )}

        {size(products) > 0 && currentStep === 3 && (
          <div>
            <p>Step 3</p>
          </div>
        )}

        {currentStep === 4 && (
          <div>
            <p>Step 4</p>
          </div>
        )}
    </BasketLayout>
  );
}
