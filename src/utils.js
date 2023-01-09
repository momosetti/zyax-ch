import axios from "axios";

export const BASE_URL = "https://test.zyax.se";

export const fetchLogin = async (email, password) => {
  try {
    let response = await axios({
      method: "post",
      url: `${BASE_URL}/access`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      data: {
        email,
        password,
      },
    });
    const { data } = response;
    const { accessToken } = data;
    return { accessToken, status: 200 };
  } catch (e) {
    return { error: e.response.data.error, status: 401 };
  }
};
