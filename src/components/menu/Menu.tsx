/* eslint-disable no-unused-vars */
import React from "react";

type MenuProps = {
  setSelectedCategory: (category: string) => void;
};

const Menu = ({ setSelectedCategory }: MenuProps) => {
  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  const menus = [
    "All",
    "Adventure",
    "Travel",
    "Fashion",
    "Technology",
    "Branding"
  ] as const;

  return (
    <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700 cursor-pointer">
      <ul className="flex flex-wrap -mb-px">
        {menus.map((menu, index) => (
          <li className="mr-2" key={index}>
            <a
              onClick={() => handleCategoryClick(menu)}
              className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
            >
              {menu}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Menu;
