import { RouterProvider } from "react-router-dom";
import Router from "./constants/Router";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const queryCline = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryCline}>
        <RouterProvider router={Router} />
      </QueryClientProvider>
    </>
  )
}

export default App
