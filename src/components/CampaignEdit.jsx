import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const towns = ['Kraków', 'Warsaw', 'Gdańsk', 'Wrocław', 'Poznań'];
const keywordSuggestions = ['eco', 'handmade', 'natural', 'gift', 'luxury', 'premium', 'exclusive', 'kids', 'toys', 'fun', 'colorful', 'home', 'decor', 'minimal', 'style', 'organic', 'vegan', 'wellness', 'care'];

function CampaignEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    bidAmount: 0,
    fund: 0,
    status: false,
    town: '',
    radiusKm: 0,
    productId: 0,
    keywords: []
  });

  const [keywordInput, setKeywordInput] = useState('');

  useEffect(() => {
    fetch(`/api/campaigns/${id}`)
      .then(res => res.json())
      .then(data => setForm({ ...data, keywords: data.keywords || [] }))
      .catch(console.error);
  }, [id]);

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

    const payload = {
      ...form,
      bidAmount: Number(form.bidAmount),
      fund: Number(form.fund),
      radiusKm: Number(form.radiusKm),
      status: form.status ? 1 : 0,
      productId: Number(form.productId)
    };

    console.log('Sending payload:', JSON.stringify(payload));

    const res = await fetch(`/api/campaigns/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (res.ok) {
      alert('Campaign updated.');
      navigate(`/campaigns/${id}`);
      window.location.reload();
    } else {
      alert('Failed to update campaign.');
    }
  };

  return (
    <div>
      <h2>Edit Campaign</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input name="name" value={form.name} onChange={handleChange} required />
        </label><br />

        <label>
          Bid Amount:
          <input name="bidAmount" type="number" value={form.bidAmount} onChange={handleChange} min="0" required />
        </label><br />

        <label>
          Fund:
          <input name="fund" type="number" value={form.fund} onChange={handleChange} min="0" required />
        </label><br />

        <label>
          Status:
          <input name="status" type="checkbox" checked={form.status} onChange={handleChange} />
        </label><br />

        <label>
          Town:
          <select name="town" value={form.town} onChange={handleChange} required>
            <option value="">-- Select town --</option>
            {towns.map(town => (
              <option key={town} value={town}>{town}</option>
            ))}
          </select>
        </label><br />

        <label>
          Radius (km):
          <input name="radiusKm" type="number" value={form.radiusKm} onChange={handleChange} min="0" required />
        </label><br />

        <label>
          Product ID:
          <input name="productId" type="number" value={form.productId} onChange={handleChange} required />
        </label><br />

        <label>
          Keywords (press Enter or Comma to add):
          <input
            list="keyword-suggestions"
            value={keywordInput}
            onChange={handleKeywordInputChange}
            onKeyDown={handleKeywordKeyDown}
            placeholder="Type and press Enter"
          />
          <datalist id="keyword-suggestions">
            {keywordSuggestions.map(k => (
              <option key={k} value={k} />
            ))}
          </datalist>
        </label>

        {/* Display current keywords */}
        <div style={{ marginTop: '8px' }}>
          {form.keywords.map(k => (
            <span key={k} style={{ marginRight: '8px' }}>
              {k} <button type="button" onClick={() => handleRemoveKeyword(k)}>x</button>
            </span>
          ))}
        </div><br />

        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}

export default CampaignEdit;
