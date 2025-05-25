import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SellerCreate() {
  const [name, setName] = useState('');
  const [emeraldBalance, setEmeraldBalance] = useState(0); 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('/api/sellers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, emeraldBalance: parseFloat(emeraldBalance) })
    });

    if (response.ok) {
      alert('Seller created.');
      navigate('/sellers');
      window.location.reload();
    } else {
      alert('Failed to create seller.');
    }
  };

  return (
    <div>
      <h2>Create New Seller</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
          />
        </label>
        <br />
        <label>
          Emerald Balance:
          <input 
            type="number"
            value={emeraldBalance}
            onChange={(e) => setEmeraldBalance(e.target.value)}
            required
            min="0"
            step="0.01"
          />
        </label>
        <br />
        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default SellerCreate;
