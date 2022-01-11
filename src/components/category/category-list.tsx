import { FC, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { setCategories } from '../../redux/actions/category-actions';
import { RootState } from '../../redux/reducers/root-reducer';

import { CategoryModel } from '../../models/category';
import apiConfig from '../axios/services';
import BlogCount from './blog-count';

const CategoryList: FC = () => {
  const dispatch = useDispatch();
  const allCategories: CategoryModel[] = useSelector((state: RootState) => state.allCategories.categorirs);
  
  useEffect(() => {
    const loadCategories = async () => {
      const result = await apiConfig.get(`categories`);
      dispatch(setCategories(result.data));
    }
    loadCategories();
  }, []);

  return (
    <div>
      <ol className="list-group">
        {allCategories.map(({ _id, name }: CategoryModel) => (

          <li key={_id} className="list-group-item d-flex justify-content-between align-items-start">
            <div className="ms-2 me-auto">
              <div className="fw-bold">
                <Link
                  to={`view/blogs/category/${_id}`}>{name}
                </Link>
              </div>
            </div>
            <span className="badge bg-primary rounded-pill">
              <BlogCount catID={_id} />
            </span>
          </li>

        ))}

      </ol>
    </div>
  )
}

export default CategoryList;
