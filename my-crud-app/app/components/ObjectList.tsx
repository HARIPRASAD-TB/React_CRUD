'use client';

import { useQuery } from '@tanstack/react-query';
import { getObjects } from '../../lib/api';
import { ObjectData } from '../../lib/types'; // Import the type

export default function ObjectList() {
  // Ensure correct typing here for useQuery
  const { data, error, isLoading } = useQuery<ObjectData[]>({
  queryKey: ['objects'], // this is an array (not just a string) which uniquely identifies the query
  queryFn: getObjects,   // the function that performs the GET request
});


  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching data.</div>;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Object List</h2>
      <ul className="space-y-4">
        {data?.map((object: ObjectData) => (
          <li key={object.id} className="border p-4 rounded-md shadow">
            <h3 className="text-lg font-semibold">{object.name}</h3>
            {/* Handle optional data field */}
            {object.data ? (
              <pre>{JSON.stringify(object.data, null, 2)}</pre>
            ) : (
              <p>No data available</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
