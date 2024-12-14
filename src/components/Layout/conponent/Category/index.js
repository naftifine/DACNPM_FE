import React, { useState, useEffect } from "react";
import "./Category.css";

const Category = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:3001/category/getListCategory");
        const data = await response.json();
        setCategories(data.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <ul className="category-list">
      {categories.map((category) => (
        <li key={category.categoryid} className="category-item">
          <a href={`/search?category=${category.categoryid}`} className="category-link">
            <span>{category.name}</span>
          </a>
        </li>
      ))}
    </ul>
  );
};

export default Category;
