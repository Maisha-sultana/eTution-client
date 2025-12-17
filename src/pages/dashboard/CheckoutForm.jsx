import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import Swal from "sweetalert2";

const CheckoutForm = ({ application }) => {
    const stripe = useStripe();
    const elements = useElements();
    const { user } = useAuth();
    const [clientSecret, setClientSecret] = useState("");
    const [processing, setProcessing] = useState(false);

    useEffect(() => {
        if (application?.expectedSalary > 0) {
            fetch("http://localhost:3000/create-payment-intent", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ price: application.expectedSalary }),
            })
            .then(res => res.json())
            .then(data => setClientSecret(data.clientSecret));
        }
    }, [application]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) return;

        const card = elements.getElement(CardElement);
        if (card == null) return;

        setProcessing(true);
        const { error, paymentMethod } = await stripe.createPaymentMethod({ type: 'card', card });

        if (error) {
            Swal.fire("Error", error.message, "error");
            setProcessing(false);
            return;
        }

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: { email: user?.email, name: user?.displayName },
            },
        });

        if (confirmError) {
            Swal.fire("Error", confirmError.message, "error");
        } else if (paymentIntent.status === "succeeded") {
            const paymentInfo = {
                transactionId: paymentIntent.id,
                studentEmail: user.email,
                amount: application.expectedSalary,
                applicationId: application._id,
                tuitionId: application.tuitionId,
                date: new Date(),
            };

            const res = await fetch("http://localhost:3000/payments", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(paymentInfo),
            });
            
            if (res.ok) {
                Swal.fire("Success", "Tutor hired successfully!", "success");
            }
        }
        setProcessing(false);
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 bg-gray-700 rounded-lg">
            <CardElement options={{ style: { base: { fontSize: '16px', color: '#fff' } } }} />
            <button className="btn bg-emerald-500 w-full mt-6" type="submit" disabled={!stripe || !clientSecret || processing}>
                {processing ? "Processing..." : `Pay ${application.expectedSalary} BDT`}
            </button>
        </form>
    );
};

export default CheckoutForm;