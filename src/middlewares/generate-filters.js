const isValidObjectId = require('../../src/utils/isValidObjectId')
const Model = require('../../modules/class/fatherModel')

const generateFilters = async (req, res, next) => {
    req.filters = Object.keys(req.query).reduce((filters, nameFilter) => {

        const currentFilter = req.query[nameFilter];

        if (isValidObjectId(currentFilter)) {
            filters = {...filters, [nameFilter]: Model.parseId(currentFilter)}
            return filters
        }
        filters = {...filters, [nameFilter]: currentFilter}
        return filters
    }, {});
    next()
};

module.exports = generateFilters;
