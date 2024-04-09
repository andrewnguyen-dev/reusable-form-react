const SubmitButton = ({ children, formik }) => {
  return (
    <button type="submit" disabled={formik.isSubmitting} className="submit-btn">
      {children}
    </button>
  );
};

export default SubmitButton;
