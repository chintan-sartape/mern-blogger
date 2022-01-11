import { useDispatch, useSelector } from 'react-redux';
import { FC, useEffect } from 'react';

import { RootState } from '../../redux/reducers/root-reducer';
import { setCategories } from '../../redux/actions/category-actions';
import { resetLoader, setLoader } from '../../redux/actions/loader-actions';
import Category from './category';

import apiConfig from "../axios/services";
import { CategoryModel } from '../../models/category';

const Categories: FC = () => {

  useEffect(() => {
    loadCategories();
  }, []);

  const dispatch = useDispatch();
  const allCategories: CategoryModel[] = useSelector((state: RootState) => state.allCategories.categorirs);

  const loadCategories = async () => {
    const result = await apiConfig.get(`categories`);
    dispatch(setLoader(true));
    dispatch(setCategories(result.data));
    dispatch(resetLoader(false));
    // { Object.keys(allCategories).length > 0 ? displayCategories() : noCategory() }
  }

  function displayCategories() {
    return (
      <>
        <div className="container">
          <div className="row row-cols-1 row-cols-md-3 g-4">
            <Category allCategories={allCategories} />
          </div>
        </div>
      </>
    )
  }

  function noCategory() {
    return (
      <>
        <h1>Please add categories</h1>
      </>
    )
  }

  return (
    <div className="container">
      {
        Object.keys(allCategories).length > 0
          ? displayCategories()
          : noCategory()
      }
    </div>
  )
}

export default Categories;
