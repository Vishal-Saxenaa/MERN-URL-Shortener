import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Analytics() {
  const { shortCode } = useParams();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/analytics/${shortCode}`
        );

        console.log(response.data);   // 👈 Check this in browser console

        setData(response.data);       // 👈 Ye line bahut important hai

      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [shortCode]);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div>
      <h1>Analytics</h1>

      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default Analytics;