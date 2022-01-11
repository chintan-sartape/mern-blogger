import { FC } from 'react'

import RouterConfig from '../../router-config';
import Sidebar from './sidebar';

const Body: FC = () => {
  return (
    <div className='row'>
      <div className="col-2">&nbsp;&nbsp;<Sidebar /></div>
      <div className="col-10">&nbsp;<RouterConfig /></div>
    </div>
  )
}

export default Body;
