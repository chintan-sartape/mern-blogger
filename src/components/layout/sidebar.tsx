import { FC } from 'react';

import CategoryList from '../category/category-list';
import UserList from '../user/user-list';

const Sidebar: FC = () => {
  return (
    <div>
      <CategoryList /> &nbsp;&nbsp;
      <UserList />
    </div>
  )
}

export default Sidebar
