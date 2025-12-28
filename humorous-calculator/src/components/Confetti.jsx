import { useEffect, useState } from 'react';
import './Confetti.css';

function Confetti() {
  const [confettiPieces, setConfettiPieces] = useState([]);

  useEffect(() => {
    const pieces = [];
    for (let i = 0; i < 50; i++) {
      pieces.push({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 3,
        duration: 2 + Math.random() * 3,
        emoji: ['🎉', '🎊', '✨', '⭐', '🌟'][Math.floor(Math.random() * 5)]
      });
    }
    setConfettiPieces(pieces);
  }, []);

  return (
    <div className="confetti-container">
      {confettiPieces.map(piece => (
        <div
          key={piece.id}
          className="confetti-piece"
          style={{
            left: `${piece.left}%`,
            animationDelay: `${piece.delay}s`,
            animationDuration: `${piece.duration}s`
          }}
        >
          {piece.emoji}
        </div>
      ))}
    </div>
  );
}

export default Confetti;
