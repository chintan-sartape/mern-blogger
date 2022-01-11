import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { setUsers } from "../../redux/actions/user-actions";
import { RootState } from "../../redux/reducers/root-reducer";

import { UserModel } from "../../models/user";
import apiConfig from "../axios/services";

const UserList: FC = () => {

  const dispatch = useDispatch();
  const allUsers: UserModel[] = useSelector((state: RootState) => state.allUsers.users);

  useEffect(() => {
    const loadUsers = async () => {
      const result = await apiConfig.get(`users`);
      dispatch(setUsers(result.data));
    }

    loadUsers();
  }, []);


  return (
    <div>
      <ol className="list-group">
        {allUsers.map(({ _id, name }: UserModel) => (
          <li key={_id} className="list-group-item d-flex justify-content-between align-items-start">
            <div className="ms-2 me-auto">
              <div className="fw-bold">
                <Link
                  to={`/user/${_id}`}>{name}
                </Link>
              </div>
            </div>
          </li>

        ))}

      </ol>
    </div>
  )
}

export default UserList;
