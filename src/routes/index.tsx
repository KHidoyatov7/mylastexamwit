import {Routes, Route} from 'react-router-dom'
import { FontsDisplay } from '../routes/home'
import SingleFont from '../routes/singleFont'
const RouteController = () => {
  return (
    <div>
        <Routes>
        <Route path='/' element={<FontsDisplay/>}/>
          <Route path='/singlefont' element={<SingleFont onBack={function (): void {
            throw new Error('Function not implemented.')
          } } font={{
            family: '',
            category: ''
          }}/>}/>
        </Routes>
    </div>
  )
}

export default RouteController