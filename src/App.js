import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Master from './Component/MainComponent/Master';
import Home from './Component/MainComponent/Home';
import Product from './Component/MainComponent/Product';
import Dashboard from './Component/MainComponent/Dashboard';
import Allcontent from './Component/MainComponent/componentadmin/Sidebar.js/Allcontent';
import Shoplist from './Component/MainComponent/Shoplist';
import Shopform from './Component/MainComponent/componentadmin/Shopcomponent/Shopform';
import Shoporder from './Component/MainComponent/Shopordercomponent/Shoporder';
import ShopTable from './Component/MainComponent/componentadmin/Shopcomponent/ShopTable';
// import Shoporder from './Component/MainComponent/Shopordercomponent/Shoporder';
// import verticaleNavbar from './Component/MainComponent/componentadmin/verticaleNavbar';
// import DashApp from './Component/Admincomponent/DashApp';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/'element={<Master Rcf={Home} />}/>
        <Route path='/product' element={<Master Rcf={Product}/>}/>
        <Route path='/dashboard' element={<Master Rcf={Dashboard}/>}/>
        <Route path='/dash' element={<Allcontent />}/>
        <Route path='/shop/:shopName' element={<Master Rcf={Shoplist}/>}/>
<Route path='/shopform' element={<Master Rcf={Shopform}/>}/>
        {/* <Route path='/dash' element={<Master Rcf={verticaleNavbar}/>}/> */}
        {/* <Route path='/dashboards' element={<DashApp/>}></Route> */}
        {/* <Route path="/shop/:shopName" element={<Master Rcf={Shoporder}/>} /> */}
        <Route path="/product/:productName" element={<Master Rcf={Shoporder}/>} />
        <Route path='/shoptale' element={<Master Rcf={ShopTable}/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
