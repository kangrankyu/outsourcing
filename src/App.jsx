
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import supabase from './utils/supabaseClient';
import { UserProvider } from './components/UserProvider';
import Router from './shared/Router';
import GlobalStyle from './styles/Globalstyle';

const queryClient = new QueryClient();

function App() {
  return (

    <QueryClientProvider client={queryClient}>
          <UserProvider >
      <GlobalStyle />
        <Router />
        </UserProvider>
    </QueryClientProvider>
  );
}

export default App;
