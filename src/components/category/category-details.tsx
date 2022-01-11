import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

import { resetLoader, setLoader } from '../../redux/actions/loader-actions';
import { selectedCategory } from '../../redux/actions/category-actions';
import { RootState } from '../../redux/reducers/root-reducer';
import { useDispatch, useSelector } from 'react-redux';

import apiConfig from '../axios/services';
import { CategoryModel, initCategory } from '../../models/category';

const CategoryDetails = () => {

  const loginUser = useSelector((state: RootState) => state.loginUser);
  const [category, setCategoty] = useState<CategoryModel>(initCategory);

  let navigate = useNavigate();
  const { id }: any = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    loadUser();
  }, [id]);

  const loadUser = async () => {
    const result = await apiConfig.get(`categories/${id}`);
    dispatch(setLoader(true));
    dispatch(selectedCategory(result.data));
    setCategoty(result.data);
    dispatch(resetLoader(false));
  }

  const [showModal, setShowModal] = useState<boolean>(false);
  const { _id, name, desc } = category;
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const actionLinks = () => {
    return (
      <>
        <Link
          to={`/blog/edit/${_id}`}
          className="btn btn-primary">Edit
        </Link>
        &nbsp;
        <button
          onClick={handleShowModal}
          className="btn btn-danger">Delete
        </button>
      </>
    )
  }

  return (
    <div className="container">
      <h1>Category Details</h1>
      <div>
        <div className="mb-3">
          <h4>Category Name: {name}</h4>
        </div>
        <div className="mb-3">
          Desc: {desc}
        </div>
        {loginUser._id 
          ? actionLinks()
          : ""
        }
        &nbsp;
        <button
          onClick={() => navigate(-1)}
          className="btn btn-outline-primary">Go back
        </button>
        &nbsp;
        <Link
        className='btn btn-outline-secondary'
        to={`/view/blogs/category/${id}`} >View Blogs
        </Link>
      </div>

      <Modal
        show={showModal}
        onHide={handleCloseModal}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h3>Are you sure you want to delete category: </h3>
          <b>Category: {name} </b>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={handleCloseModal}>Close
          </Button>
          {/* <Button
            className="btn btn-danger"
            variant="Danger"
            onClick={handleDeleteUser}>Yes delete
          </Button> */}
        </Modal.Footer>
      </Modal>

    </div >
  )
}

export default CategoryDetails;
