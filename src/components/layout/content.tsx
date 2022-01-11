import { FC } from 'react';

import Body from './body';
import Footer from './footer';
import Navbar from './navbar';


const Content: FC = () => {
  return (
    <>
      <Navbar />
      <div className='container'>
        <Body />
        <Footer />
      </div>
    </>
  )
}

export default Content;
