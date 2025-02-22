import React, { useState, useEffect } from 'react';

function NavBar() {
  // Step 1: Create state to manage theme (light or dark)
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Step 2: Set the theme on mount or when the state changes
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Step 3: Toggle the theme
  const toggleTheme = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  return (
    <div className="h-[80px] flex items-center justify-between p-[5px] w-full">
      {/* Logo Container */}
      <div className="img-con ml-5">
        <img
          src="/assets/logo/logo.svg"
          alt="Logo"
          className="h-[70px] w-[70px] bg-transparent"  
        />
      </div>

      {/* Theme Icon and Button */}
      <div className="theme-icon-con cursor-pointer" onClick={toggleTheme}>
        <img
          src={isDarkMode ? "/assets/icons/moon.png" : "/assets/icons/sun.png"}  // Change icon based on theme
          alt="theme"
          className="h-[45px] w-[45px] bg-transparent"  
        />
      </div>
    </div>
  );
}

export default NavBar;
