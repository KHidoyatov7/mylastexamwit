import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
// import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
// import ListItem from '@mui/material/ListItem';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
// import InboxIcon from '@mui/icons-material/MoveToInbox';
// import MailIcon from '@mui/icons-material/Mail';
import { HiOutlineShoppingBag } from 'react-icons/hi'; // react-icons'dan import qilish
import { Font } from '../../types';
import "./Sidebar.scss"
import { FiAlertCircle } from 'react-icons/fi';

export default function SwipeableTemporaryDrawer() {
  const [state, setState] = React.useState({
    right: false,
  });

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event &&
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setState({ right: open });
  };

  const [selectedFonts, setSelectedFonts] = React.useState([]);
  const removeFont = (font: string) => {
    localStorage.removeItem('selectedFonts');
    window.dispatchEvent(new Event('localStorageChange'));
    window.location.reload()
    console.log(font)
  }
  React.useEffect(() => {
    const handleStorageChange = () => {
      const storedFonts = localStorage.getItem('selectedFonts');
      if (storedFonts) {
        setSelectedFonts(JSON.parse(storedFonts));
      }
    };
    window.addEventListener('localStorageChange', handleStorageChange);
    return () => {
      window.removeEventListener('localStorageChange', handleStorageChange);
    };
  }, []);

  React.useEffect(() => {
    const storedFonts = localStorage.getItem('selectedFonts');
    if (storedFonts) {
      setSelectedFonts(JSON.parse(storedFonts));
    }
  }, []);
  const copyEmbedCodeToClipboard = (embedCode: string) => {
    navigator.clipboard.writeText(embedCode)
      .then(() => {
        console.log('Embed kodi muvaffaqiyatli nusxalandi');
      })
      .catch(err => {
        console.error('Nusxalashda xatolik:', err);
      });
  };

  const list = () => (
    <Box
      sx={{
         width: 350,
         bgcolor: '#2d2e31', 
         height: '100%',
         overflowX: 'hidden'
        }}
      role="presentation"
      onKeyDown={toggleDrawer(false)}
    >
{
  selectedFonts.length > 0 ? (
    selectedFonts.map((font: Font) => {
      const embedCode = `
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=${font.fontName.replace(/\s+/g, '+')}:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet">`.trim();

      return (
        <div className='fonts' key={font.fontName}>
          <div className='fonts__box'>
            <h3 className='fonts__box__h3'>{font.fontName}</h3>
            <div className='fonts__box__block'>
              {font.variants.map((variant, index) => (
                <p key={index}>{variant}</p>
              ))}
              <button onClick={() => removeFont(font.fontName)} className='btn'>Remove All</button>
            </div>
          </div>
          <h4 style={{color: 'white', fontSize: '12px', marginTop: '20px', marginBottom: '20px'}}>Embed code in the &lt;head&gt; of your html</h4>
          <div className='copyy'>
            <code style={{marginBottom: '20px'}}>{embedCode}</code>
            <button style={{padding: '10px 20px', marginBottom: '20px', color: '#6d6dff', border: '1px solid #6d6dff', background: 'transparent', borderRadius: '10px'}} onClick={() => copyEmbedCodeToClipboard(embedCode)} className='btn'>Copy Embed Code</button>
          </div>
        </div>
      );
    })
  ) : (
    <div className="no-fonts" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', height: '100%'}}>
      <FiAlertCircle style={{ fontSize: '50px', color: 'white'}}/>  
      <h4 style={{color: 'white', fontSize: '22px', marginTop: '20px', textAlign: 'center', fontFamily: 'sans-serif'}}>Hech qanday fontlar tanlanmagan...</h4>
    </div>
  )
}   {/* <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List> */}
      <Divider />
      {/* <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List> */}
    </Box>
  );
  return (
    <div>
      <Button onClick={toggleDrawer(true)}>
        <HiOutlineShoppingBag />
      </Button>
      <SwipeableDrawer
        anchor='right'
        open={state.right}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        {list()}
      </SwipeableDrawer>
    </div>
  );
}