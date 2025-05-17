import React from 'react';
import FancyCarousel from 'react-fancy-circular-carousel';
import 'react-fancy-circular-carousel/FancyCarousel.css';

const characters = [
  { id: 'franky', name: 'franky', img: '/franky.png' },
  { id: 'brook', name: 'brook', img: '/brook.png' },
  { id: 'zoro', name: 'Zoro', img: '/zoro.png' },
  { id: 'robin', name: 'Robin', img: '/robin.png' },

  { id: 'chopper', name: 'Chopper', img: '/chopper.png' },
  { id: 'nami', name: 'Nami', img: '/nami.png' },
  { id: 'sanji', name: 'Sanji', img: '/sanji.png' },
  { id: 'luffy', name: 'Luffy', img: '/luffy.png' },
];

const CharacterSelector = ({ selectedCharacter, setSelectedCharacter }) => {
  const images = characters.map((char) => char.img);

  const handleFocusChange = (index) => {
    setSelectedCharacter(characters[index]);
  };

  return (
    <div style={{ marginTop: '1rem', marginBottom: '1rem' }}>
      <FancyCarousel
        images={images}
        setFocusElement={handleFocusChange}
        carouselRadius={140}             // smaller arc
        centralImageRadius={50}          // smaller center
        peripheralImageRadius={35}       // smaller side icons
        border={true}
        borderWidth={2}
        borderHexColor="ffffff"
        animationDuration={400}          // slight speed-up
        lineWidth={0}                    // remove dotted circular line
        arrowSize={30}                   // make arrows smaller
      />
      {selectedCharacter && (
        <p style={{ color: 'white', fontSize: '1.2rem', fontWeight: 'bold', marginTop: '0.5rem' }}>
          {selectedCharacter.name}
        </p>
      )}
    </div>
  );
};

export default CharacterSelector;
