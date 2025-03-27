import Tourist from '../tourist/index';
import PersistentDrawerLeft from '../side-bar/index'
const HomePage = () => {
  return <div>
    
    <div>
        <div className='side-bar'>
        <PersistentDrawerLeft />
        </div>

        <div className='home-page'>
        <Tourist />
        </div>
    </div>
    
    </div>;
};

export default HomePage;
