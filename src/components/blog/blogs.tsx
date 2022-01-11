import { useDispatch, useSelector } from 'react-redux';
import { FC, useEffect } from 'react';

import { RootState } from '../../redux/reducers/root-reducer';
import { setBlogs } from '../../redux/actions/blog-actions';
import Blog from './blog';

import apiConfig from '../axios/services';
import { BlogModel } from '../../models/blog';
import { resetLoader, setLoader } from '../../redux/actions/loader-actions';

const Blogs: FC = () => {

  const allBlogs: BlogModel[] = useSelector((state: RootState) => state.allBlogs.blogs);
  const dispatch = useDispatch();

  useEffect(() => {
    const loadBlogs = async () => {
      const result = await apiConfig.get(`blogs`);
      dispatch(setLoader(true));
      dispatch(setBlogs(result.data));
      dispatch(resetLoader(false));
    }
    
    loadBlogs();
  }, []);
  
  return (
    <div className="container">
      <div className="row row-cols-1 row-cols-md-3 g-4">
        <Blog blogs={allBlogs} />
      </div>
    </div>
  )
}

export default Blogs;
