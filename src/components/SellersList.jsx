import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

function SellersList() {
  const [sellers, setSellers] = useState([]);

  useEffect(() => {
    fetch('/api/sellers')
      .then(res => res.json())
      .then(setSellers);
  }, []);

  return (
    <div>
      <h2>Sellers</h2>

      <Link to="/sellers/create">
        <button style={{ marginBottom: '10px' }}>Create New Seller</button>
      </Link>

      <ul>
        {sellers.map(seller => (
          <li key={seller.id}>
            <Link to={`/sellers/${seller.id}`}>{seller.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SellersList;
