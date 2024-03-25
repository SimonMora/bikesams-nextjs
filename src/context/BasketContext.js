import { basketContrll } from "@/api";
import { createContext, useEffect, useState } from "react";

export const BasketContext = createContext();

export function BasketProvider(props) {
    const { children } = props;
    const [basket, setBasket] = useState(null);
    const [total, setTotal] = useState(basketContrll.count());

    useEffect(() => {
      const response = basketContrll.getAll();
      setBasket(response);
    }, [])
    

    const addProduct = (productId) => {
        basketContrll.add(productId);
        refreshTotalBasket();
    };

    const refreshTotalBasket =  () => {
        setTotal(basketContrll.count());
        setBasket(basketContrll.getAll());
    };

    const data = {
        basket,
        total,
        addProduct,
        deleteItem: () => null,
        deleteAllItems: () => null,
        changeQuantityItem: () => null,
    };

    return (
        <BasketContext.Provider value={data}>{children}</BasketContext.Provider>
    );
}