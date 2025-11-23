import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./Pages/Dashboard.jsx";
import LinkStats from "./Pages/LinkStats.jsx";
import Layout from "./Components/Layout.jsx";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/code/:code" element={<LinkStats />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
