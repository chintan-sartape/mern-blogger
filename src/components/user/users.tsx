import { useDispatch, useSelector } from 'react-redux';
import { FC, useEffect } from 'react';

import { setUsers } from '../../redux/actions/user-actions';
import { resetLoader, setLoader } from '../../redux/actions/loader-actions';
import { RootState } from '../../redux/reducers/root-reducer';
import User from './user';

import apiConfig from '../axios/services';
import { UserModel } from '../../models/user';

const Users: FC = () => {

  const dispatch = useDispatch();
  const allUsers: UserModel[] = useSelector((state: RootState) => state.allUsers.users);

  useEffect(() => {
    const loadUsers = async () => {
      const result = await apiConfig.get(`users`);
      dispatch(setLoader(true));
      dispatch(setUsers(result.data));
      dispatch(resetLoader(false));
    }

    loadUsers();
  }, []);


  return (
    <div className="container">
      {allUsers.map((user: UserModel) => (
        <User user={user} key={user._id}/>
      ))}
    </div>
  )
}

export default Users;
