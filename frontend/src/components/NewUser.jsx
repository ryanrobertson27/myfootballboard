import { useState } from 'react';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useCreateUserMutation } from '../app/services/users';

const NewUser = ({ square, setVisibilityState, setNameToAdd }) => {
  // const [name, setName] = useState('');
  // const [phone, setPhone] = useState('');
  // const [email, setEmail] = useState('');
  // const [venmo, setVenmo] = useState('');
  const [createUser] = useCreateUserMutation();

  return (
    <Formik
      initialValues={{ name: '', phone: '', email: '', venmo: '' }}
      // validationSchema={Yup.object({
      //   name: Yup.string()
      //     .min(4, 'Must be more than 4 characters')
      //     .max(20, 'Must be less than 20 characters')
      //     .required('Required'),
      //   phone: Yup.number().required('Required'),
      //   email: Yup.string().required('Required'),
      //   venmo: Yup.string()
      //     .max(30, 'must be less than 30 characters')
      //     .required('Required'),
      // })}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          const res = await createUser({ ...values });
          console.log(res);
          if (res.data) {
            setVisibilityState('');
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
