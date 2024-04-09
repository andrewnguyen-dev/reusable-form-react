import { useEffect, useRef, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikControl from "./FormikControl";
import FormTitle from "./FormTitle";
import ResetButton from "../form-buttons/ResetButton";
import SubmitButton from "../form-buttons/SubmitButton";
import ReactRouterPrompt from "react-router-prompt";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const MyForm = () => {
  // State for initializing form fields with default values
  const [initialValues, setInitialValues] = useState({
    email: "",
    firstName: "",
    textarea: "",
    placementType: "",
    campus: [],
    nationality: "",
  });

  // Effect hook to fetch initial form values, simulates API call
  useEffect(() => {
    fakeFetchInitialValues().then((data) => {
      setInitialValues(data); // Updates form initial values with fetched data
    });
  }, []);

  // Handler for form submission
  const onSubmit = (values, { setSubmitting }) => {
    console.log("🎉 Submitted:", values);
    // Simulate submitting to a backend
    setTimeout(() => {
      alert("🎉 Submitted!");
      setSubmitting(false);
    }, 500);
  };

  const [companyRepresentativeOptions, setCompanyRepresentativesOptions] =
  useState([]);
  
  const formikRef = useRef();
  const [formikState, setFormikState] = useState({});
  
  // -------------------- TRYING TO FETCH COMPANY REPRESENTATIVES --------------------
  /*
  const fetchOptionsForCompanyRepresentatives = (company) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (company === "google")
          resolve([
            { key: "Sundar Pichai", value: "sundar" },
            { key: "Larry Page", value: "larry" },
            { key: "Sergey Brin", value: "sergey" },
          ]);
        if (company === "facebook")
          resolve([
            { key: "Mark Zuckerberg", value: "mark" },
            { key: "Sheryl Sandberg", value: "sheryl" },
            { key: "Chris Cox", value: "chris" },
          ]);
        if (company === "apple")
          resolve([
            { key: "Tim Cook", value: "tim" },
            { key: "Steve Jobs", value: "steve" },
            { key: "Jony Ive", value: "jony" },
          ]);
        resolve([]);
      }, 500);
    });
  };

  useEffect(() => {
    // When `formikState.company` changes, fetch new options
    if (formikState.company) {
      fetchOptionsForCompanyRepresentatives(formikState.company).then(
        (options) => {
          // Update the state with the fetched options
          setCompanyRepresentativesOptions(options);
        }
      );
    }
  }, [formikState.company]);

  */
  // -------------------- END TRYING TO FETCH COMPANY REPRESENTATIVES --------------------

  const fetchCompanyRepresentatives = async () => {
    // Simulating fetching user data from a public API
    const { data } = await axios.get(
      "https://jsonplaceholder.typicode.com/users/1"
    );
    return data;
  };

  // Function to fetch the data from the API whenever formikState.company change
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["companyRepresentative"],
    queryFn: fetchCompanyRepresentatives,
    enabled: !!formikState.company, // Only run the query if formikState.company is truthy
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  console.log("🚀 ~ MyForm ~ data:", data);

  // Formik component to manage form state, validation, and submission
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema} // Validation schema for form fields
      onSubmit={onSubmit}
      enableReinitialize={true} // Allows form to reinitialize with updated initialValues
      innerRef={(formikInstance) => {
        formikRef.current = formikInstance;
        setFormikState(formikInstance ? formikInstance.values : {});
      }}
    >
      {(formik) => (
        <>
          {/* Prevents navigation away from form if changes are made */}
          <ReactRouterPrompt when={formik.dirty} />

          {/* Form layout ---------------------------------------- */}
          <Form className="mx-auto max-w-sm">
            {/* Form title */}
            <FormTitle>My Form</FormTitle>

            {/* Form fields */}
            <FormikControl
              control="input"
              type="email"
              label="Email"
              name="email"
              placeholder="Enter your email"
              withAsterisk
              disabled
              tooltip="So, You write a few components here and there and have written some button components of your own. But then your button components are not flexible and reusable enough, and you end up rewriting a lot of logic and styles within your react components trying to make it fit different cases in different parts of your application."
            />
            <FormikControl
              control="input"
              label="First Name"
              name="firstName"
              withAsterisk
            />
            <FormikControl
              control="textarea"
              label="Textarea"
              name="textarea"
              placeholder="Enter your text here"
              withAsterisk
            />
            <FormikControl
              control="radio"
              label="Placement Type"
              name="placementType"
              options={placementTypeOptions}
              withAsterisk
            />
            <FormikControl
              control="checkbox"
              label="Campus"
              name="campus"
              options={campusOptions}
              withAsterisk
            />
            <FormikControl
              control="select"
              label="Company"
              name="company"
              options={companyOptions}
              withAsterisk
            />
            <FormikControl
              control="select"
              label="Company Representative"
              name="companyRepresentative"
              options={companyRepresentativeOptions}
              withAsterisk
            />
            <FormikControl
              control="select"
              label="Nationality"
              name="nationality"
              options={nationalityOptions}
              withAsterisk
            />

            {/* Form buttons */}
            <div className="flex gap-2 w-full">
              <ResetButton formik={formik}>Reset</ResetButton>
              <SubmitButton formik={formik}>Submit</SubmitButton>
            </div>
          </Form>
          {/* End Form layout ------------------------------------ */}
        </>
      )}
    </Formik>
  );
};

export default MyForm;

// Helpers ---------------------------------

const nationalityOptions = [
  { key: "Select an option", value: "" },
  { key: "USA", value: "usa" },
  { key: "Canada", value: "canada" },
  { key: "Australia", value: "australia" },
];

const placementTypeOptions = [
  { key: "Internship", value: "internship" },
  { key: "Part-time", value: "part-time" },
  { key: "Full-time", value: "full-time" },
];

const campusOptions = [
  { key: "Bankstown", value: "bankstown" },
  { key: "Parramatta", value: "parramatta" },
  { key: "Campbelltown", value: "campbelltown" },
];

const companyOptions = [
  { key: "Select an option", value: "" },
  { key: "Google", value: "google" },
  { key: "Facebook", value: "facebook" },
  { key: "Apple", value: "apple" },
];

const companyRepresentativeOptions = [
  { key: "Select an option", value: "" },
  { key: "Mark Zuckerberg", value: "mark" },
  { key: "Tim Cook", value: "tim" },
  { key: "Sundar Pichai", value: "sundar" },
];

const validationSchema = Yup.object({
  email: Yup.string().required("Required").email("Invalid email format"),
  firstName: Yup.string().required("Required"),
  nationality: Yup.string().required("Required"),
});

const fakeFetchInitialValues = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        email: "22023226@student.westernsydney.edu.au",
        firstName: "Andrew",
        placementType: placementTypeOptions,
        campus: campusOptions,
        nationality: "australia",
      });
    }, 500);
  });
};
