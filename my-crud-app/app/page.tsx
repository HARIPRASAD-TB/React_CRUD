import ObjectList from './components/ObjectList';
import AddObjectForm from './components/AddObjectForm';
import { ObjectData } from '../lib/types'; // Adjust the path to your ObjectData type
import {getObjects} from '../lib/api'

export default async function Home() {
  // Define a default data object
  const defaultData: ObjectData = {
    name: '',
    data: {
      color: '',
      price: 0,
      capacity: '',
    }
  };

  const objects = await getObjects(); 

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Object List</h1>
      <ObjectList />
      <h2 className="text-2xl font-semibold mt-10 mb-4">Add New Object</h2>
      {/* Pass defaultData as the required 'data' prop */}
      <AddObjectForm data={defaultData} />
    </div>
  );
}
