import { useState } from 'react';
import Home from './components/Home';
import Logueo from './components/Logueo';

import app from './firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { VStack, useColorMode, IconButton } from '@chakra-ui/react';
import { FaTrash, FaEdit, FaSun, FaMoon } from 'react-icons/fa';
const auth = getAuth(app);

function App() {
  const [usuarioGlobal, setUsuarioGlobal] = useState(null);
  const { colorMode, toggleColorMode } = useColorMode();
  onAuthStateChanged(auth, (usuario) => {
    if (usuario) {
      setUsuarioGlobal(usuario);
    } else {
      setUsuarioGlobal(null);
    }
  });

  return (
    <>{usuarioGlobal ? <Home userEmail={usuarioGlobal.email} /> : <Logueo />}</>
  );
}

export default App;
