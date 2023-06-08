import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { BiShow, BiHide } from "react-icons/bi";
import profileimg from "../asset/profileimg.png";
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loginRedux } from '../redux/userSlice'

const Signin = () => {

    const [showPassword, setShowPassword] = useState(false);

    const [data, setData] = useState({
        email: "",
        password: "",
    });

    const navigate = useNavigate();

    const userData = useSelector(state => state);


    const dispatch = useDispatch()

    const handleShowPassword = () => {
        setShowPassword((preve) => !preve);
    };

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setData((preve) => {
            return {
                ...preve,
                [name]: value,
            };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password } = data;
        if (email && password) {
            const fetchData = await fetch(`${process.env.REACT_APP_SERVER_URL}/signin`, {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(data)
            })

            const dataRes = await fetchData.json()

            if (dataRes.alert === "true") {
                toast.success(dataRes.message);
                dispatch(loginRedux(dataRes))
                
                setTimeout(() => {
                    navigate("/");
                }, 1000);
            }
            else {
                toast.error(dataRes.message);
            }
        }
        else {
            toast.error("Please fill all the data");
        }

    };
    return (
        <div className="p-3 md:p-4 text-white">
            <div className="w-full max-w-sm text-white m-auto flex items-center flex-col p-4">
                <h1 className='text-center text-2xl font-bold mb-5'>Sign in with your accounts</h1>
                <div className="w-20 h-20 overflow-hidden rounded-full drop-shadow-md shadow-md m-auto relative ">
                    <img src={profileimg} className="w-full h-full" />
                </div>
            </div>
            <form className="m-auto py-3 flex flex-col placeholder-fifth text-left"
                style={{ maxWidth: "400px" }} onSubmit={handleSubmit}>
                <label htmlFor='email'>Email address</label>
                <div className="w-full flex px-2 py-1 bg-fourth  mt-1 mb-2 rounded focus-within:outline focus-within:outline-primary">
                    <input
                        type={"text"}
                        id="email"
                        name="email"
                        placeholder='Email'
                        className=" bg-fourth text-black w-full border-none outline-none"
                        value={data.email}
                        onChange={handleOnChange}
                    />
                </div>
                <label htmlFor='password'>Password</label>
                <div className="w-full flex px-2 py-1 bg-fourth  mt-1 mb-2 rounded focus-within:outline focus-within:outline-primary">
                    <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        name="password"
                        placeholder='Password'
                        className=" bg-fourth text-black w-full border-none outline-none"
                        value={data.password}
                        onChange={handleOnChange}
                    />
                    <span className="flex text-xl cursor-pointer text-black" onClick={handleShowPassword}>
                        {showPassword ? <BiShow /> : <BiHide />}
                    </span>
                </div>
                <button className="w-full max-w-[150px] m-auto  bg-sixth hover:bg-primary cursor-pointer  text-black text-xl font-bold text-center py-1 rounded-full mt-4">
                    Sign in
                </button>
            </form>
            <hr></hr>
            <div className="w-full max-w-sm text-white m-auto flex items-center flex-col p-4">
                <h1 className='text-center text-xl '>Don’t have account?</h1>
            </div>
            <Link to={"/signup"} className=" max-w-sm text-fifth bg-seventh rounded m-auto flex items-center flex-col p-1 cursor-pointer"
                style={{ maxWidth: "400px" }}>
                <p className='text-center text-xl font-semibold'>Create New Account</p>
            </Link>
        </div>
    )
}
export default Signin