import io from "socket.io-client";
import {
    Alert,
} from "react-native";
import { playBeep } from "../help/soundhelper";
let socket;



export const connectSocket = (storeId, onNewOrder) => {
    if (!socket) {
        socket = io("http://103.139.59.233:9092", {
            transports: ["websocket"],
            forceNew: true,
            reconnection: true,
            timeout: 10000,
        });

        socket.on("connect", () => {
            console.log("✅ Socket connected:", socket.id);

            // join vendor room
            // socket.emit("joinCustomer", String(customerData));
            socket.emit("joinStore", String(storeId));
            // socket.emit("joinDelivery", '330509');
            console.log("➡️ Joined vendor room:", String(storeId));
            // console.log("➡️ Joined customer room:", customerData);
            // console.log("➡️ Joined joinDelivery room: 330509");

            // if (onNewOrder) {
            //     socket.off("orderAccepted");
            //     socket.on("orderAccepted", (order) => {
            //         if (order.customerId === customerData) {
            //             console.log("✅ Order accepted for my vendor:", order.orderId);
            //             Alert.alert("✅ Order Accepted", `Order ID: ${order.orderId || "N/A"}`);
            //             playBeep();
            //             onNewOrder(order);
            //         } else {
            //             console.log("🚫 Ignored order for customer:", order);
            //         }
            //     });
            // }
            // if (onNewOrder) {
            //     socket.off("orderAssign"); // 
            //     socket.on("orderAssign", (order) => {
            //         if (order.DeliveryId === "330509") {
            //             Alert.alert("✅ Order Assigned", `Order ID: ${order.orderId || "N/A"}`);
            //             console.log("orderAssign", order)
            //             onNewOrder(order);
            //         } else {
            //             console.log("🚫 Ignored order for vendor:", order);
            //         }
            //     });
            // }
            if (onNewOrder) {
                socket.off("orderNotification"); // remove previous handlers
                // socket.on("orderNotification", (order) => {
                //     console.log("📦 New order received:", order);
                //     onNewOrder(order);
                // });
                socket.on("orderNotification", (order) => {
                    if (order.storeId === String(storeId)) {
                        console.log("📦 New order received for my vendor:", order.orderId);
                        Alert.alert("🆕 New Ordersss", `Order ID: ${order.orderId || "N/A"}`);
                        playBeep();
                        onNewOrder(order);
                    } else {
                        console.log("🚫 Ignored order for vendor:", order);
                    }
                });
            }
            // socket.on("orderNotification", (order) => {
            //     if (order.storeId === "70001") {
            //         console.log("📦 New order received for my vendor:", order);
            //         onNewOrder(order);
            //     } else {
            //         console.log("🚫 Ignored order for vendor:", order.vendorId);
            //     }
            // });
        });

        socket.on("connect_error", (err) => {
            console.error("❌ Socket connection error:", err);
        });
    }
    return socket;
};

export const disconnectSocket = () => {
    if (socket) {
        socket.disconnect();
        socket = null;
        console.log("🔌 Socket disconnected");
    }
};
