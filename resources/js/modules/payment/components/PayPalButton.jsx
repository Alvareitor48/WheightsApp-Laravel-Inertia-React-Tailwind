import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import {usePage} from "@inertiajs/react";

export default function PayPalButton() {
    const {auth} = usePage().props

    const createOrder = async () => {
        try {
            const response = await fetch("/api/paypal/order", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
            });

            const data = await response.json();
            if (!response.ok) {
                return Promise.reject(data.error || "Error al crear la orden");
            }
            return data.id;
        } catch (error) {
            return Promise.reject("Error al procesar el pago");
        }
    };


    const onApprove = async (data) => {
        try {
            const response = await fetch("/api/paypal/capture", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
                body: JSON.stringify({ orderId: data.orderID, userId:auth.user.id }),
            });

            const orderData = await response.json();

            if (!response.ok) {
                return;
            }
            if (orderData.redirect) {
                window.location.href = orderData.redirect;
            }
        } catch (error) {
            alert("Error en el proceso de pago. Inténtalo de nuevo.");
        }
    };

    return (
        <PayPalScriptProvider options={{ "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID, currency: "EUR" }}>
            <PayPalButtons createOrder={createOrder} onApprove={onApprove} />
        </PayPalScriptProvider>
    );
}
