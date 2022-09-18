const entry = () =>
  async (req, res, next) => {
    const renderer = (await require('./render'));
    return renderer(req, res, next);
  };

module.exports = entry