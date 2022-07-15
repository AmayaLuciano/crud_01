import { Button, HStack, IconButton, Input } from '@chakra-ui/react';
import { doc, getFirestore, updateDoc } from 'firebase/firestore';
import { useState } from 'react';
import { GiCancel } from 'react-icons/gi';
import firebaseApp from '../firebase';
const db = getFirestore(firebaseApp);

const EditForm = ({
  productoEditar,
  tareas,
  userEmail,
  setTareas,
  setEditing,
}) => {
  const [productoEstado, setProductoEstado] = useState(productoEditar);
  const addTask = async (e) => {
    e.preventDefault();
    const inputValue = e.target.input.value;

    let newArray = tareas.filter((tarea) => tarea.id !== productoEditar.id);

    newArray = [
      ...newArray,
      { id: productoEditar.id, description: inputValue },
    ];
    if (inputValue !== '') {
      const docuRef = doc(db, `usuarios/${userEmail}`);
      updateDoc(docuRef, { value: [...newArray] });
      setTareas(newArray);
      setEditing(false);
    }
  };
  return (
    <form onSubmit={addTask}>
      <HStack my={4}>
        <Input
          id="input"
          value={productoEstado.description}
          onChange={(e) => {
            setProductoEstado({
              ...productoEstado,
              description: e.target.value,
            });
          }}
        />
        <Button colorScheme="orange" bgColor="orange.500" type="submit">
          Editar
        </Button>
        <IconButton
          color="orange.500"
          icon={<GiCancel />}
          onClick={() => setEditing(false)}
        />
      </HStack>
    </form>
  );
};

export default EditForm;
