import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


const SignUp = () => {
    const [formData, setFormData] = useState({});

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();

            const res = await fetch('/api/user/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })

            const data = await res.json();

            if (data.success === false) {
                toast.error(data.message);
                return
            }

            setFormData(data);
            navigate('/sign-in')

        } catch (error) {
            toast.error(error.message)
        }
    }
    return (
        <div className="h-screen flex items-center justify-center">
            <div className="border w-96 border-red-800 p-5">
                <h1 className="text-center text-xl font-bold mb-5">Sign Up Form</h1>

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <input
                        onChange={handleChange}
                        type="text"
                        placeholder="name"
                        id="name"
                        className="border outline-none rounded-lg p-3 border-black"
                    />
                    <input
                        onChange={handleChange}
                        type="email"
                        placeholder="email"
                        id="email"
                        className="border outline-none rounded-lg p-3 border-black"
                    />
                    <input
                        onChange={handleChange}
                        type="password"
                        placeholder="password"
                        id="password"
                        className="border outline-none rounded-lg p-3 border-black"
                    />

                    <p className="text-end text-blue-600 cursor-pointer underline">
                        forgot password?
                    </p>

                    <button className="bg-black text-white p-3 rounded-lg">
                        Sign Up
                    </button>
                </form>

                <p onClick={() => navigate('/sign-in')} className="">Sign in</p>
            </div>
        </div>
    );
};

export default SignUp;
