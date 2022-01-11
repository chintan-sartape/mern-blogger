import { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../redux/reducers/root-reducer';
import { setOtherUserBlogs, setUserBlogs } from '../../redux/actions/blog-actions';
import { resetLoader, setLoader } from '../../redux/actions/loader-actions';
import Blog from './blog';

import apiConfig from '../axios/services';
import { BlogModel } from '../../models/blog';

const UserBlogs: FC = () => {
  const loginUserID: string | null = sessionStorage.getItem('loginUserID');
  const { userID } = useParams();
  const blogs: BlogModel[] = useSelector((state: RootState) => state.userBlogs.blogs);
  const otherBlogs: BlogModel[] = useSelector((state: RootState) => state.otherUserBlogs.blogs);
  const dispatch = useDispatch();

  useEffect(() => {
    const loadOtherUserBlogs = async () => {
      const result = await apiConfig.get(`blogs/userblogs/${userID}`);
      dispatch(setLoader(true));
      dispatch(setOtherUserBlogs(result.data));
      dispatch(resetLoader(false));
    }

    loadOtherUserBlogs();
  }, [userID]);

  useEffect(() => {
    const loadBlogs = async () => {
      const result = await apiConfig.get(`blogs/userblogs/${loginUserID}`);
      dispatch(setLoader(true));
      dispatch(setUserBlogs(result.data));
      dispatch(resetLoader(false));
    }

    loadBlogs();
  }, [loginUserID]);

  const noBlogs = () => {
    return (
      <>
        <h1>No Blogs</h1>
      </>
    )
  }

  return (
    <div className="container">
      {
        Object.keys(blogs).length > 0
          ?
          <>
            <div className="row row-cols-1 row-cols-md-3 g-4">
              <Blog blogs={blogs} />
            </div>
          </>
          : noBlogs()
      }
    </div>
  )
}

export default UserBlogs;
