import { Link } from "react-router-dom";

const User = (props: any) => {

  const { _id, name, email } = props.user;
  return (
    <>
      <div className="card border-dark mb-3">
        <div className="card-header bg-transparent border-dark">
          <h5>
            <Link
              to={`/user/${_id}`}>{name}
            </Link>
          </h5>
        </div>
        <div className="card-body text-dark">
          <p className="card-text">{email}</p>
        </div>
        <div className="card-footer bg-transparent border-dark">
          <Link
            to={`/user/${_id}`} >View {name} details
          </Link>
        </div>
      </div>
    </>
  )
}

export default User;
