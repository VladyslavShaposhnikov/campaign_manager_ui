import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

function CampaignCreate() {
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const productIdFromQuery = query.get('productId');
  const productId = productIdFromQuery ? parseInt(productIdFromQuery, 10) : null;

  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: '',
    bidAmount: 0,
    fund: 0,
    status: false,
    town: '',
    radiusKm: 0,
    keywords: [],
    productId: productId || 0
  });

  useEffect(() => {
    // If no productId in URL, fetch products for user to select
    if (!productId) {
      fetch('/api/products')
        .then(res => res.json())
        .then(setProducts)
        .catch(console.error);
    }
  }, [productId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;
    setForm(prev => ({ ...prev, [name]: val }));
  };

  const handleKeywordsChange = (e) => {
    setForm(prev => ({
      ...prev,
      keywords: e.target.value.split(',').map(k => k.trim()).filter(k => k !== '')
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // If productId is zero or not set, prevent submission
    if (!form.productId) {
      alert('Please select a product.');
      return;
    }

    const payload = {
      ...form,
      bidAmount: parseFloat(form.bidAmount),
      fund: parseFloat(form.fund),
      radiusKm: parseFloat(form.radiusKm),
      status: form.status ? 1 : 0,
      productId: form.productId
    };

    console.log('Sending payload:', JSON.stringify(payload));

    const res = await fetch('/api/campaigns', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (res.ok) {
      alert('Campaign created.');
      navigate(`/products/${form.productId}`);
    } else {
      alert('Failed to create campaign.');
    }
  };

  return (
    <div>
      <h2>Create New Campaign</h2>

      {/* Show product selector only if productId not provided */}
      {!productId && (
        <label>
          Select Product:
          <select
            name="productId"
            value={form.productId}
            onChange={handleChange}
            required
          >
            <option value="">-- Choose a product --</option>
            {products.map(p => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </label>
      )}

      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input name="name" value={form.name} onChange={handleChange} required />
        </label><br />

        <label>
          Bid Amount:
          <input name="bidAmount" type="number" value={form.bidAmount} onChange={handleChange} required />
        </label><br />

        <label>
          Fund:
          <input name="fund" type="number" value={form.fund} onChange={handleChange} required />
        </label><br />

        <label>
          Status:
          <input name="status" type="checkbox" checked={form.status} onChange={handleChange} />
        </label><br />

        <label>
          Town:
          <input name="town" value={form.town} onChange={handleChange} required />
        </label><br />

        <label>
          Radius (km):
          <input name="radiusKm" type="number" value={form.radiusKm} onChange={handleChange} required />
        </label><br />

        <label>
          Keywords (comma separated):
          <input value={form.keywords.join(', ')} onChange={handleKeywordsChange} />
        </label><br />

        {/* If productId exists from query, keep it hidden */}
        {productId && (
          <input type="hidden" name="productId" value={form.productId} />
        )}

        <button type="submit">Create Campaign</button>
      </form>
    </div>
  );
}

export default CampaignCreate;
