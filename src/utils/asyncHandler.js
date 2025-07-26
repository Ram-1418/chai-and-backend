const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next))
            .catch(next); // Equivalent to .catch((err) => next(err))
    };
};

export { asyncHandler };
