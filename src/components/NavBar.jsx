// import React, { useState, useEffect } from 'react';

// function NavBar() {
//   const [isDarkMode, setIsDarkMode] = useState(true);

//   useEffect(() => {
//     if (isDarkMode) {
//       document.documentElement.classList.add('dark');
//     } else {
//       document.documentElement.classList.remove('dark');
//     }
//   }, [isDarkMode]);

//   // Step 3: Toggle the theme
//   const toggleTheme = () => {
//     setIsDarkMode(prevMode => !prevMode);
//     document.querySelector('html').classList.toggle('dark')
//     console.log(document.querySelector('html').classList);
//   };

//   return (
//     <div className="h-[80px] flex items-center justify-between p-[5px] w-full dark:transparent bg-white">
//       {/* Logo Container */}
//       <div className="img-con ml-5">
//         <img
//           src="/assets/logo/logo.svg"
//           alt="Logo"
//           className="h-[70px] w-[70px] bg-transparent"
//         />
//       </div>

//       {/* Theme Icon and Button */}
//       <div className="theme-icon-con cursor-pointer" onClick={toggleTheme}>
//         <img
//           src={!isDarkMode ? "/assets/icons/moon.png" : "/assets/icons/sun.png"}  // Change icon based on theme
//           alt="theme"
//           className="h-[45px] w-[45px] bg-transparent"
//         />
//       </div>
//     </div>
//   );
// }

// export default NavBar;
import React, { useState, useEffect } from "react";
import { selectionStore } from "../store/UISelectionStore";
import { observer } from "mobx-react";

const NavBar = observer(() => {
  const toggleTheme = () => {
    selectionStore.toggleTheme();
  };

  return (
    <div
      className={`h-[80px] flex items-center justify-between p-[5px] w-full transition-colors duration-300  bg-transparent `}
    >
      {/* Logo Container */}
      <div className="ml-5">
        <img
          src="/assets/logo/logo.svg"
          alt="Logo"
          className="h-[70px] w-[70px] "
        />
      </div>

      {/* Theme Toggle Button */}
      <button
        onClick={toggleTheme}
        className="mr-5 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300"
        aria-label={`Switch to ${
          selectionStore.isDarkTheme ? "light" : "dark"
        } mode`}
      >
        <img
          src={
            selectionStore.isDarkTheme
              ? "/assets/icons/sun.png"
              : "/assets/icons/moon.png"
          }
          alt="theme"
          className="h-[45px] w-[45px] transition-transform duration-300 hover:scale-110"
        />
      </button>
    </div>
  );
});

export default NavBar;
