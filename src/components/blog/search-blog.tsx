import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { RootState } from '../../redux/reducers/root-reducer';
import { setBlogs } from '../../redux/actions/blog-actions';
import { resetLoader, setLoader } from '../../redux/actions/loader-actions';
import Blog from './blog';

import apiConfig from '../axios/services';
import { BlogModel } from '../../models/blog';

const SearchBlog = () => {

  const location: string = useLocation().search;
  const allBlogs: BlogModel[] = useSelector((state: RootState) => state.searchBlogs.blogs);
  const searchInput: string = useSelector((state: RootState) => state.searchInput.input);
  const dispatch = useDispatch();

  const loadBlogs = async () => {
    const result = await apiConfig.get(`blogs`);
    dispatch(setLoader(true));
    dispatch(setBlogs(result.data));
    dispatch(resetLoader(false));
  }
  if (Object.keys(allBlogs).length === 0) {
    loadBlogs();
  }

  return (
    <div className="container">
      <h1>Search result - <b><i>{searchInput}</i></b></h1>
      {
        location.includes("/na")
          ?
          <>
            <h2>No blog found</h2>
          </>
          :
          <div className="row row-cols-1 row-cols-md-3 g-4">
            <Blog blogs={allBlogs} />
          </div>
      }
    </div>
  )
}

export default SearchBlog;
