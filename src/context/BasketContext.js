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
    }, []);
    
    const refreshTotalBasket =  () => {
        setTotal(basketContrll.count());
        setBasket(basketContrll.getAll());
    };

    const addProduct = (productId) => {
        basketContrll.add(productId);
        refreshTotalBasket();
    };
    
    const changeQuantityItem = (productId, quantity) => {
        basketContrll.changeQuantity(productId,quantity);
        refreshTotalBasket();
    };

    const deleteItem = (productId) => {
        basketContrll.deleteItem(productId);
        refreshTotalBasket();
    };

    const data = {
        basket,
        total,
        addProduct,
        deleteItem,
        deleteAllItems: () => null,
        changeQuantityItem,
    };

    return (
        <BasketContext.Provider value={data}>{children}</BasketContext.Provider>
    );
}