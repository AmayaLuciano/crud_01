import React, { useState, useEffect } from 'react';
import {
  getDoc,
  setDoc,
  doc,
  getFirestore,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../firebase';
import { getAuth, signOut } from 'firebase/auth';
import {
  Button,
  Container,
  HStack,
  IconButton,
  StackDivider,
  Text,
  VStack,
  Badge,
  useColorMode,
} from '@chakra-ui/react';
import { FaTrash, FaEdit, FaSun, FaMoon } from 'react-icons/fa';
import CreateForm from './CreateForm';
import EditForm from './EditForm';

import app from '../firebase';
const auth = getAuth(app);
const firestore = getFirestore(app);

const Home = ({ userEmail }) => {
  const [tareas, setTareas] = useState([]);
  const [editing, setEditing] = useState(false);
  const [productoEditar, setProductoEditar] = useState({});

  const searchOrCreateDocument = async (idDocument) => {
    const docuRef = doc(firestore, `usuarios/${idDocument}`);

    const consulta = await getDoc(docuRef);

    if (consulta.exists()) {
      const infoDoc = consulta.data();
      return infoDoc.value;
    } else {
      await setDoc(docuRef, { value: [...tareas] });
      const consulta = await getDoc(docuRef);
      const infoDoc = consulta.data();
      return infoDoc.value;
    }
  };

  const deleteTask = async (taskId) => {
    console.log('eliminar');
    let newArray = tareas.filter((tarea) => tarea.id !== taskId);
    const docuRef = doc(db, `usuarios/${userEmail}`);
    updateDoc(docuRef, { value: [...newArray] });
    setTareas(newArray);
  };

  useEffect(() => {
    const fetchTasks = async () => {
      const fetchedTasks = await searchOrCreateDocument(userEmail);
      setTareas(fetchedTasks);
    };

    fetchTasks();
  }, []);

  return (
    <Container>
      <Button mt={-70} colorScheme="orange" onClick={() => signOut(auth)}>
        Cerrar Sesion
      </Button>

      {editing ? (
        <EditForm
          productoEditar={productoEditar}
          tareas={tareas}
          userEmail={userEmail}
          setTareas={setTareas}
          setEditing={setEditing}
        />
      ) : (
        <CreateForm
          userEmail={userEmail}
          tareas={tareas}
          setTareas={setTareas}
        />
      )}
      {tareas.length ? (
        <VStack
          spacing={3}
          alignItems="flex-end"
          divider={<StackDivider />}
          borderColor="gray.500"
          borderWidth="2px"
          p={4}
          borderRadius="lg"
          w="100%"
          maxW={{ base: '90vw', sm: '80vw', lg: '50vw', xl: '40vw' }}
        >
          {tareas?.map((tarea) => (
            <HStack key={tarea.id}>
              <Text>{tarea.description}</Text>
              <IconButton
                icon={<FaTrash />}
                onClick={() => deleteTask(tarea.id)}
              />
              <IconButton
                icon={<FaEdit />}
                onClick={() => {
                  setProductoEditar(tarea);
                  setEditing(true);
                }}
              />
            </HStack>
          ))}
        </VStack>
      ) : (
        <VStack>
          <Badge colorScheme="orange" p={4} borderRadius="lg" m={4}>
            No tienes tareas...
          </Badge>
        </VStack>
      )}
    </Container>
  );
};

export default Home;
