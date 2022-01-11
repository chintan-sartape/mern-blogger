import { FC, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';

import apiConfig from '../axios/services';
import { InitUser, UserModel } from '../../models/user';
import { resetLoader, setLoader } from '../../redux/actions/loader-actions';
import { useDispatch } from 'react-redux';

const UserDetails: FC = () => {

  const [blogCount, setblogCount] = useState<number>(0);
  const [user, setUser] = useState<UserModel>(InitUser);
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {

    const loadUser = async () => {
      const result = await apiConfig.get(`users/${id}`);
      dispatch(setLoader(true));
      setUser(result.data);
      dispatch(resetLoader(false));
    }

    const loadUserBlogs = async () => {
      const result = await apiConfig.get(`blogs/author/${id}`);
      setblogCount(result.data.length);
    }

    loadUser();
    loadUserBlogs();

  }, [id]);

  const [showModal, setShowModal] = useState<boolean>(false);
  const { _id, name, email } = user;
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  // const handleDeleteUser = async (e: { preventDefault: () => void; }) => {
  //   e.preventDefault();

  //   const result = await apiConfig.delete(`employees/${user._id}`);
  //   // dispatch(setusers(result.data));
  //   navigate('/');
  // }

  return (
    <div className="container">
      <h1>User Details</h1>

      <div>
        <div className="mb-3">
          email: {email}
        </div>
        <div className="mb-3">
          name: {name}
        </div>
        {/* <Link
          to={`/user/edit/${_id}`}
          className="btn btn-primary">Edit
        </Link> */}
        {/* &nbsp; */}
        {/* <button
          onClick={handleShowModal}
          className="btn btn-danger">Delete
        </button> */}
        {/* &nbsp; &nbsp; */}

        {blogCount > 0 &&
          <>
            <Link
              className='btn btn-outline-dark'
              to={`/user/blogs/${_id}`}>View Blogs
            </Link>
            &nbsp; &nbsp;
          </>
        }

        <button
          onClick={() => navigate(-1)}
          className="btn btn-outline-primary">Go back
        </button>

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
          <h3>Are you sure you want to delete user: </h3>
          {/* <b>Name: {name}<br /> */}
          {/* Email: {email}</b> */}
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

    </div>
  )
}

export default UserDetails;
