import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../lib/axois';
import { Infinity } from 'ldrs/react';
import 'ldrs/react/infinity.css';
import toast from 'react-hot-toast';


const Home = () => {
  const [projectTitle, setProjectTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await api.post("/roadmap", {
        topic: projectTitle
      });

      // Axios automatically throws for HTTP errors, so no need for response.ok
      const roadmapData = response.data;
      toast.success('Roadmap generated successfully!');
      // Navigate to the result page, passing the data via state
      navigate('/map-result', { state: { roadmap: roadmapData } });

    } catch (err) {
      setError(err.response?.data?.error || err.message);
      console.error('Failed to generate roadmap:', err);
      toast.error('Failed to generate roadmap');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center text-white h-full px-5 py-24">
      <div className="text-center">
        <h1 className="text-5xl font-bold mb-4">AI Roadmap Generator</h1>
        <p className="text-xl text-gray-300 mb-10">Enter a topic, and I'll generate a customized learning roadmap for you.</p>
      </div>
      <form onSubmit={handleSubmit} className="w-full max-w-xl">
        <div className="flex flex-col mb-6">
          <label htmlFor="projectTitle" className="mb-2 text-lg font-medium sr-only">
            Project Title
          </label>
          <input
            type="text"
            id="projectTitle"
            value={projectTitle}
            onChange={(e) => setProjectTitle(e.target.value)}
            placeholder="e.g., Fitness App, E-commerce Website"
            className="bg-gray-800 text-white border-2 border-gray-700 rounded-lg py-3 px-4 w-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg w-full transition-colors duration-300 text-lg disabled:bg-purple-400 disabled:cursor-not-allowed"
        >
          {loading ? <Infinity
  size="55"
  stroke="4"
  strokeLength="0.15"
  bgOpacity="0.1"
  speed="1.3"
  color="white" 
/> : 'Generate Roadmap'}
        </button>
        {error && (
          <p className="text-red-500 mt-4 text-center">{error}</p>
        )}
      </form>
    </div>
  );
};

export default Home;
