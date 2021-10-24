/* eslint-disable  */
// ** User List Component
import Table from './Table'
import { Fragment, useState, useEffect } from "react";

// ** Styles
import '@styles/react/apps/app-users.scss'
import { addUsers } from "../store/action";
import { useDispatch, useSelector } from "react-redux";
import userServices from "../../../../services/userServices"
import { onErrorToast } from '../../../common/Toaster';

const UsersList = () => {
  const store = useSelector(store => store.users);
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false);

  const load = async () => {
    setIsLoading(true);
    try {
      const res = await userServices.getAllUser();
      dispatch(addUsers(res.data.results));
    } catch (err) {
      onErrorToast(err.data.massage);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [dispatch]);

  return (
    <div className='app-user-list'>
      <Table />
    </div>
  )
}

export default UsersList
