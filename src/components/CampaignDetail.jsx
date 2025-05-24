import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function CampaignDetail() {
  const { id } = useParams();
  const [campaign, setCampaign] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`/api/campaigns/${id}`)
      .then(res => res.json())
      .then(setCampaign);
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this campaign?')) return;

    const res = await fetch(`/api/campaigns/${id}`, {
      method: 'DELETE'
    });

    if (res.ok) {
      alert('Campaign deleted.');
      navigate('/campaigns'); // redirect to campaigns list
    } else {
      alert('Failed to delete campaign.');
    }
  };

  const handleEdit = () => {
    navigate(`/campaigns/${id}/edit`);
  };

  if (!campaign) return <p>Loading campaign details...</p>;

  return (
    <div>
      <h2>Campaign: {campaign.name}</h2>
      <p><strong>ID:</strong> {campaign.id}</p>
      <p><strong>Status:</strong> {campaign.status ? 'On' : 'Off'}</p>
      <p><strong>Bid Amount:</strong> {campaign.bidAmount}</p>
      <p><strong>Fund:</strong> {campaign.fund}</p>
      <p><strong>Town:</strong> {campaign.town}</p>
      <p><strong>Radius (km):</strong> {campaign.radiusKm}</p>

      <h3>Keywords:</h3>
      <ul>
        {campaign.keywords?.length > 0 ? (
          campaign.keywords.map((k, index) => <li key={index}>{k}</li>)
        ) : (
          <li>No keywords</li>
        )}
      </ul>

      <button onClick={handleEdit}>Edit</button>{' '}
      <button onClick={handleDelete} style={{ color: 'red' }}>Delete</button>
    </div>
  );
}

export default CampaignDetail;
