import axios from "axios";

//login user
export const loginUser = async (email: string, password: string) => {
  try {
    const res = await axios.post(
      "http://localhost:8080/api/v1/user/auth/login",
      {
        email,
        password,
      }
    );

    if (res.status === 200) {
      const data = await res.data;
      return data;
    } else {
      throw new Error("Login failed");
    }
  } catch (error) {
    console.error("Error occurred during login:", error);
    throw error;
  }
};

//signupuser
export const signupUser = async (
  name: string,
  email: string,
  password: string
) => {
  const res = await axios.post(
    "http://localhost:8080/api/v1/user/auth/signup",
    {
      name,
      email,
      password,
    }
  );
  if (res.status !== 201) {
    throw new Error("Unable to Signup");
  }
  const data = await res.data;
  return data;
};

//fetch file
export const fetchFileData = async (userId: string, pdfId: string) => {
 
  const response = await axios.get(
    `http://localhost:8080/api/v1/user/file/getfile/${userId}/${pdfId}`
  );
  return response;
};

export const getAllFiles = async (userId: string) => {
  if (!userId) {
    return;
  }
  const res = axios.get(
    `http://localhost:8080/api/v1/user/file/getallfiles/${userId}`
  );
  return (await res).data;
};
