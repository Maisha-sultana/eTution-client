import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

const OngoingTuitions = () => {
    const { user } = useAuth();
    const [ongoing, setOngoing] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:3000/tutor/ongoing/${user.email}`)
            .then(res => res.json())
            .then(data => setOngoing(data));
    }, [user.email]);

    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold mb-6 theme-accent-text">Ongoing Tuitions</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {ongoing.map(item => (
                    <div key={item._id} className="bg-gray-800 p-6 rounded-lg border-l-4 border-emerald-500">
                        <h2 className="text-xl font-bold">{item.subject}</h2>
                        <p className="text-gray-400">Student: {item.studentEmail}</p>
                        <p className="text-emerald-400 font-bold">Salary: {item.expectedSalary} BDT</p>
                        <span className="badge badge-success mt-2">Active</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OngoingTuitions;