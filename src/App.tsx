import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";

export default function App() {
  return (
    <BrowserRouter basename="/Nuta/">
      <Routes>
        <Route path="/Nuta/" element={<Index />} />
        {/* Future routes like /connect and /push will go here */}
      </Routes>
    </BrowserRouter>
  );
}
