import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

const Update = () => {
  const { id } = useParams();
  const [values, setValues] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3000/users/' + id) // Correct endpoint
      .then(res => {
        setValues(res.data); // Set form values to fetched data
      })
      .catch(err => console.log(err));
  }, [id]); // Add `id` as a dependency

  const handleUpdate = (event) => {
    event.preventDefault();
    axios.put(`http://localhost:3000/users/${id}`, values) // Correct axios.put syntax
      .then(res => {
        console.log(res);
        navigate('/'); // Navigate to home after updating
      })
      .catch(err => console.log(err));
  };

  return (
    <div className='d-flex w-100 vh-100 justify-content-center align-items-center bg-light'>
      <div className="w-50 border bg-white shadow px-5 pt-3 pb-5 rounded">
        <h1>Edit User Details</h1>
        <form onSubmit={handleUpdate}>
          <div className="mb-2">
            <label htmlFor="name">Name: </label>
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Enter updated Name"
              value={values.name}
              onChange={e => setValues({ ...values, name: e.target.value })}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="email">Email: </label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Enter updated Email"
              value={values.email}
              onChange={e => setValues({ ...values, email: e.target.value })}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="phone">Phone: </label>
            <input
              type="text"
              name="phone"
              className="form-control"
              placeholder="Enter updated phone number"
              value={values.phone}
              onChange={e => setValues({ ...values, phone: e.target.value })}
            />
          </div>
          <button type="submit" className="btn btn-success">Update</button>
          <Link to='/' className='btn btn-primary ms-3'>Back</Link>
        </form>
      </div>
    </div>
  );
};

export default Update;
