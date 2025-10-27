/* eslint-disable @typescript-eslint/no-unused-vars */
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { sendLoginData } from "../api/auth";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const setToken = useAuthStore((state) => state.setToken);
  const navigate = useNavigate();

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={Yup.object({
          email: Yup.string().email("Invalid email").required("Required"),
          password: Yup.string().min(6, "Min 6 chars").required("Required"),
        })}
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          try {
            const res = await sendLoginData(values);
            setToken(res.data.token);
            alert("Login successful!");
            navigate("/");
          } catch (err) {
            setErrors({ password: "Invalid credentials" });
          } finally {
            setSubmitting(false);
          }
        }}
      >
        <Form className="space-y-4">
          <div>
            <Field
              name="email"
              type="email"
              placeholder="Email"
              className="w-full p-2 border rounded"
            />
            <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
          </div>
          <div>
            <Field
              name="password"
              type="password"
              placeholder="Password"
              className="w-full p-2 border rounded"
            />
            <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Login
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default LoginForm;
