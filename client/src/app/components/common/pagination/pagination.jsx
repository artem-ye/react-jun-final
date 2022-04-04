import React from 'react';

const PageItem = ({ index, isActive, onClick }) => {
	const pageItemClassList = 'page-item' + (isActive ? ' active' : '');

	return (
		<li className={pageItemClassList} aria-current='page' onClick={onClick}>
			<span className='page-link' href='#'>
				{index + 1}
			</span>
		</li>
	);
};

const Pagination = ({ pagesCount, activePageIndex, onPageChange }) => {
	if (!pagesCount || pagesCount < 2) return null;

	const pagesArray = new Array(pagesCount).fill(1);

	const applyHandleOnPageSelect = (index) => () => onPageChange(index);
	const applyHandleOnNextPage = () => () => onPageChange(activePageIndex + 1);
	const applyHandleOnPrevPage = () => () => onPageChange(activePageIndex - 1);

	return (
		<nav aria-label=''>
			<ul className='pagination'>
				<li className='page-item'>
					<span className='page-link' href='#' aria-label='Previous' onClick={applyHandleOnPrevPage()}>
						<span aria-hidden='true'>&laquo;</span>
					</span>
				</li>

				{pagesArray.map((_, index) => {
					const isActive = activePageIndex === index;
					return (
						<PageItem
							key={index}
							isActive={isActive}
							index={index}
							onClick={applyHandleOnPageSelect(index)}
						/>
					);
				})}

				<li className='page-item'>
					<span className='page-link' href='#' aria-label='Next' onClick={applyHandleOnNextPage()}>
						<span aria-hidden='true'>&raquo;</span>
					</span>
				</li>
			</ul>
		</nav>
	);
};

export default Pagination;
