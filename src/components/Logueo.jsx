import React from 'react';
import {
  Button,
  Container,
  Input,
  Text,
  VStack,
  useColorMode,
} from '@chakra-ui/react';
import { useState } from 'react';

import firebaseApp from '../firebase';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithRedirect,
  GoogleAuthProvider,
} from 'firebase/auth';
const auth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();

const Logueo = () => {
  const [logueo, setLogueo] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    if (logueo) {
      signInWithEmailAndPassword(auth, email, password);
    } else {
      const usuario = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
    }
  };
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <>
      <Container mt={8}>
        <Button mb={4} alignSelf="flex-end" onClick={toggleColorMode}>
          Mode
        </Button>
        <form onSubmit={handleSubmit}>
          <Input
            name="email"
            onChange={(e) => e.target.value}
            mb={4}
            placeholder="escribe tu email"
          />
          <Input
            id="password"
            type="password"
            mb={4}
            placeholder="contraseña"
          />

          <Button type="submit" mb={4} colorScheme="teal">
            {logueo ? 'Ingresar' : 'Registrarse'}
          </Button>
        </form>
      </Container>
      <Container mb={4}>
        <Button
          onClick={() => signInWithRedirect(auth, googleProvider)}
          colorScheme="twitter"
        >
          Accede con Google
        </Button>
      </Container>
      <Container>
        {logueo ? (
          <Button px={10} onClick={() => setLogueo(false)}>
            No estas registrado? Registrate
          </Button>
        ) : (
          <Button px={10} onClick={() => setLogueo(true)}>
            Ya estas registrado? Ingresa
          </Button>
        )}
      </Container>
    </>
  );
};

export default Logueo;
