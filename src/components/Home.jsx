import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    
    useEffect(() => {
        axios.get('http://localhost:3000/users')
        .then(res => setData(res.data))
        .catch(err => console.log(err));
    }, []);
    
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    
    const lastItem = currentPage * itemsPerPage;
    const firstItem = lastItem - itemsPerPage;
    const currentItems = data.slice(firstItem, lastItem);

    const nextPage = () => {
        setCurrentPage(prevPage => prevPage + 1);
    };

    const prevPage = () => {
        setCurrentPage(prevPage => prevPage - 1);
    };

    const handleDelete = (id) =>{
        const confirm = window.confirm("Would you like to delete?");
        if(confirm){
            axios.delete('http://localhost:3000/users/'+id)
            .then(res =>{
                location.reload()
            })
            .catch(err => console.log(err))
        }
    }

    return (
        <div className='d-flex flex-column justify-content-center align-items-center bg-light vh-100'>
            <h1>List of Users</h1>
            <div className="w-75 rounded bg-white border shadow p-4">
                <div className="d-flex justify-content-end">
                    <Link to='/create' className='btn btn-success'>Add +</Link>
                </div>
                <table className='table table-striped'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((d, i) => (
                            <tr key={i}>
                                <td>{firstItem + i + 1}</td>
                                <td>{d.name}</td>
                                <td>{d.email}</td>
                                <td>{d.phone}</td>
                                <td>
                                    <Link to={`read/${d.id}`} className='btn btn-sm btn-secondary mx-1 my-2'>Read</Link>
                                    <Link to={`update/${d.id}`} className='btn btn-sm btn-primary mx-2'>Edit</Link>
                                    <button onClick={e => handleDelete(d.id)} className='btn btn-sm btn-danger'>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="d-flex justify-content-between">
                    <button
                        className='btn btn-primary'
                        onClick={prevPage}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>
                    <button
                        className='btn btn-primary'
                        onClick={nextPage}
                        disabled={currentPage * itemsPerPage >= data.length}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Home;
