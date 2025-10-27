// src/api/auth.ts

export interface LoginValues {
  email: string;
  password: string;
}


export interface SignupValues {
  name: string,
  email: string;
  password: string;
}



export const sendLoginData = async (values: LoginValues) => {
  const saved = localStorage.getItem("auth_user");
  if (!saved) throw new Error("No user registered");

  const user = JSON.parse(saved);
  if (user.email === values.email && user.password === values.password) {
    return { data: { token: "local-token" } };
  } else {
    throw new Error("Invalid credentials");
  }
};


export const sendSignupData = async (values: SignupValues) => {
  localStorage.setItem("auth_user", JSON.stringify(values));
  return { data: { token: "local-token" } };
};
