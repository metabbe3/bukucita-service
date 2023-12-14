const { fetchFromApi } = require("../../helpers/httpHelper");

const categoryService = {
  getCategories: async () => {
    return await fetchFromApi("fee-assessment-categories");
  },
};

module.exports = categoryService;
