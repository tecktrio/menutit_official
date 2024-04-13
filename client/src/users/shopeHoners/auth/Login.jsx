import { useDispatch } from "react-redux";
import { logIn } from "../api/AuthRequests";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { setLogin } from "../../../redux/reducer/AuthReducer";

export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = {
      email: event.target.email.value,
      password: event.target.password.value,
    };
    console.log("loginData:",formData);
    try {
      const responseData = await logIn(formData); //Api calling
      dispatch(setLogin(responseData)); //despach

      const sessionData = sessionStorage.getItem("persist:root");
      if (sessionData) {
        const parceData = JSON.parse(sessionData);
        const token = JSON.parse(parceData.AuthUser).token;


        if (token) {
          navigate("/");
        } else {
          const errorMessage = "please register your account";
          setErrorMessage(errorMessage);
        }

        
      }
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };
  return (
    <div>
      <div className="flex justify-center items-center h-screen w-full">
        <div className="flex flex-col max-w-md w-full p-5 rounded-md sm:p-10 dark:bg-gray-900 dark:text-gray-100">
          <div className="mb-8 text-center">
            <h1 className="my-3 text-4xl font-bold text-white">Sign in</h1>
            <p className="text-sm dark:text-gray-400">
              Sign in to access your account
            </p>
            {errorMessage}
          </div>
          <form  onSubmit={(event) => handleSubmit(event, navigate)} noValidate="" action="" className="space-y-12">
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block mb-2 text-sm">
                  Email address
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter Your User Name"
                  className="w-full px-3 py-2 border rounded-md dark:border-gray-700 dark:bg-gray-900 focus:outline-none dark:text-gray-100"
                />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <label htmlFor="password" className="text-sm">
                    Password
                  </label>
                </div>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="*****"
                  className="w-full px-3 py-2 border rounded-md dark:border-gray-700 dark:bg-gray-900 focus:outline-none dark:text-gray-100"
                />
              </div>
            </div>
            {/* <p  className="text-sm text-center text-red-600 ">{{ errorMsg }}</p>
			<p  className="text-sm text-center text-red-600 ">{{ errorMsg2 }}</p> */}
            <div className="space-y-2">
              <div>
                <button
                  type="submit"
                  className="w-full px-8 py-3 font-semibold rounded-md dark:bg-violet-400 dark:text-gray-900"
                >
                  Sign in
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
