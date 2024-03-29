import { orderControll } from "@/api";
import { Loading, NoResults } from "@/components/Shared";
import { map, size } from "lodash";
import { useEffect, useState } from "react";
import { Order } from "./Order";


export function ListOrders() {
    const [orders, setOrders] = useState(null);

    useEffect(() => {
      (async () => {
        try {
            const response = await orderControll.getAll();
            setOrders(response);
        } catch (error) {
            console.error(error);
        }
      })();
    }, []);
    
    if(!orders) {
        return <Loading text="Loading orders" top={100} />
    } 

  return (
    <div>
        {size(orders) === 0 && <NoResults text="There are no orders" />}
        <h2>Orders List</h2>

        {map(orders, (order) => (
            <Order key={order.orderId} order={order} />
        ))}
    </div>
  )
}
