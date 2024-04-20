"use client";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation"


export default function SignupBody() {
  const router = useRouter()
  const [formInput, setFormInput]  = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirmPassword: "",

  });

  //state for handling error
  const [formError, setFormError] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const registerUser = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    let inputError = {
      email: "",
      password: "",
      confirmPassword: "",
    };

    if (!formInput.email && !formInput.password) {
      setFormError({
        ...inputError,
        email: "Enter valid email address",
        password: "Password should not be empty",
      });
      return
    }

    if (!formInput.email) {
      setFormError({
        ...inputError,
        email: "Enter valid email address",
      });
      return
    }

    if (formInput.confirmPassword !== formInput.password) {
      setFormError({
        ...inputError,
        confirmPassword: "Password and confirm password should be same",
      });
      return;
    }

    if (!formInput.password) {
      setFormError({
        ...inputError,
        password: "Password should not be empty",
      });
      return
    }

    setFormError(inputError);

    axios
      .post("/api/registerApi", formInput)
      .then(() =>
        setFormInput({
          first_name: "",
          last_name: "",
          email: "",
          password: "",
          confirmPassword:""
        })
      )
      .then(() =>
        toast(" ✅ Successful Registration ! Proceed to login🎉", {
          duration: 5000,
          // Styling
          style: {},
          className: "",

          ariaProps: {
            role: "status",
            "aria-live": "polite",
          },


        })


      )

      .catch(() => toast("Something went wrong😔!", {
        duration: 5000,
        // Styling
        style: {},
        className: "",

        ariaProps: {
          role: "status",
          "aria-live": "polite",
        },
      })
     );
  };

  
 

  return (
    <>
      <div
        className="flex justify-center items-center min-h-screen bg-cover"
        style={{ backgroundImage: 'url("./medics1.jpg")' }}
      >
        <div className="w-full sm:max-w-sm p-4 bg-light-grey rounded-lg bg-opacity-35">
          <h2 className="text-2xl font-bold text-white text-center">
            Create your account!
          </h2>

          <form className="mt-4 space-y-6" onSubmit={registerUser}>
            <div className=" p-2">
              <label
                htmlFor="first_name"
                className="block text-sm font-medium leading-6 text-white"
              >
                First Name
              </label>

              <div className="mt-1">
                <input
                  placeholder=" e.g. John"
                  id="first_name"
                  name="first_name"
                  type="text"
                  value={formInput.first_name}
                  onChange={(e) =>
                      setFormInput({
                      ...formInput,
                      first_name: e.target.value,
                    })
                  }
                  required
                  className="h-6 block w-full rounded-sm border-gray-300 shadow-sm placeholder-gray-400 sm:text-sm focus:border-brand-blue focus:outline-none focus:ring-1 focus:ring-brand-blue"
                />
              </div>
            </div>

            <div className=" p-2">
              <label
                htmlFor="text"
                className="block text-sm font-medium leading-6 text-white"
              >
                Last Name
              </label>

              <div className="mt-1">
                <input
                  placeholder=" e.g. Doe"
                  id="last_name"
                  name="last_name"
                  type="last_name"
                  value={formInput.last_name}
                  onChange={(e) =>
                      setFormInput({
                      ...formInput,
                      last_name: e.target.value,
                    })
                  }
                  required
                  className="h-6 block w-full rounded-sm border-gray-300 shadow-sm placeholder-gray-400 sm:text-sm focus:border-brand-blue focus:outline-none focus:ring-1 focus:ring-brand-blue"
                />
              </div>
            </div>

            <div className="p-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-white"
              >
                Email address
              </label>

              <div className="mt-1">
                <input
                  placeholder=" e.g. johndoe@gmail.com"
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={formInput.email}
                  onChange={(e) =>
                      setFormInput({ ...formInput, email: e.target.value })
                  }
                  required
                  className="h-6 block w-full rounded-sm border-gray-300 shadow-sm placeholder-gray-400 sm:text-sm focus:border-brand-blue focus:outline-none focus:ring-1 focus:ring-brand-blue"
                />
                   <p className="error-message">{formError.email}</p>
              </div>
            </div>

            <div className="p-2">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-white"
              >
                Password
              </label>

              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={formInput.password}
                  onChange={(e) =>
                      setFormInput({
                      ...formInput,
                      password: e.target.value,
                    })
                  }
                  className="h-6 block w-full rounded-sm border-gray-300 shadow-sm placeholder-gray-400 sm:text-sm focus:border-brand-blue focus:outline-none focus:ring-1 focus:ring-brand-blue"
                />
                  <p className="error-message">{formError.password}</p>
              </div>

            </div>

            <div className="p-2">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium leading-6 text-white"
              >
               Confirm Password
              </label>

      
              <div className="mt-1">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="current-password" //remove ?
                  required
                  value={formInput.confirmPassword}
                  onChange={(e) =>
                      setFormInput({
                      ...formInput,
                      confirmPassword: e.target.value,
                    })
                  }
                  className="h-6 block w-full rounded-sm border-gray-300 shadow-sm placeholder-gray-400 sm:text-sm focus:border-brand-blue focus:outline-none focus:ring-1 focus:ring-brand-blue"
                />
                  <p className="error-message">{formError.confirmPassword}</p>
              </div>

            </div>

            <div>
              <button
                type="submit"
                className=" transition-transform transform-gpu hover:translate-y-1  w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-semibold text-white bg-brand-blue"
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}