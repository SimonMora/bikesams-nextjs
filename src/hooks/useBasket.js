const { BasketContext } = require("@/context");
const { useContext } = require("react");

export const useBasket = () => useContext(BasketContext);