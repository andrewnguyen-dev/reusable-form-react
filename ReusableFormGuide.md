# Overview
MyForm is a reusable React component built with Formik to handle form state management and validation. It is designed to be flexible and extensible for various types of forms by customizing initial values, validation schemas, and the UI components used in the form.

# Features
- **Dynamic Initialization**: Fetches initial form values from an API simulation.
- **Form Validation**: Uses Yup schema for field validations.
- **Custom Form Controls**: Includes custom input components like `Input`, `TextArea`, `Select`, `CheckboxGroup`, `RadioButtons`, etc., wrapped in a `FormikControl` for easier integration.
- **Error Handling**: Displays errors and handles loading states.
- **Navigation Prompt**: Warns users about unsaved changes before navigating away.


# Usage

## 1. Basic Setup

- Place `MyForm.jsx` and its dependencies within your project.
- Ensure Formik, Yup, and all custom input components (`Input`, `TextArea`, etc.) are available.

## 2. Customization

- Initial Values: Modify the `initialValues` state to suit the needs of the new form.
- Validation Schema: Update the `validationSchema` according to the requirements of the new form fields.
- Form Fields: Add or remove `FormikControl` calls in the render method to match the fields needed. Each control supports different props:
    - `control`: Type of control (`input`, `textarea`, `select`, etc.).
    - `name`: Name of the field which ties it to the form state.
    - `label`: Display label for the field.
    - `options`: (if applicable) For `select`, `checkbox`, and `radio` controls.
    - `placeholder`: Placeholder for the field.
    - `withAsterisk`: If the field is required
    - `disabled`: Disable the field

## 3. API Integration

- Fetching Initial Data: Modify the `fakeFetchInitialValues` function or replace it with a real API call.
- Submitting Data: Change the `onSubmit` method to integrate with your backend API.


# Example of Adding a New Field

## To add a new field to the form:

```jsx
<FormikControl
  control="input"
  type="text"
  label="New Field"
  name="newField"
  placeholder="Enter new field value"
/>
```

## Handling Form Submission
The `onSubmit` method handles form submissions:
```jsx

const onSubmit = (values, { setSubmitting }) => {
  console.log("Form Values:", values);
  // Integrate API submission logic here
};
```

# Files Structure
Ensure the following files are included and properly imported in your project:

- `MyForm.jsx`: Main form component.
- `FormikControl.jsx`: Abstraction layer for different form controls.
- `Input.jsx`, `TextArea.jsx`, `Select.jsx`, etc.: Specific form control implementations.
- `ResetButton.jsx`, `SubmitButton.jsx`: Form action buttons.
