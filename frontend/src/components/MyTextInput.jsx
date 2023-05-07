import { useField } from "formik";

const MyTextInput = ({ children, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={props.id || props.name}>{children}</label>

      <input
        // className="mb-10 w-full rounded border border-red-800 px-2 py-1"
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <div className="-mt-5 text-red-600">{meta.error}</div>
      ) : null}
    </>
  );
};

export default MyTextInput;
