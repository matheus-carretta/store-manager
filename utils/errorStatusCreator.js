const errorHandler = (error, message) => {
  switch (error) {
    case 'string.min':
      return { status: 422, message };
    case 'number.min':
      return { status: 422, message };
    default:
      return { status: 400, message };
  }
};

module.exports = errorHandler;