import supabase from './utils/supabaseClient';
import Router from './shared/Router';
import GlobalStyle from './styles/Globalstyle';

function App() {

  return (
    <>
      <GlobalStyle />
      <Router />
    </>
  );
}

export default App;
