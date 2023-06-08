import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { BiShow, BiHide } from "react-icons/bi";
import profileimg from "../asset/profileimg.png";
import profilejpg from "../asset/profileimg.jpg";
import { ImagetoBase64 } from "../utils/ImagetoBase64";
import { toast } from 'react-hot-toast';

const Signup = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const defaultImageBase64 = 'data:image/png;base64,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';
    const [data, setData] = useState({
        email: "",
        username: "",
        password: "",
        confirmpassword: "",
        image: defaultImageBase64,
    });


    const handleShowPassword = () => {
        setShowPassword((preve) => !preve);
    };

    const handleShowConfirmPassword = () => {
        setShowConfirmPassword((preve) => !preve);
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
    const handleUploadProfileImage = async (e) => {
        if (e.target.files.length > 0) {
          const data = await ImagetoBase64(e.target.files[0]);
          setData((prev) => {
            return {
              ...prev,
              image: data,
            };
          });
        } else {
          setData((prev) => {
            return {
              ...prev,
              image: defaultImageBase64,
            };
          });
        }
      };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, username, password, confirmpassword,image } = data;
        if (email && username && password && confirmpassword) {
            if (password === confirmpassword) {
                const fetchData = await fetch(`${process.env.REACT_APP_SERVER_URL}/signup`, {
                    method: "POST",
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify(data)
                })

                const dataRes = await fetchData.json()
                // alert(dataRes.message);
                if (dataRes.alert === "true") {
                    toast.success(dataRes.message);
                    navigate("/signin");
                }
                else if (dataRes.alert === "false")
                    toast.error(dataRes.message);
            }
            else {
                toast.error("Password and Confirm Password not match");
            }
        }
        else {
            toast.error("Please fill all the data");
        }
    };


    return (
        <div className="p-3 md:p-4 text-white">
            <div className="w-full max-w-sm text-white m-auto flex items-center flex-col p-4">
                <h1 className='text-center text-2xl font-bold mb-5'>Create your account</h1>
                <div className="w-20 h-20 overflow-hidden rounded-full drop-shadow-md shadow-md m-auto relative ">
                    <img src={data.image ? data.image : profileimg} className="w-full h-full" />
                    <label htmlFor="profileImage">
                        <div className='absolute bottom-0 h-1/3 w-full bg-opacity-50 bg-cyan-900 text-center cursor-pointer'>
                            <p className='text-sm text-center'>Upload</p>
                        </div>
                        <input type="file" id="profileImage" accept="image/*" className='hidden' onChange={handleUploadProfileImage} />
                    </label>
                </div>
            </div>
            <form className="m-auto py-3 flex flex-col placeholder-fifth text-left"
                style={{ maxWidth: "400px" }} onSubmit={handleSubmit} >
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
                <label htmlFor='username'>Username</label>
                <div className="w-full flex px-2 py-1 bg-fourth  mt-1 mb-2 rounded focus-within:outline focus-within:outline-primary">
                    <input
                        type={"text"}
                        id="username"
                        name="username"
                        placeholder='Username'
                        className=" bg-fourth text-black w-full border-none outline-none"
                        value={data.username}
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
                <label htmlFor="confirmpassword">Confirm Password</label>
                <div className="w-full flex px-2 py-1 bg-fourth  mt-1 mb-2 rounded focus-within:outline focus-within:outline-primary">
                    <input
                        type={showConfirmPassword ? "text" : "password"}
                        id="confirmpassword"
                        name="confirmpassword"
                        placeholder='Confirm Password'
                        className=" bg-fourth text-black w-full border-none outline-none"
                        value={data.confirmpassword}
                        onChange={handleOnChange}
                    />
                    <span className="flex text-xl cursor-pointer text-black" onClick={handleShowConfirmPassword}>
                        {showConfirmPassword ? <BiShow /> : <BiHide />}
                    </span>
                </div>
                <button className="w-full max-w-[150px] m-auto  bg-sixth hover:bg-primary cursor-pointer  text-black text-xl font-bold text-center py-1 rounded-full mt-4">
                    Sign up
                </button>
            </form>
            <div className="w-full max-w-sm text-white m-auto flex items-center flex-col p-4">
                <h1 className='text-center text-xl '>Don’t have account?{" "}
                    <Link to="/signin" className='underline hover:text-primary' >
                        Sign in
                    </Link>
                </h1>
            </div>
        </div>
    )
}

export default Signup