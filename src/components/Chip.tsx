import React from 'react';
import styles from './Chip.module.css';

interface ChipProps {
  label: string;
  selected?: boolean;
  onClick?: () => void;
}

const Chip: React.FC<ChipProps> = ({ label, selected = false, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`${styles.chip} ${selected ? styles.selected : ''}`}
    >
      {label}
    </button>
  );
};

export default Chip;
