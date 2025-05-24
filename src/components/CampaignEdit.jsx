import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

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

  useEffect(() => {
    fetch(`/api/campaigns/${id}`)
      .then(res => res.json())
      .then(data => setForm({ ...data, keywords: data.keywords || [] }));
    }, [id]);
    
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;
    setForm(prev => ({ ...prev, [name]: val }));
  };

  const handleKeywordsChange = (e) => {
    setForm(prev => ({ ...prev, keywords: e.target.value.split(',').map(k => k.trim()) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const payload = {
    ...form,
    bidAmount: Number(form.bidAmount),
    fund: Number(form.fund),
    radiusKm: Number(form.radiusKm),
    status: form.status ? 1 : 0,
    productId: form.productId
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
          <input name="town" value={form.town} onChange={handleChange} required />
        </label><br />

        <label>
          Radius (km):
          <input name="radiusKm" type="number" value={form.radiusKm} onChange={handleChange} min="0" required />
        </label><br />

        <label>
          Product ID (if you want to move campaign to another product):
          <input name="productId" type="number" value={form.productId} onChange={handleChange} required />
        </label><br />

        <label>
          Keywords (comma separated):
          <input value={form.keywords.join(', ')} onChange={handleKeywordsChange} />
        </label><br />

        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}

export default CampaignEdit;
