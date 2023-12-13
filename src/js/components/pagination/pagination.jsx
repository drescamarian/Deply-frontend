import{ useState, useEffect } from 'react';
import { NavLink } from "react-router-dom";
import './paginaton.css';


const Pagination = ({ items, setPage }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(9);
    const [pages , setPages] = useState(1);

    useEffect(() => {
        setPages(Math.ceil(items / itemsPerPage));
    }, [items]);

    const prev = () => {
        setCurrentPage(currentPage - 1);
        setPage(currentPage - 1);
    }
    const next = () => {
        setCurrentPage(currentPage + 1);
        setPage(currentPage + 1);
    }
    const pagePlusTow = () => {
        setCurrentPage(currentPage + 2);
        setPage(currentPage + 2);
    }
    const pageMinusTow = () => {
        setCurrentPage(currentPage - 2);
        setPage(currentPage - 2);
    }
    const first = () => {
        setCurrentPage(1);
        setPage(1);
    }

    const last = () => {
        setCurrentPage(pages);
        setPage(pages);
    }
    
    return (
        <div className='navPage'>
           { currentPage > 1 && <button onClick={prev} >Prev</button>}
           { currentPage > 3 && currentPage != 1 && <button onClick={first} >1</button>}
           { currentPage > 2 && <span> . . . . </span>}
           { currentPage > 2 && <button onClick={pageMinusTow} >{currentPage - 2}</button>}
           { currentPage > 1 && <button onClick={prev} >{currentPage - 1}</button>}

           <button className='current' >{currentPage}</button>
           
           { currentPage + 1 <= pages && <button onClick={next} >{currentPage + 1}</button>}
           { currentPage + 2 <= pages && <button onClick={pagePlusTow} >{currentPage + 2}</button>}
           { currentPage + 2 <= pages && <span> . . . . </span>}
           { currentPage <= pages && <button onClick={last} >{pages}</button>}
           { currentPage + 1 <= pages && <button onClick={next} >Next</button>}
        </div>
    )
}

export default Pagination;