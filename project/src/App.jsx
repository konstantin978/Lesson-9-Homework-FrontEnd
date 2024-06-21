import { useEffect, useState } from 'react'
import './App.css'
import { AddUser } from './components/AddUser'
import { UserList } from './components/UserList'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [users, setUsers] = useState([])

  const addItem = (obj) => {
    setUsers([...users, obj])
    toast.dark('User added successfully!')
  }

  const deleteItem = (obj) => {
    const newUsers = users.filter(user => user.id !== obj.id)
    setUsers(newUsers)

    axios
      .delete(`http://localhost:3004/users/${obj.id}`)
      .then(res => {
        toast.success('User deleted successfully')
      })
      .catch(error => {
        toast.error('Failed to delete user')
      })
  }

  const onSalaryUp = (user) => {
    const updatedUser = { ...user, salary: (parseFloat(user.salary) + 50000).toString() };
    setUsers(users.map(u => (u.id === user.id ? updatedUser : u)));

    axios
      .put(`http://localhost:3004/users/${user.id}`, { salary: updatedUser.salary })
      .then(() => {
        toast.success('Successfully');
      })

  }

  useEffect(() => {
    axios
      .get('http://localhost:3004/users')
      .then(res => {
        setUsers(res.data)
      })
  }, [])

  return (
    <div className='row'>
      <AddUser
        onAdd={addItem}
      />
      <ToastContainer />
      <UserList
        users={users}
        onDelete={deleteItem}
        onSalaryUp={onSalaryUp}
      />
    </div>
  )
}

export default App
