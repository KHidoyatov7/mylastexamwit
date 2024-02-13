import React, { useState } from 'react';
import logo from '../../assets/svg.png';
import './Navigation.css';
import { HiAdjustments } from 'react-icons/hi';
import { HiMiniShoppingBag } from 'react-icons/hi2';

interface NavigationProps {
  onSearchChange: (newSearchTerm: string) => void;
  onFilterChange: (newFilter: string) => void;
  onTogglePanel?: () => void;
  inputStyle: React.CSSProperties;
}
const Navigation: React.FC<NavigationProps> = ({ onSearchChange, onFilterChange, onTogglePanel, inputStyle }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filter, setFilter] = useState<string>('');
  const [clickedButton, setClickedButton] = useState(false);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);
    onSearchChange(newSearchTerm);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newFilter = e.target.value;
    setFilter(newFilter);
    onFilterChange(newFilter);
  };
  
  const handleTransform = () => {
    setClickedButton(!clickedButton);
    console.log(clickedButton);
    if (onTogglePanel) {
      onTogglePanel();
    }
  };  


  return (
    <div className='container'>
    <div className="navigation">
      <img className="logo" src={logo} alt="Logo" />
      <div className="search-input-container" style={inputStyle}>
        <input
        style={inputStyle}
          type="text"
          placeholder="Search fonts"
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
        <select value={filter} onChange={handleFilterChange} className="filter-select">
          <option value="">All</option>
          <option value="sans-serif">sans-serif</option>z
          <option value="display">display</option>
          <option value="serif">serif</option>
          <option value="handwriting">hand writing</option>
          <option value="monospace">monospace</option>
        </select>
      </div>
      <HiMiniShoppingBag />
    </div>
    <button className='filter' onClick={handleTransform}><HiAdjustments /> Filters</button>
  </div>
  
  );
};

export default Navigation;
export type { NavigationProps };
