import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchUsers = () => {
        fetch('https://e-tution-server-nine.vercel.app/users')
            .then(res => res.json())
            .then(data => {
                setUsers(data);
                setLoading(false);
            });
    };

    useEffect(() => { fetchUsers(); }, []);

    const handleRoleChange = async (user, newRole) => {
        const res = await fetch(`https://e-tution-server-nine.vercel.app/users/${user._id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...user, role: newRole })
        });
        if (res.ok) {
            Swal.fire('Updated!', `User role changed to ${newRole}`, 'success');
            fetchUsers();
        }
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "This will permanently delete the user account!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await fetch(`https://e-tution-server-nine.vercel.app/users/${id}`, { method: 'DELETE' });
                if (res.ok) {
                    Swal.fire('Deleted!', 'User has been removed.', 'success');
                    fetchUsers();
                }
            }
        });
    };

    if (loading) return <span className="loading loading-spinner text-emerald-400"></span>;

    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold mb-6 theme-accent-text">User Management</h1>
            <div className="overflow-x-auto bg-gray-800 rounded-xl border border-gray-700">
                <table className="table w-full text-white">
                    <thead>
                        <tr className="text-emerald-400 border-b border-gray-700">
                            <th>User</th>
                            <th>Role</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(u => (
                            <tr key={u._id} className="border-b border-gray-700/50">
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={u.image || 'https://via.placeholder.com/150'} alt={u.name} />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{u.name}</div>
                                            <div className="text-sm opacity-50">{u.email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <select 
                                        className="select select-sm bg-gray-700 text-white border-none"
                                        value={u.role}
                                        onChange={(e) => handleRoleChange(u, e.target.value)}
                                    >
                                        <option value="Student">Student</option>
                                        <option value="Tutor">Tutor</option>
                                        <option value="Admin">Admin</option>
                                    </select>
                                </td>
                                <td>
                                    <button onClick={() => handleDelete(u._id)} className="btn btn-ghost btn-xs text-red-400">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserManagement;