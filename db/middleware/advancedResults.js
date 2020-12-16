const advancedResults = (model, populate, populateAgain, protectPrivate) => async (req, res, next) => {
    let query;
    let reqQuery = { ...req.query };
    let removeFields = ['select', 'sort', 'page', 'limit'];
    removeFields.forEach(field => {
        delete reqQuery[field];
    });
    let queryStr = reqQuery;
    let keys = Object.keys(queryStr)
        .filter(key => queryStr[key].in)
    keys.forEach(key => {
        if (queryStr[key].in)
            queryStr[key].in = queryStr[key].in.split(",");
    })
    queryStr = JSON.stringify(queryStr);
    queryStr = queryStr.replace(/\b(gt|lt|gte|lte|in)\b/g, match => `$${match}`);
    queryStr = JSON.parse(queryStr);

    if (protectPrivate) {
        queryStr.view = 'public';
    }

    // public
    query = model.find(queryStr)
    if (populate) {
        query.populate(populate);
    }
    if (populateAgain) {
        query.populate(populateAgain);
    }
    if (req.query.select) {
        let fields = req.query.select.split(',').join(' ');
        query = query.select(fields);
    }
    if (req.query.sort) {
        let fields = req.query.sort.split(',').join(' ');
        query = query.sort(fields);
    } else {
        query = query.sort('-createdAt');
    }
    let page = parseInt(req.query.page, 10) || 1;
    let limit = parseInt(req.query.limit, 10) || 10;
    let totalResults = await model.countDocuments();
    let pagination = {};
    let startIndex = (page - 1) * limit;
    let endIndex = page * limit;
    if (endIndex < totalResults) {
        pagination.next = {
            page: page + 1,
            limit
        }
    }
    if (startIndex > 0) {
        pagination.prev = {
            page: page - 1,
            limit
        }
    }
    query = query.skip(startIndex).limit(limit);
    const results = await query;
    res.advancedResults = { success: true, count: results.length, pagination, data: results };
    next();

}

module.exports = advancedResults;