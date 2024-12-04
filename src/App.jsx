// import supabase from './utils/supabaseClient';
import { UserProvider } from './components/UserProvider';
import Router from './shared/Router';
import GlobalStyle from './styles/Globalstyle';

function App() {

  return (
    <>
    <UserProvider >
      <GlobalStyle />
      <Router />
      </UserProvider>
    </>
  );
}

export default App;
