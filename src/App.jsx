import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const Landing = lazy(() => import('features/Landing'));
const EmployeeForm = lazy(() =>
  import('features/AddRecords/pages/EmployeeForm')
);
const LaptopForm = lazy(() => import('features/AddRecords/pages/LaptopForm'));
const FormLayout = lazy(() => import('component/layout/FormLayout'));
const LaptopsList = lazy(() => import('features/Laptops/pages/LaptopsList'));
const LaptopDetails = lazy(() =>
  import('features/Laptops/pages/LaptopDetails')
);

const pageLoading = '';

function App() {
  return (
    <Suspense fallback={pageLoading}>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/add-records/*" element={<FormLayout />}>
            <Route path="employee" element={<EmployeeForm />} />
            <Route path="laptop" element={<LaptopForm />} />
          </Route>
          <Route path="laptops" element={<LaptopsList />} />
          <Route path="laptops/:id" element={<LaptopDetails />} />
        </Routes>
      </Router>
    </Suspense>
  );
}

export default App;
