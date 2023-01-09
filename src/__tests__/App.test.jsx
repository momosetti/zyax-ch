import React from "react";
import {
  render,
  screen,
  fireEvent,
  cleanup,
  act,
  waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LoginPage from "../pages/login";

afterEach(cleanup);
const user = userEvent.setup();

describe("test the login form", () => {
  test("the form is initially rendered with empty fields", () => {
    render(<LoginPage />);
    // screen.debug();
    // check if App components renders headline
    expect(screen.getByTestId("email-input")).toHaveValue("");
    expect(screen.getByTestId("password-input")).toHaveValue("");
  });
  test("the form displays an error message if the email address/password is blank", async () => {
    // Arrange
    render(<LoginPage />);

    // Act
    await user.click(screen.getByRole("button", { name: /Sign in/i }));

    // Assert
    await waitFor(() => {
      expect(screen.getByTestId("email-error-msg")).toHaveTextContent(
        "Email can't be blank"
      );
      expect(screen.getByTestId("password-error-msg")).toHaveTextContent(
        "Password can't be blank"
      );
    });
  });
  test("The form displays an error message if the login fails", async () => {
    // Arrange
    const fetchFailedLoginMock = jest.fn();
    fetchFailedLoginMock.mockReturnValueOnce({
      error: "No access",
      status: 401,
    });
    render(<LoginPage fetchLoginFallback={fetchFailedLoginMock} />);

    // Act
    await user.type(screen.getByLabelText(/email/i), "test@test.com");
    await user.type(screen.getByLabelText(/password/i), "12345678");
    await user.click(screen.getByRole("button", { name: /Sign in/i }));
    const errorMessage = await screen.findByTestId("login-form-message");

    // Assert
    await waitFor(() => {
      expect(errorMessage).toBeInTheDocument();
    });
  });

  test("The form stores the access token in local storage if the login is successful", async () => {
    // Arrange
    const fetchSuccesLoginMock = jest.fn();
    fetchSuccesLoginMock.mockReturnValueOnce({
      accessToken: "accessToken",
      status: 200,
    });
    render(<LoginPage fetchLoginFallback={fetchSuccesLoginMock} />);

    //Act
    await user.type(screen.getByLabelText(/email/i), "test@zyax.se");
    await user.type(screen.getByLabelText(/password/i), "!zyaxSe981");
    await user.click(screen.getByRole("button", { name: /Sign in/i }));

    // Assert
    expect(fetchSuccesLoginMock).toHaveBeenCalled();
    expect(window.localStorage.getItem("accessToken")).not.toBeNull();
  });
});
describe("Test the logout button behavour", () => {
  test("The form show logout button when the localStorage accessToken is stored", () => {
    // Arrange
    window.localStorage.setItem("accessToken", "accessToken");
    render(<LoginPage />);
    const logoutButton = screen.getByRole("button", { name: /Logout/i });

    // Assert
    expect(logoutButton).toBeInTheDocument();
  });
  test("The logout button should remove the accessToken from the localStorage", async () => {
    // Arrange
    window.localStorage.setItem("accessToken", "accessToken");
    render(<LoginPage />);

    // Act
    await user.click(screen.getByRole("button", { name: /Logout/i }));

    // Assert
    expect(window.localStorage.getItem("accessToken")).toBeNull();
  });
});
