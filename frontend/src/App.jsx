import './App.css'
import { RouterProvider } from "react-router-dom";
import { router } from "./constants/router/router";

function App() {

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
