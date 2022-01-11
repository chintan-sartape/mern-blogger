import { useDispatch, useSelector } from 'react-redux';
import { FC, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import { RootState } from '../../redux/reducers/root-reducer';
import { setBlogs } from '../../redux/actions/blog-actions';
import { resetLoader, setLoader } from '../../redux/actions/loader-actions';

import BlogCategoryName from '../blog/blog-category-name';
import BlogAuthorName from '../blog/blog-author-name';

import apiConfig from '../axios/services';
import { BlogModel } from '../../models/blog';
import Blog from '../blog/blog';

const CategoryWiseBlogs: FC = () => {

  const { catID }: any = useParams();
  const dispatch = useDispatch();
  const allBlogs: BlogModel[] = useSelector((state: RootState) => state.allBlogs.blogs);

  useEffect(() => {
    const loadBlogs = async () => {
      const result = await apiConfig.get(`blogs/category/${catID}`);
      dispatch(setLoader(true));
      dispatch(setBlogs(result.data));
      dispatch(resetLoader(false));
    }

    loadBlogs();
  }, [catID]);

  const displayBlogs = () => {
    return (
      <>
        <h1><BlogCategoryName blogCategoryID={catID} /></h1>
        <div className="row row-cols-1 row-cols-md-3 g-4">
          <Blog blogs={allBlogs} />
        </div>
      </>
    )
  }

  const noBlogs = () => (
    <>
      <h1>Please add blogs</h1>
    </>
  )

  return (
    <div className="container">
      {
        Object.keys(allBlogs).length > 0
          ? displayBlogs() : noBlogs()
      }
    </div>
  )
}

export default CategoryWiseBlogs;