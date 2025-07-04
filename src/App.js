import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import SellersList from './components/SellersList';
import SellerEdit from './components/SellerEdit';
import SellerDetail from './components/SellerDetail';
import ProductsList from './components/ProductsList';
import ProductDetail from './components/ProductDetail';
import CampaignDetail from './components/CampaignDetail';
import CampaignEdit from './components/CampaignEdit';
import CampaignList from './components/CampaignList';
import CampaignListActive from './components/CampaignListActive';
import SellerCreate from './components/SellerCreate';
import ProductCreate from './components/ProductCreate';
import CampaignCreate from './components/CampaignCreate';
import ProductEdit from './components/ProductEdit';
import Footer from './components/Footer';
import AboutPage from './components/AboutPage';
import { SellersProvider } from './components/SellersContext';

function App() {
  return (
    <SellersProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<SellersList />} />
          <Route path="/sellers/:id" element={<SellerDetail />} />
          <Route path="/products" element={<ProductsList />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/campaigns/:id" element={<CampaignDetail />} />
          <Route path="/campaigns/:id/edit" element={<CampaignEdit />} />
          <Route path="/campaigns" element={<CampaignList />} />
          <Route path="/campaigns/active" element={<CampaignListActive />} />
          <Route path="/sellers/create" element={<SellerCreate />} />
          <Route path="/sellers" element={<SellersList />} />
          <Route path="/products/create" element={<ProductCreate />} />
          <Route path="/campaign/create" element={<CampaignCreate />} />
          <Route path="/sellers/:id/edit" element={<SellerEdit />} />
          <Route path="/products/edit/:id" element={<ProductEdit />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
        <Footer />
      </Router>
    </SellersProvider>
  );
}
export default App;
