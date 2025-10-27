import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { sendSignupData } from "../api/auth";
import { useAuthStore } from "../store/authStore";

const SignupForm = () => {
  const setToken = useAuthStore((state) => state.setToken);

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>
      <Formik
        initialValues={{ name: "", email: "", password: "" }}
        validationSchema={Yup.object({
          name: Yup.string().required("Name is required"),
          email: Yup.string().email("Invalid email").required("Email is required"),
          password: Yup.string().min(6, "Minimum 6 characters").required("Password is required"),
        })}
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          try {
            const res = await sendSignupData(values);
            setToken(res.data.token);
            alert("Signup successful!");
          } catch (err) {
            setErrors({ email: "Signup failed. Try again." });
          } finally {
            setSubmitting(false);
          }
        }}
      >
        <Form className="space-y-4">
          <div>
            <Field
              name="name"
              type="text"
              placeholder="Name"
              className="w-full p-2 border rounded"
            />
            <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
          </div>
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
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            Sign Up
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default SignupForm;