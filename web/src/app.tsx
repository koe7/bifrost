import { BrowserRouter, Route, Routes } from 'react-router-dom';
import tw from 'twin.macro';

import { useChangeWallet } from '~/hooks/data/use-change-wallet';

import { Footer } from './pages/footer';
import { Header } from './pages/header';
import MainPage from './pages/main';
import PortfolioPage from './pages/portfolio';

const RouteWrapper = tw.main`relative w-full h-full`;
const App = () => {
  useChangeWallet();

  return (
    <BrowserRouter>
      <RouteWrapper>
        <Header/>
        <Routes>
          <Route path="/" element={<PortfolioPage />} />
        </Routes>
        <Footer/>
      </RouteWrapper>
    </BrowserRouter>
  );
};

export default App;
