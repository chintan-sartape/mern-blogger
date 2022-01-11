import { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';

import { RootState } from '../../redux/reducers/root-reducer';
import { UserModel } from '../../models/user';

const Profile: FC = () => {

  const user: UserModel = useSelector((state: RootState) => state.loginUser);
  const [showModal, setShowModal] = useState<boolean>(false);
  const navigate = useNavigate();
  const { _id, name, email } = user;

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  // const handleDeleteUser = async (e: { preventDefault: () => void; }) => {
  //   e.preventDefault();

  //   const result = await axios.delete(`http://localhost:3300/employees/${user._id}`);
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
        <Link
          to={`/user/edit/${_id}`}
          className="btn btn-primary">Edit
        </Link>
        &nbsp;
        <button
          onClick={handleShowModal}
          className="btn btn-danger">Delete
        </button>

        &nbsp;
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
          <b>Name: {name}<br />
            Email: {email}</b>
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

export default Profile;
