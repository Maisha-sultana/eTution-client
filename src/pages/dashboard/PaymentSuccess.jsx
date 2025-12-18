// src/pages/dashboard/PaymentSuccess.jsx
import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get('session_id');
    const navigate = useNavigate();

    useEffect(() => {
        if (sessionId) {
            fetch(`http://localhost:3000/payment-verify?session_id=${sessionId}`, {
                method: 'PATCH'
            })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    Swal.fire("Success!", "Tutor hired and payment verified.", "success");
                    navigate('/dashboard/student/applied-tutors');
                }
            });
        }
    }, [sessionId, navigate]);

    return (
        <div className="flex justify-center items-center min-h-screen text-white">
            <div className="text-center">
                <span className="loading loading-spinner loading-lg text-emerald-400"></span>
                <p className="mt-4">Verifying your payment, please wait...</p>
            </div>
        </div>
    );
};

export default PaymentSuccess;