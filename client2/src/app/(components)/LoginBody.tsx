'use client'
import { useState } from "react";
import { signIn } from 'next-auth/react'
import { toast } from "react-hot-toast"
import { useRouter } from "next/navigation"

export default function LoginBody() {
  const router = useRouter()
  const [data, setData] = useState({
    email: "",
    password: ""
  });

  const loginUser = async (e: { preventDefault: () => void; }) => {
    e.preventDefault()
    signIn('credentials', {
      ...data,
      redirect: false
    })
      .then((callback) => {
        if (callback?.error) {
          toast.error("Wrong credentials, 😞try again")
          console.log(callback.error)
        } else if (callback?.ok) {
          toast.success('Logged in successfully! 🎊')
          router.push('/chat') // Redirect to chat page upon successful login
        }
      })
  }

  return (
    <>
      <div className="flex justify-center items-center min-h-screen border border-red-800 bg-cover" style={{ backgroundImage: 'url("./medics1.jpg")' }}>

        <div className="w-full sm:max-w-sm p-4 bg-light-grey rounded-lg bg-opacity-35">

          <h2 className="text-2xl font-bold text-white text-center">
            Welcome Back !
          </h2>

          <form className="mt-4 space-y-6" onSubmit={loginUser}>

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
                  value={data.email}
                  onChange={(e) =>
                    setData({ ...data, email: e.target.value })
                  }
                  required
                  className="h-6 block w-full rounded-sm border-gray-300 shadow-sm placeholder-gray-400 sm:text-sm focus:border-brand-blue focus:outline-none focus:ring-1 focus:ring-brand-blue"
                />
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
                  value={data.password}
                  onChange={(e) =>
                    setData({ ...data, password: e.target.value })
                  }
                  className="h-6 block w-full rounded-sm border-gray-300 shadow-sm placeholder-gray-400 sm:text-sm focus:border-brand-blue focus:outline-none focus:ring-1 focus:ring-brand-blue"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="transition-transform transform-gpu hover:translate-y-1  w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-semibold text-white bg-brand-blue"
              >
                Login In
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
