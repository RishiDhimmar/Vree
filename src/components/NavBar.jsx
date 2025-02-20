
function NavBar() {
  return (
    <div className='h-[80px] flex items-center justify-between p-[5px] w-full'>
      {/* Logo Container */}
      <div className="img-con ml-5">
        <img
          src="/assets/logo/logo.svg"
          alt="Logo"
          className='h-[70px] w-[70px] bg-transparent'  // Adjusted logo size and background to transparent
        />
      </div>
      <div className='theme-icon-con'>
        <img
          src="/assets/icons/sun.png"
          alt="theme"
          className='h-[45px] w-[45px] bg-transparent'  // Adjusted logo size and background to transparent
        />
      </div>
    </div>
  );
}

export default NavBar;
