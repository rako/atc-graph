import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [username, setUsername] = useState('');
  const [imageData, setImageData] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await axios.post('/api/getCanvas', { username });
    setImageData(response.data.imageData);
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <p>AtCoderのユーザー名を入れてください</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input type="submit" value="送信" />
      </form>
      <div id="graph">
        {imageData && <img src={imageData} alt="Rating Graph" />}
      </div>
    </div>
  );
}