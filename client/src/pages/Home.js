import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Home.css";

export default function Home() {
  const [newsList, setNewsList] = useState([]);
  const [category, setCategory] = useState(""); // ✅ New state

  useEffect(() => {
    const fetchVerifiedNews = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/news/verified");
        setNewsList(res.data);
      } catch (err) {
        console.error("Error fetching verified news:", err);
      }
    };

    fetchVerifiedNews();
  }, []);

  // ✅ Filter news by category
  const filteredNews = category
    ? newsList.filter((news) => news.category === category)
    : newsList;

  return (
    <div className="home-container">
      <div className="top-bar">
        <div className="logo-section">
          <div className="logo">
  <span className="black">Truth</span>
  <span className="blue">Net</span>
  <span className="black">News</span>
</div>

          <p className="tagline">
            TruthNet amplifies the voices of the people. Whether it's a local event or a global issue, citizens can submit news that matters—professionally verified and publicly trusted. Join us in redefining journalism by turning every citizen into a responsible reporter.
          </p>
        </div>

        <div className="search-section">
          <select
            className="category-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="general">General</option>
            <option value="breaking">Breaking News</option>
            <option value="sports">Sports</option>
            <option value="tech">Technology</option>
            <option value="politics">Politics</option>
            <option value="health">Health</option>
            <option value="education">Education</option>
            <option value="environment">Environment</option>
            <option value="crime">Crime</option>
            <option value="entertainment">Entertainment</option>
          </select>
        </div>
      </div>

      <div className="news-grid">
        {filteredNews.length === 0 ? (
          <p>No news available for this category.</p>
        ) : (
          filteredNews.map((news, index) => (
            <div className="news-card" key={index}>
              <h2 className="news-title">{news.title}</h2>
              <p className="news-description">{news.description}</p>
              <p className="news-category">Category: {news.category}</p>
              {news.file && (
                <img
                  src={`http://localhost:5000/uploads/${news.file}`}
                  alt="news"
                  className="news-image"
                />
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
