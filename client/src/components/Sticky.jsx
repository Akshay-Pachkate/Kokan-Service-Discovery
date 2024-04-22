import { useState, useEffect } from 'react';

const StickyComponent = () => {
  const [isSticky, setSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;

      // Adjust the offset value based on your requirements
      if (offset > 100) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    };

    // Attach the event listener when the component mounts
    window.addEventListener('scroll', handleScroll);

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const stickyStyle = {
    position: isSticky ? 'fixed' : 'static',
    top: isSticky ? '0' : 'auto',
    width: '100%',
    backgroundColor: isSticky ? 'white' : 'transparent', // Change background color as needed
    zIndex: isSticky ? 100 : 'auto', // Set a higher z-index when sticky
    boxShadow: isSticky ? '0 2px 4px rgba(0, 0, 0, 0.1)' : 'none', // Add a subtle shadow when sticky
  };

  return (
    <div style={stickyStyle}>
      {/* Your sticky content goes here */}
      <header>
        <h1>Sticky Header</h1>
      </header>
    </div>
  );
};

export default StickyComponent;
