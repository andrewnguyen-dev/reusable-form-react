const ResetButton = ({ children, formik }) => {
  return (
    <button type="submit" className="reset-btn" onClick={formik.handleReset}>
      {children}
    </button>
  );
};

export default ResetButton;
