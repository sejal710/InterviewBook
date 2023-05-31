import React from 'react'
import { FaPlus } from 'react-icons/fa';
import '../Sass/AddData.scss'
import { Link } from 'react-router-dom';

export default function AddData() {
  return (
    <div className="add-icon">
        <Link to='/add' className='link' >
        <FaPlus />
        </Link>
    </div>
  )
}
