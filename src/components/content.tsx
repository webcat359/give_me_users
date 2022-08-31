import { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";
interface IUser {
  [x: string]: any;
  ID: number;
  JobTitle: string;
  EmailAddress: string;
  FirstNameLastName: string;
  Email: string;
  Phone: string;
  Company: string;
}

const Content = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [page, setPage] = useState(0);
  useEffect(() => {
    axios
      .get<IUser>(
        `https://give-me-users-forever.herokuapp.com/api/users/${page}/next`
      )
      .then(({ data }) => {
          setUsers(data.users);
      });
  }, [page]);
  const goNext = (num: Number) => {
        num > 0 ? setPage(page + 1) : page === 0 ? alert() : setPage(page - 1);
  };
  return (
    <div className="p-4">
      <div className="text-[20px]">UserList</div>
      <table id="customers">
        <tr>
          <th>ID</th>
          <th>Job</th>
          <th>Email Address</th>
          <th>Full Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Company</th>
        </tr>
        {users.slice(0, 10).map((user: IUser, i: number) => (
          <tr key={i}>
            <td>{i + 1}</td>
            <td>{user.JobTitle}</td>
            <td>{user.EmailAddress}</td>
            <td>{user.FirstNameLastName}</td>
            <td>{user.Email}</td>
            <td>{user.Phone}</td>
            <td>{user.Company}</td>
          </tr>
        ))}
      </table>
      <div className="pt-2 flex justify-center">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full m-2" onClick={() => goNext(-1)}>
          Prev
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full m-2"
          onClick={() => goNext(1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};
export default Content;
