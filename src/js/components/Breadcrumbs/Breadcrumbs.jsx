import "./Breadcrumbs.scss"

function Breadcrumbs({ pageNo, setPageNo }) {
    const steps = ['Stammdaten', 'Ortsangaben', 'Künstler']; // Adjust these to your page titles
    return (
        <div className="breadcrumbs">
            {steps.map((step, index) => (
                <span key={index} className={pageNo === index + 1 ? 'active' : ''} onClick={() => setPageNo(index + 1)}>
                    {step}
                </span>
            ))}
        </div>
    );
}

export default Breadcrumbs;