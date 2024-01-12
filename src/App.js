import './App.css';
import Card from './components/Card/Card';
import img01 from './assets/imgs/helmet-1.png';
import img02 from './assets/imgs/potion-1.png';
import img03 from './assets/imgs/ring-1.png';
import img04 from './assets/imgs/scroll-1.png';
import img05 from './assets/imgs/shield-1.png';
import img06 from './assets/imgs/sword-1.png';
import { useEffect, useRef, useState } from 'react';
import Modal from './components/Modal/Modal';
import { LiaQuestionSolid } from 'react-icons/lia';
import { IoInformation } from 'react-icons/io5';

const App = () => {
  const parentCards = useRef(null);
  const [pairCard, setPairCard] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showModalWin, setShowModalWin] = useState(false);
  const countPairedCard = useRef(0);
  const countMove = useRef(0);
  const bestRecord = useRef(0);
  const showTimer = useRef(null);
  const countTimer = useRef(null);

  const [dataCard, setDataCard] = useState([
    { imgCard: img01, nameCard: 'card01' },
    { imgCard: img02, nameCard: 'card02' },
    { imgCard: img03, nameCard: 'card03' },
    { imgCard: img04, nameCard: 'card04' },
    { imgCard: img05, nameCard: 'card05' },
    { imgCard: img06, nameCard: 'card06' },
    { imgCard: img01, nameCard: 'card01' },
    { imgCard: img02, nameCard: 'card02' },
    { imgCard: img03, nameCard: 'card03' },
    { imgCard: img04, nameCard: 'card04' },
    { imgCard: img05, nameCard: 'card05' },
    { imgCard: img06, nameCard: 'card06' },
  ]);

  useEffect(() => {
    shakeDetailsCard();

    // Function Cleanup
    return () => {
      window.clearInterval(countTimer.current);
    };
  }, []);

  useEffect(() => {
    showAllCard5Sec();
  }, [dataCard]);

  const shakeDetailsCard = () => {
    // const listCard = new Set();
    // const totalCards = dataCard.length;

    // while (listCard.size < totalCards) {
    //   const randomPosition = Math.floor(Math.random() * totalCards);
    //   listCard.add(dataCard[randomPosition]);
    // }

    const listCard = dataCard.sort(() => Math.random() - 0.5);

    setDataCard((prevState) => {
      prevState = [...listCard];
      return prevState;
    });
  };

  const showAllCard5Sec = () => {
    const listCards = [...parentCards.current.children];

    // show All Card for 5 Second
    showTimer.current.innerText = 5;
    showTimer.current.style.display = '';
    listCards.forEach((card, i) => {
      card.classList.add('fix-card');
      card.style.backgroundImage = `url(${dataCard[i].imgCard})`;
    });

    // Hidden All Card after 5Second
    if (!countTimer.current) {
      countTimer.current = window.setInterval(() => {
        const timer = Number(showTimer.current.innerText);
        if (!timer) {
          showTimer.current.style.display = 'none';
          window.clearInterval(countTimer.current);
          countTimer.current = null;

          listCards.forEach((card) => {
            card.classList.remove('fix-card');
            card.style.backgroundImage = '';
          });
        }
        showTimer.current.innerText = timer - 1;
      }, 1000);
    }
  };

  /// Check Pair Cards /////////////////////////////////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    if (pairCard.length === 2) {
      countMove.current++;
      if (checkPairCard()) {
        fixPairCard();
        countPairedCard.current++;
      } else {
        window.setTimeout(hidePairCard, 700);
      }

      setPairCard((prevState) => {
        prevState = [];
        return prevState;
      });

      // finish Card Paired-Game End
      if (countPairedCard.current === 6) {
        window.setTimeout(() => {
          /// save best record
          if (countMove.current <= bestRecord.current || !bestRecord.current) {
            bestRecord.current = countMove.current;
          }

          setShowModalWin(true);
        }, 1000);
      }
    }
  }, [pairCard]);

  const checkPairCard = () => {
    if (pairCard[0].nameCard === pairCard[1].nameCard) {
      return true;
    }
    return false;
  };

  const fixPairCard = () => {
    const firstCard = parentCards.current.children[pairCard[0].numCard];
    const secCard = parentCards.current.children[pairCard[1].numCard];

    window.setTimeout(() => {
      firstCard.classList.add('fix-card');
      secCard.classList.add('fix-card');
    }, 500);
  };

  const hidePairCard = () => {
    const firstCard = parentCards.current.children[pairCard[0].numCard];
    const secCard = parentCards.current.children[pairCard[1].numCard];

    firstCard.classList.remove('card-rotate');
    firstCard.style.backgroundImage = '';
    secCard.classList.remove('card-rotate');
    secCard.style.backgroundImage = '';
  };

  // Click Handlers Modal Box  ////////////////////////////////////////////////////////////////////////////////////////////////
  const clickHandlerRstGame = () => {
    setShowModal(true);
  };

  const clickHandlerResetCards = () => {
    const listCard = [...parentCards.current.children];

    listCard.forEach((child) => {
      child.classList.remove('fix-card');
      child.classList.remove('card-rotate');
      child.style.backgroundImage = '';
    });

    setPairCard((prevState) => {
      prevState = [];
      return prevState;
    });

    countPairedCard.current = 0;
    countMove.current = 0;

    window.setTimeout(() => {
      shakeDetailsCard();
    }, 700);
  };

  return (
    <div className='container'>
      <div className='timer' ref={showTimer}>
        5
      </div>
      {showModal && (
        <Modal
          icon={<LiaQuestionSolid />}
          title={'Reset the Game'}
          desc={'Are you sure you want to reset the game?'}
          textBtnOk={'Yes!'}
          textBtnCancel={'No'}
          clickHandlerOk={clickHandlerResetCards}
          showModal={setShowModal}
        />
      )}
      {showModalWin && (
        <Modal
          icon={<IoInformation />}
          title={'You Win!'}
          desc={`Your Record : ${countMove.current} Moves`}
          textBtnOk={'New Game'}
          textBtnCancel={'Ok!'}
          clickHandlerOk={clickHandlerResetCards}
          showModal={setShowModalWin}
        />
      )}

      <div className='container-cards' ref={parentCards}>
        {dataCard.map((card, i) => (
          <Card {...card} key={i} numCard={i} setClickCard={setPairCard} />
        ))}
      </div>

      <div className='info'>
        <div className='record'>Best Record : {bestRecord.current} Moves</div>
        <div className='move'>Move Record : {countMove.current} Moves</div>
      </div>

      <button type='button' className='btn-reset' onClick={clickHandlerRstGame}>
        New Game
      </button>
    </div>
  );
};
export default App;
