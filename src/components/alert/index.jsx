import React from "react";
const Alert = ({ alertType = "default", alertMessage = "" }) => {
  const [isOn, setIsOn] = React.useState(false);
  const errorMessageSchema = {
    "No access": "Your email or passward aren't correct",
  };
  const alertSchema = {
    default: {
      class:
        "text-blue-700 bg-blue-100 rounded-lg dark:bg-blue-200 dark:text-blue-800",
      title: "Info",
    },
    error: {
      class:
        "text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800",
      title: "Error",
    },
    success: {
      class:
        "text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800",
      title: "Success",
    },
  };
  // React.useEffect(() => {
  //   setIsOn(true);
  //   setTimeout(() => {
  //     setIsOn(false);
  //   }, 2000);
  // }, [alertMessage]);
  // if (!isOn) return null;
  return (
    <div
      className={`flex p-4 mb-4 text-sm ${alertSchema[alertType].class}`}
      role="alert"
    >
      <svg
        aria-hidden="true"
        className="flex-shrink-0 inline w-5 h-5 mr-3"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
          clipRule="evenodd"
        ></path>
      </svg>
      <span className="sr-only"></span>
      <div data-testid="login-form-message">
        <span className="font-medium">{alertSchema[alertType].title}! </span>
        {errorMessageSchema[alertMessage]}
      </div>
    </div>
  );
};
export default Alert;
