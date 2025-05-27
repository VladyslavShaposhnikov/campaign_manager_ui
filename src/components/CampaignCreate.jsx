import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { SellersContext } from './SellersContext';

const towns = ['Kraków', 'Warsaw', 'Gdańsk', 'Wrocław', 'Poznań'];
const keywordSuggestions = ['eco', 'handmade', 'natural', 'gift', 'luxury', 'premium', 'exclusive', 'kids', 'toys', 'fun', 'colorful', 'home', 'decor', 'minimal', 'style', 'organic', 'vegan', 'wellness', 'care'];

function CampaignCreate() {
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const productIdFromQuery = query.get('productId');
  const productId = productIdFromQuery ? parseInt(productIdFromQuery, 10) : null;
  const [errorMessages, setErrorMessages] = useState([]);
  const { reloadSellers } = useContext(SellersContext);


  const [products, setProducts] = useState([]);
  const [keywordInput, setKeywordInput] = useState('');
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

  const handleKeywordInputChange = (e) => {
    setKeywordInput(e.target.value);
  };

  const handleKeywordKeyDown = (e) => {
    if ((e.key === 'Enter' || e.key === ',') && keywordInput.trim()) {
      e.preventDefault();
      const keyword = keywordInput.trim();
      if (!form.keywords.includes(keyword)) {
        setForm(prev => ({ ...prev, keywords: [...prev.keywords, keyword] }));
      }
      setKeywordInput('');
    }
  };

  const handleRemoveKeyword = (keyword) => {
    setForm(prev => ({
      ...prev,
      keywords: prev.keywords.filter(k => k !== keyword)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.productId) {
      alert('Please select a product.');
      return;
    }

    if (form.keywords.length === 0) {
      alert('Please add at least one keyword.');
      return;
    }

    const payload = {
      ...form,
      bidAmount: parseFloat(form.bidAmount),
      fund: parseFloat(form.fund),
      radiusKm: parseFloat(form.radiusKm),
      status: form.status ? 1 : 0
    };

    console.log('Sending payload:', JSON.stringify(payload));

    const res = await fetch('/api/campaigns', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (res.ok) {
      alert('Campaign created.');
      reloadSellers();
      navigate(`/products/${form.productId}`);
    } else {
      const errorData = await res.json();

      const extractedErrors = [];
      if (typeof errorData.errors === 'object' && !Array.isArray(errorData.errors)) {
        for (const field in errorData.errors) {
          extractedErrors.push(...errorData.errors[field]);
        }
      }
      setErrorMessages(extractedErrors);

      if (errorData.errors && Array.isArray(errorData.errors)) {
        setErrorMessages(errorData.errors);
      }
      //alert('Failed to create campaign.');
    }
  };

  return (
    <div>
      <h2>Create New Campaign</h2>

      {errorMessages.length > 0 && (
        <div style={{ color: 'red' }}>
          <ul>
            {errorMessages.map((msg, index) => (
              <li key={index}>{msg}</li>
            ))}
          </ul>
        </div>
      )}

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
          <input name="bidAmount" type="number" onChange={handleChange} required step="0.01" />
        </label><br />

        <label>
          Fund:
          <input name="fund" type="number" onChange={handleChange} required step="0.01" />
        </label><br />

        <label>
          Status:
          <input name="status" type="checkbox" checked={form.status} onChange={handleChange} />
        </label><br />

        <label>
          Town:
          <select
            name="town"
            value={form.town}
            onChange={handleChange}
            required
          >
            <option value="">-- Select town --</option>
            {towns.map((town) => (
              <option key={town} value={town}>
                {town}
              </option>
            ))}
          </select>
        </label><br />

        <label>
          Radius (km):
          <input name="radiusKm" type="number" value={form.radiusKm} onChange={handleChange} required />
        </label><br />

        <label>
          Keywords (press Enter or Comma to add):
          <input
            list="keyword-suggestions"
            value={keywordInput}
            onChange={handleKeywordInputChange}
            onKeyDown={handleKeywordKeyDown}
            placeholder="Type and press Enter"
            required={form.keywords.length === 0}
          />
          <datalist id="keyword-suggestions">
            {keywordSuggestions.map(k => (
              <option key={k} value={k} />
            ))}
          </datalist>
        </label>

        <div>
          {form.keywords.map(k => (
            <span key={k} style={{ marginRight: '8px' }}>
              {k} <button type="button" onClick={() => handleRemoveKeyword(k)}>x</button>
            </span>
          ))}
        </div><br />

        {productId && (
          <input type="hidden" name="productId" value={form.productId} />
        )}

        <button type="submit">Create Campaign</button>
      </form>
    </div>
  );
}

export default CampaignCreate;
