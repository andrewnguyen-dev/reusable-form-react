import { useQuery } from "@tanstack/react-query";

// Create a custom hooks in React allow you to extract component logic into reusable functions.
// When it comes to data fetching, operations like loading, error handling, and caching
// can be abstracted away into a custom hook, making your components cleaner and more focused on the UI logic.

//TODO: Uncomment this code
// export const useFetchData = (queryKey, queryFn) => {
//   const { data, isLoading, isError } = useQuery({
//     queryKey,
//     queryFn,
//   });

//   return { data, isLoading, isError };
// };

// TODO: Remove this, only for testing purposes
export const useFetchData = (queryKey, queryFn) => {
  const { data, isLoading } = useQuery({
    queryKey,
    queryFn
  });

  return { data, isLoading };
};
