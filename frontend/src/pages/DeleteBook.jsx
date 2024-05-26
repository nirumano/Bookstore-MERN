
import React , {useState, useEffect} from 'react'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';


export const DeleteBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {id} = useParams();
  const [book, setBook] = useState([]);
  useEffect(()=>{
    setLoading(true);

    axios.get(`http://localhost:5555/books/${id}`)
      .then((response) => {
        setBook(response.data);
        setTitle(response.data.title);
        setLoading(false);
      });
  }, [])
  const handleDeleteBook = () =>{
    setLoading(true);
    axios
    .delete(`http://localhost:5555/books/${id}`)
    .then(()=>{
      setLoading(false);
      navigate('/');
    })
    .catch((error)=> {
      setLoading(false);
      alert('An error happened. Please check console');
      console.log(error);
      console.error(error);
    });
};

  return (
    <div className='p-4'>
      <BackButton/>
      <h1 className='text-3xl my-4'>Delete Book: {title}</h1>
      {loading ? <Spinner/> : ''}
      <div className='flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto'>
        <div className='my-4'>
          <h3 className='text-2xl'>Are you sure you want to delete <b>{title}</b>?</h3>
          <button className='mx-auto p-4 bg-red-600 text-white m-8 w-full' onClick={handleDeleteBook}>Delete</button>
        </div>
      </div>
    </div>
  )
  
}

export default DeleteBook