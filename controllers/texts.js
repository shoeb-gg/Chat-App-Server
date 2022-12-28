exports.sampleText = async (req, res, next) => {
  try {
    res.status(200).json({
      message: "Success",
      text: "Sample Text",
      id: req.userId,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
      err.message = "Something went wrong !";
    }
  }
};
