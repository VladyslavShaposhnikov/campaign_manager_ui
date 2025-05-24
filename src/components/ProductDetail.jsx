import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    fetch(`/api/products/${id}`)
      .then(res => res.json())
      .then(setProduct);

    fetch(`/api/products/${id}/campaigns`)
      .then(res => res.json())
      .then(setCampaigns);
  }, [id]);

  if (!product) return <p>Loading product info...</p>;

  return (
    <div>
      <h2>{product.name}</h2>
      <p>ID: {product.id}</p>

      <Link to={`/campaign/create?productId=${product.id}`}>
         <button>Add Campaign</button>
    </Link>

      <h3>Campaigns for this product:</h3>
      {campaigns.length === 0 ? (
        <p>No campaigns found.</p>
      ) : (
        <ul>
          {campaigns.map(c => (
            <li key={c.id}>
              <Link to={`/campaigns/${c.id}`}>{c.name}</Link> - {c.status ? 'On' : 'Off'}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ProductDetail;
