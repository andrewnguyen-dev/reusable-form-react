import { Field, ErrorMessage } from "formik";
import TextError from "./TextError";
import { IconInfoCircle } from "@tabler/icons-react";
import { Tooltip } from "react-tooltip";

function RadioButtons(props) {
  const { label, name, options, withAsterisk, tooltip, ...rest } = props;
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

      <Field name={name}>
        {({ field }) => {
          return options.map((option) => {
            return (
              <div className="flex gap-2 items-center" key={option.key}>
                <input
                  type="radio"
                  id={option.value}
                  {...field}
                  {...rest}
                  value={option.value}
                  checked={field.value === option.value}
                />
                <label htmlFor={option.value} className="text-sm">{option.key}</label>
              </div>
            );
          });
        }}
      </Field>

      <ErrorMessage component={TextError} name={name} />
    </div>
  );
}

export default RadioButtons;
