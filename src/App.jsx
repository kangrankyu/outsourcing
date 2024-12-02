import supabase from './utils/supabaseClient';
import Router from './shared/Router';
import GlobalStyle from './styles/Globalstyle';
console.log(supabase);
function App() {

  return (
    <>
      <GlobalStyle />
      <Router />
    </>
  );
}

export default App;
