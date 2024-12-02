import { useState } from 'react';
import supabase from './utils/supabaseClient';
import Router from './shared/Router';
import GlobalStyle from './styles/Globalstyle';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <GlobalStyle />
      <Router />
    </>
  );
}

export default App;
