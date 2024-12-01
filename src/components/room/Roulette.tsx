import { forwardRef, useImperativeHandle, useRef } from 'react';
import styles from './Room.module.css';

type RouletteContents = { name: string };

export type RouletteRef = {
  rotate: (winner: string) => void;
};

export const Roulette = forwardRef(function _Roulette({ list }: { list: RouletteContents[] }, ref) {
  const wheelRef = useRef<HTMLDivElement | null>(null);

  useImperativeHandle<RouletteRef>(ref, () => ({
    rotate: spin,
  }));

  const spin = (winnerName: string) => {
    const currentIndex = Math.floor(list.length / 2);
    const position = list.findIndex((m) => m.name === winnerName);

    const rows = 12;
    // Determine position where to land
    const cardWidth = 75;
    const cardGap = 6; // Updated gap to match the correct spacing
    const cardsPerRow = list.length;
    const cardSpacing = cardWidth + cardGap; // Total width of each card

    // 현재와 목표 위치 간의 거리 계산
    const relativeDistance = (rows * cardsPerRow + position - currentIndex) * cardSpacing;

    // 랜덤 오프셋 추가
    const randomize = Math.random() * (cardWidth / 2);
    const landingPosition = relativeDistance + randomize;

    const axes = {
      x: Math.floor(Math.random() * 50) / 100,
      y: Math.floor(Math.random() * 20) / 100,
    };

    if (!wheelRef.current || !wheelRef.current?.style) return;

    // Set animations and spinner translation
    wheelRef.current!.style.transitionTimingFunction = `cubic-bezier(0, ${axes.x}, ${axes.y}, 1)`;
    wheelRef.current!.style.transitionDuration = `6s`;
    wheelRef.current!.style.transform = `translate3d(-${landingPosition}px, 0, 0)`;

    // Reset animations and translation to init a new round
    setTimeout(() => {
      wheelRef.current!.style.transitionTimingFunction = '';
      wheelRef.current!.style.transitionDuration = '';
      const resetPosition = -(landingPosition % (cardsPerRow * cardSpacing));
      wheelRef.current!.style.transform = `translate3d(${resetPosition}px, 0px, 0px)`;
    }, 6000);
  };

  return (
    <div className={styles.RouletteWrapper}>
      <div className={styles.Selector}></div>
      <div className={styles.Wheel} ref={wheelRef}>
        {Array.from({ length: 29 }).map(() => (
          <div className={styles.Row}>
            {list.map((m) => (
              <div key={m.name} className={styles.Card}>
                {m.name}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
});
