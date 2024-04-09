import { useMutation, useQueryClient } from "@tanstack/react-query";

/**
 * Custom hook for performing mutations with automatic query invalidation and refetch on success.
 * @param {Function} mutationFn The function to perform the mutation, which should return a promise.
 * @param {string|Array} queryKey Query key to invalidate and refetch on successful mutation.
 * @returns The entire mutation object from React Query's useMutation hook.
 */
export const usePostData = (mutationFn, queryKey) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: mutationFn,
    onSuccess: () => {
      // Invalidate and refetch the query associated with the provided queryKey
      queryClient.invalidateQueries(queryKey);
    },
  });

  // Return the entire mutation object to allow access to all its properties and methods
  return mutation;
};

// Rationale:
// Creating custom hooks in React allows you to abstract component logic into reusable functions.
// When it comes to data insertion and updates, operations such as mutations, managing loading states, error handling, and automatic query invalidation and refetching
// can be abstracted away into a custom hook, making your components cleaner and more focused on the UI logic.