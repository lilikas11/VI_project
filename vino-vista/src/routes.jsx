import { Routes, Route } from 'react-router-dom';
import Homepage from './pages/homepage';
import AboutUs from './pages/aboutus';
import ContactPage from './pages/contacts';
import Statistics1 from './pages/statistic1';
import Statistics2 from './pages/statistic2';
import Statistics3 from './pages/statistic3';
import Statistics4 from './pages/statistic4';
import Statistics5 from './pages/statistic5';
import Info from './pages/info';
 
const AppRoutes = () => {
   return (
      <>
         <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contacts" element={<ContactPage />} />
            <Route path="/statistics-1" element={<Statistics1 />} />
            <Route path="/statistics-2" element={<Statistics2 />} />
            <Route path="/statistics-3" element={<Statistics3 />} />
            <Route path="/statistics-4" element={<Statistics4 />} />
            <Route path="/statistics-5" element={<Statistics5 />} />
            <Route path="/info" element={<Info />} />
         </Routes>
      </>
   );
};
 
export default AppRoutes;