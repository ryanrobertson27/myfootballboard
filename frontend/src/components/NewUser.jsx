import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useCreateUserMutation } from "../app/services/api";

const NewUser = ({ square, setVisibilityState, setNameToAdd }) => {
  // const [name, setName] = useState('');
  // const [phone, setPhone] = useState('');
  // const [email, setEmail] = useState('');
  // const [venmo, setVenmo] = useState('');
  const [createUser] = useCreateUserMutation();

  const validate = (values) => {
    const errors = {};

    if (!values.name) {
      errors.name = "Required";
    } else if (values.name.length > 20) {
      errors.name = "Must be less than 20 characters";
    }

    if (!values.phone) {
      errors.phone = "Required";
    } else if (
      !/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(
        values.phone
      )
    ) {
      errors.phone = "Invalid Phone Format";
    }
  };

  return (
    <Formik
      initialValues={{ name: "", phone: "", email: "", venmo: "" }}
      validationSchema={validate}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          const res = await createUser({ ...values });
          console.log(res);
          if (res.data) {
            setVisibilityState("");
            setNameToAdd(res.data.name);
          }
        } catch (err) {
          console.log(err);
        }
      }}
    >
      <Form className="flex flex-col items-center">
        <Field name="name" type="text" />
        <ErrorMessage name="name" />
      </Form>
    </Formik>
  );
};

export default NewUser;
