import { useState } from 'react'
import supabase from './utils/supabaseClient'
import Router from './shared/Router'
console.log(supabase)
function App() {
  const [count, setCount] = useState(0)

  return (<Router />)
}

export default App
