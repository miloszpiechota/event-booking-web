import React, { useState, useEffect } from 'react';
import { fetchEventCategory } from '../api/fetchEventCategory.ts'; // Zaimportuj funkcję fetchEventCategory

const CategorySlider: React.FC = () => {
  const [categories, setCategories] = useState<any[]>([]);

  // Pobranie kategorii wydarzeń z Supabase
  useEffect(() => {
    const getCategories = async () => {
      const data = await fetchEventCategory();
      setCategories(data);
    };
    getCategories();
  }, []);

  return (
    <div className="w-5/6 mx-auto mt-8 pb-10">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-900 dark:text-white">
        Choose Events Categories
      </h2>
      <div className="flex gap-2 flex-wrap justify-center">
        {/* Wyświetlanie kafelków kategorii */}
        {categories.map((category) => (
          <div
            key={category.id}
            className="bg-gray-700 px-4 py-2 rounded-full text-sm text-white cursor-pointer hover:bg-gray-600 transition duration-200"
          >
            {category.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategorySlider;
