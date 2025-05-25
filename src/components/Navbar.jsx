import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

function Navbar() {
  const [sellers, setSellers] = useState([]);

  useEffect(() => {
    fetch('/api/sellers')
      .then(res => res.json())
      .then(setSellers)
      .catch(console.error);
  }, []);

  const activeStyle = {
    fontWeight: 'bold',
    textDecoration: 'underline',
  };

  return (
    <nav style={{ padding: '1rem', borderBottom: '1px solid #ccc', marginBottom: '1rem' }}>
      <NavLink to="/" style={({ isActive }) => (isActive ? activeStyle : undefined)} end>
        Sellers
      </NavLink>{' | '}
      <NavLink to="/products" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
        Products
      </NavLink>{' | '}
      <NavLink to="/campaigns" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
        All Campaigns
      </NavLink>{' | '}
      <NavLink to="/campaigns/active" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
        Active Campaigns
      </NavLink>

      <div style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: 'red' }}>
        {sellers.map(s =>
          <div key={s.id}>
            {s.name} {typeof s.emeraldBalance === 'number' ? s.emeraldBalance.toFixed(2) : 'N/A'}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
