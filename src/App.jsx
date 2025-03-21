import { RouterProvider } from "react-router-dom";
import Router from "./constants/Router";
import { Web3Provider } from "./providers/Web3Provider";


function App() {
  return (
    <>
    <Web3Provider>

      <RouterProvider router={Router} />

    </Web3Provider>
    </>
  )
}

export default App
