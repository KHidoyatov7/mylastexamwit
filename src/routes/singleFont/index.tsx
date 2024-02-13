import { Link, useLocation } from 'react-router-dom';
import { Font } from '../../types';
import './index.scss';
import { GoogleFontLoader } from '../home/index';
import { useEffect, useState } from 'react';
import { API_URL } from '../../helpers/features/api';
import Sidebar from '../../components/sidebar/Sidebar';
import { FiPlus } from 'react-icons/fi';

interface LocationState {
  font: Font;
}

interface SingleFontProps {
  onBack: () => void;
  font: Font;
}

const FontInfo = ({ fontName }: { fontName: string }) => {
    const [fontVariants, setFontVariants] = useState<string[]>([]);
  
    useEffect(() => {
      const fetchFontInfo = async (fontName: string) => {
        try {
          const response = await fetch(`${API_URL}&family=${(fontName)}`);
          const data = await response.json();
          const fontInfo = data.items.find((item: Font) => item.family === fontName);
          if (fontInfo) {
            setFontVariants(fontInfo.variants);
          }
        } catch (error) {
          console.error('Error fetching font info:', error);
        }
      };
  
      fetchFontInfo(fontName);
    }, [fontName]);

    const parseVariant = (variant: string) => {
      const weight = variant
      return { weight };
    };
    
    
    
    const saveFontSelection = (fontName: string, variant: string) => {
      const selectedFonts = JSON.parse(localStorage.getItem('selectedFonts') || '[]');
      const fontIndex = selectedFonts.findIndex((item: { fontName: string; }) => item.fontName === fontName);
    
      if (fontIndex !== -1) {
        if (!selectedFonts[fontIndex].variants.includes(variant)) {
          selectedFonts[fontIndex].variants.push(variant);
        }
      } else {
        selectedFonts.push({ fontName, variants: [variant] });
      }
    
      localStorage.setItem('selectedFonts', JSON.stringify(selectedFonts));
      window.dispatchEvent(new Event('localStorageChange'));
    };
    
    
    const handleAddVariant = (variant: string) => {
      saveFontSelection(fontName, variant);
    };
    
  
    
    
    return (
      <div className='fonto'>
        {fontVariants.map(variant => {
          const { weight} = parseVariant(variant);
          return (
            <div className='fonto__font-cardo' key={variant} style={{ fontFamily: fontName, fontWeight: weight }}>
                <span>{weight}</span>
              <div style={{display: 'flex', justifyContent: 'space-between'}}><p>{`Whereas recognition of the inherent dignity`}</p>  <FiPlus onClick={() => handleAddVariant(variant)} style={{ cursor: 'pointer' }} /></div>
            </div>
          );
        })}
      </div>
    );
  };
  
  
  const SingleFont = ({ onBack }: SingleFontProps) => {
    const location = useLocation();
    const state = location.state as LocationState;

    
    
    return (
      <div className='container1'>
        <div className='header'>
          <div className='header__flex'>
            <h1 className='header__one'>{state.font.family}</h1>
            <div style={{display: 'flex', alignItems: 'center', gap: '40px'}}>
              <button onClick={onBack}><Link to="/">back to home</Link></button>
              <Sidebar/>
            </div>  
          </div>
          <p className='header__p'>Category: {state.font.category}</p>
        </div>
        <GoogleFontLoader
          fontName={state.font.family}
          fontCategory={state.font.category}
          userInput=""
          fontSize={40}
          onClick={() => {}}
        />
        <FontInfo fontName={state.font.family} />
      </div>
    );
  };
  
export default SingleFont;
 