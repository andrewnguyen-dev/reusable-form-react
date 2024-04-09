import { Field, ErrorMessage } from "formik";
import TextError from "./TextError";
import { IconInfoCircle } from "@tabler/icons-react";
import { Tooltip } from "react-tooltip";

const Input = (props) => {
  const { label, name, placeholder, withAsterisk, disabled, tooltip, ...rest } =
    props;
  return (
    <div className="form-control">
      <div className="flex items-center gap-1">
        <label htmlFor={name} className="label">
          {label}
        </label>
        {withAsterisk && <span className="asterisk"> *</span>}
        {tooltip && (
          <>
            <IconInfoCircle
              color="#374151"
              size={16}
              stroke={1.5}
              id="icon-info"
            />
            <Tooltip anchorSelect="#icon-info" className="max-w-sm z-50">
              {tooltip}
            </Tooltip>
          </>
        )}
      </div>

      <Field
        id={name}
        name={name}
        placeholder={placeholder}
        disabled={disabled}
        {...rest}
        className="input"
      />
      
      <ErrorMessage name={name} component={TextError} />
    </div>
  );
};

export default Input;
