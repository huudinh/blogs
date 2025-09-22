const ToggleTOC = () => {
    return (
        <div className="toc_btn" onClick={() => {
            const toc = document.querySelector('.table-of-contents');
            if (toc) toc.style.display = toc.style.display === 'none' ? 'block' : 'none';
        }}>
            Ẩn/Hiện mục lục
        </div>
    );
};

export default ToggleTOC;
