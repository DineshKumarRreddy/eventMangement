const handleCatchAsync = (controllerFn) => {
  return (req, res, next) => controllerFn(req, res, next).catch(next);
};

export default handleCatchAsync;
