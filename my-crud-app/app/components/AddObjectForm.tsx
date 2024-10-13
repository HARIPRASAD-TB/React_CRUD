"use client";

// app/components/AddObjectForm.tsx
import React from 'react';
import { ObjectData } from '../../lib/types'; // Adjust the path as necessary
import { useMutation, useQueryClient } from 'react-query';
import { addObject } from '../../lib/api';

interface AddObjectFormProps {
  data: ObjectData;
}

const AddObjectForm: React.FC<AddObjectFormProps> = ({ data }) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ObjectData, Error, ObjectData>(
    (newObject) => addObject(newObject),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['objects']);
      },
    }
  );

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await mutation.mutateAsync(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        name="name" 
        defaultValue={data.name || ''} // Handle case where name could be empty
      />
      <input 
        type="text" 
        name="color" 
        defaultValue={data.data?.color || ''} // Safely access color with optional chaining
      />
      <input 
        type="number" 
        name="price" 
        defaultValue={data.data?.price?.toString() || ''} // Safely access price with a fallback
      />
      <input 
        type="text" 
        name="capacity" 
        defaultValue={data.data?.capacity || ''} // Safely access capacity
      />
      <button type="submit" disabled={mutation.isLoading}>
        Add Object
      </button>
      {mutation.isError && <div>Error: {mutation.error.message}</div>}
      {mutation.isSuccess && <div>Object added!</div>}
    </form>
  );
};

export default AddObjectForm;
