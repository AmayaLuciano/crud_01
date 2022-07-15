import React from 'react';
import { Button, HStack, Input } from '@chakra-ui/react';
import firebaseApp from '../firebase';
import { doc, getFirestore, updateDoc } from 'firebase/firestore';
const db = getFirestore(firebaseApp);

const CreateForm = ({ userEmail, tareas, setTareas }) => {
  const addTask = async (e) => {
    e.preventDefault();
    const inputValue = e.target.input.value;
    const newArray = [...tareas, { id: +new Date(), description: inputValue }];
    if (inputValue !== '') {
      const docuRef = doc(db, `usuarios/${userEmail}`);
      updateDoc(docuRef, { value: [...newArray] });
      setTareas(newArray);
      e.target.input.value = '';
    }
  };
  return (
    <form onSubmit={addTask}>
      <HStack my={4}>
        <Input id="input" onChange={(e) => e.target.value} />
        <Button colorScheme="orange" bgColor="orange.500" type="submit">
          Agregar
        </Button>
      </HStack>
    </form>
  );
};

export default CreateForm;
