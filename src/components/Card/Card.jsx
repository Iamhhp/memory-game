import './Card.css';
import { memo } from 'react';

const Card = ({ imgCard, nameCard, numCard, setClickCard }) => {
  const clickHandlerCard = (e) => {
    const card = e.target;
    if (card.classList.contains('fix-card') || card.classList.contains('card-rotate')) {
      return;
    }

    const result = card.classList.toggle('card-rotate');
    if (result) {
      card.style.backgroundImage = `url(${imgCard})`;
      setClickCard((prevState) => [...prevState, { nameCard, numCard }]);
    }
  };

  return (
    <div
      className='card'
      onClick={(e) => {
        clickHandlerCard(e);
      }}
    ></div>
  );
};
export default memo(Card);
