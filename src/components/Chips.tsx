import React, { useEffect, useRef, useState } from 'react';
import Popup from 'reactjs-popup';
import Chip from './Chip';
import styles from './Chips.module.css';

interface ChipItem {
  id: string;
  label: string;
}

interface ChipsProps {
  chips: ChipItem[];
  selectedId?: string;
  onSelect?: (id: string) => void;
}

const Chips: React.FC<ChipsProps> = ({ chips, selectedId, onSelect }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const chipRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [visibilityMap, setVisibilityMap] = useState<Record<string, boolean | undefined>>({});

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    chipRefs.current.forEach((chipEl, index) => {
      const chip = chips[index];
      if (!chipEl) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          setVisibilityMap((prev) => ({
            ...prev,
            [chip.id]: entry.intersectionRatio === 1,
          }));
        },
        {
          root: containerRef.current,
          threshold: 1,
        }
      );

      observer.observe(chipEl);
      observers.push(observer);
    });
    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, [chips]);

  const hiddenChips = chips.filter((chip) => visibilityMap[chip.id] === false);

  return (
    <div className={styles['chipsContainer']}>
      <div
        ref={containerRef}
        className={styles['chipsContainer__chips']}
      >
        {chips.map((chip, index) => (
          <div
            key={chip.id}
            ref={(el) => {
              chipRefs.current[index] = el;
            }}
            className={`${styles.chipWrapper} ${visibilityMap[chip.id] === false ? styles.hidden : styles.visible}`}

          >
            <Chip
              label={chip.label}
              selected={selectedId === chip.id}
              onClick={() => onSelect?.(chip.id)}
            />
          </div>
        ))}
      </div>

      {hiddenChips.length > 0 && (
        <Popup
          trigger={<button className={styles.moreButton}><svg viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
          </svg></button>}
          position="bottom right"
          on="click"
          closeOnDocumentClick
        >
          <div className={styles['popup']}
          >
            {hiddenChips.map((chip) => (
              <Chip
                key={chip.id}
                label={chip.label}
                selected={selectedId === chip.id}
                onClick={() => onSelect?.(chip.id)}
              />
            ))}
          </div>
        </Popup>
      )}
    </div>
  );
};

export default Chips;
