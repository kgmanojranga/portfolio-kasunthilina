import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import DesignSystemPage from './pages/DesignSystemPage';
import SandboxPage from './pages/SandboxPage'; // SANDBOX — remove this line to delete

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <HomePage />
            </Layout>
          }
        />
        <Route path="/design-system" element={<DesignSystemPage />} />
        <Route path="/sandbox" element={<SandboxPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
