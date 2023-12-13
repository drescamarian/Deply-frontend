import './PaginationComponent.scss';
export default function PaginationComponent({ totalPages, currentPage, onPageChange }) {
    const getPaginationRange = () => {
        // Find the range of pages to be displayed
        const start = Math.max(1, currentPage - 1);
        const end = Math.min(totalPages, currentPage + 1);
        let range = [];
        for (let i = start; i <= end; i++) {
            range.push(i);
        }
        return range;
    };


    const handlePageClick = (event, pageNumber) => {
        // preventDefault() aufrufen, um page-reload zu vermeiden
        event.preventDefault();

        // `onPageChange` mit neuem `pageNumber` aufrufen
        // --> löst ein state update im Parent Component (EventOverview), was zu einem neuen API call führt, um Daten für die ausgewählte Seite zu fetchen
        onPageChange(pageNumber);
    };

    return (
        <div className="pagination-container">
            <nav>
                <ul className="pagination">
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                        <a href="#" onClick={(e) => currentPage > 1 && handlePageClick(e, currentPage - 1)}>&lt;</a>
                    </li>
                    {getPaginationRange().map(number => (
                        <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
                            <a href="#" onClick={(e) => handlePageClick(e, number)} className="page-link">
                                {number}
                            </a>
                        </li>
                    ))}
                    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                        <a href="#" onClick={(e) => currentPage < totalPages && handlePageClick(e, currentPage + 1)}>&gt;</a>
                    </li>
                </ul>
            </nav>
        </div>
    );
};
