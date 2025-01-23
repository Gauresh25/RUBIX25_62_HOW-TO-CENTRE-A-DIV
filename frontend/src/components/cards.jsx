import React from 'react';
import './eg.css'; // Importing the CSS file

const NewsCard = ({ link }) => {
  return (
    <div className="news-card">
      <a href={link} className="news-card__card-link" />
    </div>
  );
};

const NewsWrapper = () => {
  const newsLinks = [
    "https://example.com/news1",
    "https://example.com/news2",
    "https://example.com/news3",
    // Add more links as needed
  ];

  return (
    <div className="content-wrapper">
      {newsLinks.map((link, index) => (
        <NewsCard key={index} link={link} />
      ))}
    </div>
  );
};

export default NewsWrapper;
