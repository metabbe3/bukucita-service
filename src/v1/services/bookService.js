const { fetchFromApi } = require("../../helpers/httpHelper");

const bookService = {
  getBooks: async (categoryId, size, page) => {
    const params = { categoryId, size, page };
    return await fetchFromApi("fee-assessment-books", params);
  },
};

module.exports = bookService;
