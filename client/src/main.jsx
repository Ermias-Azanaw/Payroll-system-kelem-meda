// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'

// createRoot(document.getElementById("root")).render(
//   <ThemeProvider>
//     <StrictMode>
//       <App />
//     </StrictMode>
//   </ThemeProvider>
// );
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")).render(<App />);
