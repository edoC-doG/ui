import {
    PayPalScriptProvider,
    PayPalButtons,
    usePayPalScriptReducer
} from "@paypal/react-paypal-js";
import { apiCreateOrder } from "apis";
import { memo, useEffect } from "react";
import { createSearchParams, useLocation, useNavigate } from "react-router-dom";
import { getCurrentUser } from "store/user/asyncAction";
import Swal from "sweetalert2";

// This value is from the props in the UI
const style = { "layout": "vertical" };

// Custom component to wrap the PayPalButtons and show loading spinner
const ButtonWrapper = ({ showSpinner, currency, amount, payload, setIsSuccess, }) => {
    const [{ isPending, options }, dispatch] = usePayPalScriptReducer();
    const navigate = useNavigate()
    const location = useLocation()
    const handleSaveOrder = async () => {
        const res = await apiCreateOrder({ ...payload, status: 'Success' })
        if (res.success) {
            setIsSuccess(true)
            setTimeout(() => {
                Swal.fire({
                    text: 'Order was created',
                    confirmButtonText: 'Go Home',
                    title: 'Congratulation !!!',
                }).then((rs) => {
                    if (rs.isConfirmed) {
                        navigate({
                            pathname: `/`,
                        })
                    }
                })
            }, 1500)
        }
    }

    useEffect(() => {
        dispatch({
            type: 'resetOptions',
            value: {
                ...options, currency: currency
            }
        })
    }, [currency, showSpinner])


    return (
        <>
            {(showSpinner && isPending) && <div className="spinner" />}
            <PayPalButtons
                style={style}
                disabled={false}
                forceReRender={[style, currency, amount]}
                fundingSource={undefined}
                createOrder={(data, actions) => actions.order.create({
                    purchase_units: [{
                        amount: {
                            currency_code: currency, value: amount
                        }
                    }
                    ]
                }).then(orderId => orderId)}
                onApprove={(data, actions) => actions.order.capture().then(async (response) => {
                    if (response.status === 'COMPLETED') {
                        handleSaveOrder()
                    }
                })}
            />
        </>
    );
}

const Paypal = ({ amount, payload, setIsSuccess }) => {
    return (
        <div style={{ maxWidth: "750px", minHeight: "200px", margin: "auto" }}>
            <PayPalScriptProvider options={{ clientId: "test", components: "buttons", currency: "USD" }}>
                <ButtonWrapper setIsSuccess={setIsSuccess} currency={'USD'} payload={payload} amount={amount} showSpinner={false} />
            </PayPalScriptProvider>
        </div>
    );
}

export default (memo(Paypal))