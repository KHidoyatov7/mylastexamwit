export type Font = {
    family: string;
    category: string;    
    variants: string[];
    fontName: string
  }
  interface NavigationProps {
    onSearchChange: (newSearchTerm: string) => void;
    onFilterChange: (newFilter: string) => void;
    onTogglePanel?: () => void;
  }
  
  export default NavigationProps