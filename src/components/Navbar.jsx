import { NavLink } from 'react-router-dom';

function Navbar() {
  const activeStyle = {
    fontWeight: 'bold',
    textDecoration: 'underline',
  };

  return (
    <nav style={{ padding: '1rem', borderBottom: '1px solid #ccc', marginBottom: '1rem' }}>
      <NavLink to="/" style={({ isActive }) => (isActive ? activeStyle : undefined)} end>
        Sellers
      </NavLink>{' | '}
      <NavLink to="/sellers/create" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
        Add Seller
      </NavLink>{' | '}
      <NavLink to="/products" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
        Products
      </NavLink>{' | '}
      <NavLink to="/products/create" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
        Add Product
      </NavLink>{' | '}
      <NavLink to="/campaigns" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
        Campaigns
      </NavLink>
    </nav>
  );
}

export default Navbar;
