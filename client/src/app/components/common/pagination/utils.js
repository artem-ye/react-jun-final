function paginate(array, ITEMS_PER_PAGE, PAGE_INDEX) {
	const ARRAY_LEN = array.length;

	if (ARRAY_LEN < ITEMS_PER_PAGE) {
		return array;
	}

	const startIndex = ITEMS_PER_PAGE * PAGE_INDEX;
	const endIndex = startIndex + ITEMS_PER_PAGE;
	return array.slice(startIndex, endIndex);
}

function pagesCount(array, ITEMS_PER_PAGE) {
	return Math.ceil(array.length / ITEMS_PER_PAGE);
}

const paginationUtils = {
	paginate,
	pagesCount,
};

export { paginationUtils };
