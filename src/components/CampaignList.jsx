import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

function CampaignList() {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    fetch('/api/campaigns')
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setCampaigns(data);
      })
      .catch(err => console.error(err));
  }, []);  

  return (
    <div>
      <h1>All Campaigns</h1>
      <ul>
        {campaigns.map(c => (
          <li key={c.id}><Link to={`/campaigns/${c.id}`}>{c.name} </Link> - status:{c.status ? 'On' : 'Off'} (for product: {c.productName} id: {c.productId})</li>
        ))}
      </ul>
    </div>
  );
}

export default CampaignList;
