import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useLocation } from "react-router-dom";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe("your_publishable_key_here");

const Payment = () => {
    const location = useLocation();
    const application = location.state?.application;

    if (!application) return <div className="text-white">No data!</div>;

    return (
        <div className="max-w-2xl mx-auto py-10">
            <h2 className="text-3xl font-bold theme-accent-text mb-6 text-center">Checkout</h2>
            <div className="bg-gray-800 p-8 rounded-xl shadow-2xl border border-emerald-400/20">
                <p className="text-gray-300 mb-6">Tutor: <span className="font-bold">{application.tutorName}</span></p>
                <Elements stripe={stripePromise}>
                    <CheckoutForm application={application} />
                </Elements>
            </div>
        </div>
    );
};

export default Payment;