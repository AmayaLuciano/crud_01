import { useState } from 'react';
import Home from './components/Home';
import Logueo from './components/Logueo';

import app from './firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { VStack } from '@chakra-ui/react';
const auth = getAuth(app);

function App() {
  const [usuarioGlobal, setUsuarioGlobal] = useState(null);

  onAuthStateChanged(auth, (usuario) => {
    if (usuario) {
      setUsuarioGlobal(usuario);
    } else {
      setUsuarioGlobal(null);
    }
  });
  return (
    <>
      {usuarioGlobal ? (
        <VStack>
          <Home userEmail={usuarioGlobal.email} />
        </VStack>
      ) : (
        <Logueo />
      )}
    </>
  );
}

export default App;
