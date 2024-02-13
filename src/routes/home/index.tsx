import { useEffect, useState } from 'react';
import './index.scss';
import { API_URL } from '../../helpers/features/api';
import { Font } from '../../types';
import Navigation from '../../components/filters';
import { FiX } from 'react-icons/fi';
import SingleFont from '../singleFont';
import { useNavigate } from 'react-router-dom';

//GooglefontLoadsdaaaaaaa
const GoogleFontLoader = ({ fontName, fontCategory, userInput, fontSize, onClick }: { fontName: string, fontCategory: string, userInput: string, fontSize: number, onClick: () => void }) => {
  useEffect(() => {
    const fontUrl = `https://fonts.googleapis.com/css2?family=${fontName.replace(/\s+/g, '+')}:wght@400;700&display=swap`;
    const link = document.createElement('link');
    link.href = fontUrl;
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, [fontName]);

  return (
    <div className='font'>
      <div style={{ fontFamily: fontName, marginBottom: '20px' }} className='font-card'  onClick={onClick}>
        <div className='font-card__box'>
          <h3>{fontName}</h3>
          <p>{fontCategory}</p>
        </div>
        <p className='whereas' style={{ fontSize: `${fontSize}px` }}>{userInput || `Everyone has the right to freedom of thought, conscience and religion; this right includes freedom to change his religion or belief, and freedom, either alone or in community with others and in public or private, to manifest his religion or belief in teaching, practice, worship and observance.
Everyone has the right to freedom of opinion and expression; this right includes freedom to hold opinions without interference and to seek, receive and impart information and ideas through any media and regardless of frontiers.
Everyone has the right to rest and leisure, including reasonable limitation of working hours and periodic holidays with pay. `} <span className='fade-out'></span></p>
      </div>
    </div>
  );
};


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//FONTDISPLAY


const FontsDisplay = () => {
  const [fonts, setFonts] = useState<Font[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('');
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [fontSize, setFontSize] = useState(16);
  const [selectedFont, setSelectedFont] = useState<Font | null>(null);
  const navigate = useNavigate();

  const togglePreviewVisibility = () => {
    setIsPreviewVisible(!isPreviewVisible);
  };


  const inputStyle = !isPreviewVisible
    ? { width: "100%" }
    : { width: "60%" };

    

  useEffect(() => {
    fetch(API_URL)
      .then(response => response.json())
      .then(data => setFonts(data.items.slice(0, 200)));
  }, []);

  const filteredFonts = fonts.filter(font => {
    const matchesSearchTerm = font.family.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter ? font.category === selectedFilter : true;
    return matchesSearchTerm && matchesFilter;
  }
  );
  

  return (
    <div className='home' style={{}}>
      <div className='preview' style={{ transform: isPreviewVisible ? 'translateX(0)' : 'translateX(100%)', display: isPreviewVisible ? 'flex' : 'none' }}>
        <div>
          <h2>Preview</h2>
          <FiX onClick={togglePreviewVisibility} />
        </div>
        <textarea placeholder='Type something' onChange={(e) => setUserInput(e.target.value)}></textarea>
        <label htmlFor="">Font Size<br /><br />{`${fontSize}px`}
          <input
            type="range"
            min="40"
            max="300"
            value={fontSize}
            onChange={(e) => setFontSize(Number(e.target.value))}
          />
        </label>
      </div>
      {selectedFont ? (
        <SingleFont font={selectedFont} onBack={() => setSelectedFont(null)} />
      ) : (
        <div className="font-div">
          <Navigation onSearchChange={setSearchTerm} onFilterChange={setSelectedFilter} onTogglePanel={togglePreviewVisibility} inputStyle={inputStyle} />
          <div className='font-div__m'>
            {(searchTerm || selectedFilter ? filteredFonts : fonts).map((font) => (
              <GoogleFontLoader
                key={font.family}
                fontName={font.family}
                fontCategory={font.category}
                userInput={userInput}
                fontSize={fontSize}
                onClick={() => navigate('/singlefont', { state: { font } })}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
  
};

export { FontsDisplay, GoogleFontLoader};
