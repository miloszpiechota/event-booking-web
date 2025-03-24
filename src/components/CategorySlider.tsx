import React, { useState, useEffect } from "react";
import { fetchEventCategory } from "../api/fetchEventCategory.ts";

const CategorySlider = ({ onCategorySelect }) => {
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);

  useEffect(() => {
    const getCategories = async () => {
      const data = await fetchEventCategory();
      setCategories(data);
    };
    getCategories();
  }, []);

  const handleCategoryClick = (category) => {
    const newCategory = activeCategory === category ? null : category; // Wyłączenie filtra po kliknięciu tej samej kategorii
    setActiveCategory(newCategory);
    onCategorySelect(newCategory);
  };

  return (
    <div className="w-5/6 mx-auto mt-8 pb-10">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-900 dark:text-white">
        Choose Events Categories
      </h2>
      <div className="flex gap-2 flex-wrap justify-center">
        {categories.map((category) => (
          <div
            key={category.id}
            className={`px-4 py-2 rounded-full text-sm cursor-pointer transition duration-200 ${
              activeCategory === category.name ? "bg-blue-500 text-white" : "bg-gray-700 text-white hover:bg-gray-600"
            }`}
            onClick={() => handleCategoryClick(category.name)}
          >
            {category.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategorySlider;
