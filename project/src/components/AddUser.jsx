import { useForm } from 'react-hook-form'
import axios from 'axios'
import Types from 'prop-types'

export const AddUser = ({ onAdd }) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm()

    const handleAdd = (data) => {
        axios
        .post('http://localhost:3004/users', data)
        .then(res => {
            onAdd(res.data)
            reset()
        })
    }

    return <div>
        <h1>AddUser</h1>
        <form onSubmit={handleSubmit(handleAdd)}>
            {errors.name && <p style={{color: 'red'}}>Please fill Name</p>}
            {errors.surname && <p style={{color: 'red'}}>Please fill Surname</p>}
            {errors.salary && <p style={{color: 'red'}}>Please fill Salary</p>}
            <label>name</label>
            <input
                {...register('name', { required: true })}
            />

            <label>surname</label>
            <input
                {...register('surname', { required: true })}
            />

            <label>salary</label>
            <input
                {...register('salary', { required: true })}
            />

            <button>save</button>
        </form>
    </div>
}

AddUser.propTypes = {
    onAdd: Types.func
}