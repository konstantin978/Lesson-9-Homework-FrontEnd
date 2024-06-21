import Types from 'prop-types'
import './UserList.css';

export const UserList = ({ users, onDelete, onSalaryUp }) => {
    return <div>
        <h1>UserList</h1>
        <table>
            <thead>
                <tr>
                    <th>id</th>
                    <th>name</th>
                    <th>surname</th>
                    <th>salary</th>
                    <th>actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    users.map(user => {
                        return <tr key={user.id} className={user.salary >= 800000 ? 'high-salary' : ''}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.surname}</td>
                            <td>{user.salary}</td>
                            <td>
                                <button onClick={() => onDelete(user)}>Delete User</button>
                                <button onClick={() => onSalaryUp(user)}>Up Salary</button>
                            </td>
                        </tr>
                    })
                }
            </tbody>
        </table>
    </div>
}


UserList.propTypes = {
    users: Types.arrayOf(Types.exact({
        id: Types.string,
        name: Types.string,
        surname: Types.string,
        salary: Types.string
    })
    ),
    onDelete: Types.func,
    onSalaryUp: Types.func
}