import React,{useState} from 'react'
import { Link,useNavigate } from "react-router-dom";
import { BiShow, BiHide } from "react-icons/bi";
import profileimg from "../asset/profileimg.png";
import { ImagetoBase64 } from "../utils/ImagetoBase64";
import { toast } from 'react-hot-toast';

const Signup = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [data, setData] = useState({
        email: "",
        username: "",
        password: "",
        confirmpassword: "",
        image: ""
    });

    console.log(data);

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
        const data = await ImagetoBase64(e.target.files[0]);
        console.log(data);

        setData((preve) => {
            return {
                ...preve,
                image: data,
            };
        })
    };
console.log(process.env.REACT_APP_SERVER_URL);
    const handleSubmit = async(e) => {
        e.preventDefault();
        const { email, username, password, confirmpassword } = data;
        if (email && username && password && confirmpassword) {
            if (password === confirmpassword) {
                const fetchData = await fetch(`${process.env.REACT_APP_SERVER_URL}/signup`,{
                    method : "POST",
                    headers : {
                      "content-type" : "application/json"
                    },
                    body : JSON.stringify(data)
                })

                const dataRes = await fetchData.json()
                console.log(dataRes);
            // alert(dataRes.message);
            if(dataRes.alert === "true"){
                toast.success(dataRes.message);
                navigate("/signin");
            }
            else if(dataRes.alert === "false")
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
                <input type="file" id="profileImage" accept="image/*" className='hidden' onChange={handleUploadProfileImage}/>
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
            {showPassword ?<BiShow/>:<BiHide/>}
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
            {showConfirmPassword ?<BiShow/>:<BiHide/>}
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