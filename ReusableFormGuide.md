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
    - ...

## 3. API Integration

- Fetching Initial Data: Modify the `fakeFetchInitialValues` function or replace it with a real API call.
- Submitting Data: Change the `onSubmit` method to integrate with your backend API.


# Examples

## Adding a New Field

### To add a new field to the form:

```jsx
<FormikControl
  control="input"
  type="text"
  label="New Field"
  name="newField"
  placeholder="Enter new field value"
/>
```

### Handling Form Submission
The `onSubmit` method handles form submissions:
```jsx

const onSubmit = (values, { setSubmitting }) => {
  console.log("Form Values:", values);
  // Integrate API submission logic here
};
```

## Conditionally Disabled/Enabled Form Elements + Fetching and Populating data using the useFetchData hook

### Objective
Implement a form where certain fields are enabled or disabled based on the selection of previous fields. This scenario commonly occurs in forms that require a cascading select experience, where the choices in one dropdown determine the available options in the subsequent dropdowns.

### Scenario
In our example, the StudentRegistrationForm uses three cascading dropdowns: School, Course, and Subject. Each dropdown is dependent on the selection of the previous one, i.e., users can select a Course only after a School is selected and a Subject only after selecting a Course.

## Fetching Data for Each Dropdown
Each dropdown's options are fetched based on the selection of the previous field. This dependency is managed using React Query's dependency array feature, which re-fetches data when the dependency value changes.

1. Schools Dropdown
- Fetches all schools initially using the useFetchData hook.
2. Courses Dropdown
- Fetches courses based on the selected `school`. The fetching process is triggered when the `school` field in the form state changes.
- Resets the `course` field in the form whenever the school changes to **ensure that stale course selections are not retained**.
3. Subjects Dropdown
- Similar to the Courses dropdown, the Subjects are fetched based on the selected `course`.
- Resets the `subject` field whenever the `course` selection changes.

**Code Implementation**
```jsx
// Inside StudentRegisterForm component

// Fetch schools
const allSchools = useFetchData(["fetchSchools"], fetchSchools);

// Fetch courses based on the selected school
const correspondingCourses = useFetchData(
  ["fetchCorrespondingCourses", formikState.school],
  async () => {
    // Reset course field when school changes
    if (formikState.school) {
      formikRef.current.setFieldValue("course", "");
      formikRef.current.setFieldTouched("course", false);
    }
    return await fetchCorrespondingCourses(formikState.school);
  },
  !!formikState.school // Enable the query when school is selected
);

// Fetch subjects based on the selected course
const correspondingSubjects = useFetchData(
  ["fetchCorrespondingSubjects", formikState.course],
  async () => {
    // Reset subject field when course changes
    if (formikState.course) {
      formikRef.current.setFieldValue("subject", "");
      formikRef.current.setFieldTouched("subject", false);
    }
    return await fetchCorrespondingSubjects(formikState.course);
  },
  !!formikState.course // Enable the query when course is selected
);
```

## Conditionally Enabling Form Fields
Each dropdown is conditionally enabled based on the selection of the previous field. This is achieved by setting the `disabled` prop of the `FormikControl` based on the presence of selections in the form state.
```jsx
// Inside the form rendering block
<FormikControl
  control="select"
  label="School"
  name="school"
  options={allSchools.data}
  placeholder="Select your School"
  withAsterisk
/>
<FormikControl
  control="select"
  label="Course"
  name="course"
  options={correspondingCourses.data}
  disabled={!formikState.school} // Disable if no school is selected
  placeholder="Select your Course"
  withAsterisk
/>
<FormikControl
  control="select"
  label="Subject"
  name="subject"
  options={correspondingSubjects.data}
  disabled={!formikState.course || !formikState.school} // Disable if no course or school is selected
  placeholder="Select your Subject"
  withAsterisk
/>
```

# Files Structure
Ensure the following files are included and properly imported in your project:

- `MyForm.jsx`: Main form component.
- `FormikControl.jsx`: Abstraction layer for different form controls.
- `Input.jsx`, `TextArea.jsx`, `Select.jsx`, etc.: Specific form control implementations.
- `ResetButton.jsx`, `SubmitButton.jsx`: Form action buttons.
