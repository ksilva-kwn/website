import React from 'react';

const InteractiveMap = () => {
  return (
    <div className="w-full" style={{ height: '400px' }}>
      <iframe
        width="100%"
        height="100%"
        style={{ border: 0 }}
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15024.520473528263!2d-46.60252613106571!3d-20.71804153913076!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94b414e8b3507d3b%3A0x7d6b38c3e0e7a188!2sPassos%2C%20MG%2C%20Brazil!5e0!3m2!1sen!2sbr!4v1716301648086!5m2!1sen!2sbr"
      ></iframe>
    </div>
  );
};

export default InteractiveMap;