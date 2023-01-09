import React, { useState, useLayoutEffect, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { fetchLogin } from "../../utils";
import Alert from "../../components/alert";

function LoginPage({ fetchLoginFallback }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const [loginError, setLoginError] = useState("");

  useLayoutEffect(() => {
    try {
      const token = localStorage.getItem("accessToken");
      if (token) setIsLogged(true);
    } catch (e) {
      setIsLogged(false);
    }
  }, []);

  const handleSubmit = async (values, actions) => {
    const { email, password } = values;
    setIsSubmitting(true);
    // setup a fallback function to test
    const res = await (fetchLoginFallback || fetchLogin)(email, password);
    if (res.status === 200) {
      setIsLogged(true);
      localStorage.setItem("accessToken", res.accessToken);
      actions.resetForm();
      setIsSubmitting(false);
    } else if (res.status === 401) {
      setLoginError(res.error);
      setIsSubmitting(false);
    }
  };
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email can't be blank"),
      password: Yup.string()
        .min(8, "Must be 8 characters or more")
        .required("Password can't be blank"),
    }),
    onSubmit: handleSubmit,
  });
  if (isLogged)
    return (
      <div className="center mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg">
          <p className="text-lg font-medium mb-4">Sign out</p>

          <button
            type="submit"
            className="block min-w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
            onClick={() => {
              try {
                localStorage.removeItem("accessToken");
                setIsLogged(false);
              } catch (e) {
                console.log(e);
              }
            }}
          >
            Logout
          </button>
        </div>
      </div>
    );
  return (
    <>
      <div className="center mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg">
          {loginError ? (
            <Alert alertType="error" alertMessage={loginError} />
          ) : null}
          <form
            onSubmit={formik.handleSubmit}
            className="mt-6 mb-0 space-y-4 rounded-lg p-8 "
          >
            <p className="text-lg font-medium">Sign in to your account</p>

            <div>
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>

              <div className="relative mt-1">
                <input
                  type="email"
                  id="email"
                  name="email"
                  data-testid="email-input"
                  className={`w-full rounded-lg ${
                    formik.errors.email ? "border-red-500" : "border-gray-200"
                  } p-4 pr-12 text-sm shadow-sm`}
                  placeholder="Enter email"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                />
              </div>
              {formik.errors.email ? (
                <span
                  data-testid="email-error-msg"
                  className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1"
                >
                  {formik.errors.email}
                </span>
              ) : null}
            </div>

            <div>
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>

              <div className="relative mt-1">
                <input
                  type="password"
                  id="password"
                  name="password"
                  data-testid="password-input"
                  className={`w-full rounded-lg ${
                    formik.errors.password
                      ? "border-red-500"
                      : "border-gray-200"
                  } p-4 pr-12 text-sm shadow-sm`}
                  placeholder="Enter password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                />
                {formik.errors.password ? (
                  <span
                    data-testid="password-error-msg"
                    className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1"
                  >
                    {formik.errors.password}
                  </span>
                ) : null}
              </div>
            </div>

            <button
              disabled={isSubmitting}
              data-testid="submit-input"
              type="submit"
              className=" block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
            >
              {isSubmitting && (
                <svg
                  className="inline mr-2 w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
              )}
              Sign in
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
