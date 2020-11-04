// @desc    Get All Written Works
// @route   GET | api/v1/writtenWorks
// @access  public

exports.getAllWrittenWorks = (req, res) => {
    res.status(200).json({ success: true, msg: "Show all written work" });
}

// @desc    Get Written Work By ID
// @route   GET | api/v1/writtenWorks/:id
// @access  public

exports.getWrittenWorkById = (req, res) => {
    res.status(200).json({ success: true, msg: `Get writtenWork with id = ${req.params.id}` });
}

// @desc    Create New Written Work
// @route   POST | api/v1/writtenWorks
// @access  private

exports.createNewWrittenWork = (req, res) => {
    res.status(200).json({ success: true, msg: `Create writtenWork` });
}

// @desc    Update Written Work By ID
// @route   PUT | api/v1/writtenWorks/:id
// @access  private

exports.updateWrittenWorkById = (req, res) => {
    res.status(200).json({ success: true, msg: `Update writtenWork with id = ${req.params.id}` });
}

// @desc    Delete Written Work By ID
// @route   DELETE | api/v1/writtenWorks/:id
// @access  public

exports.deleteWrittenWorkById = (req, res) => {
    res.status(200).json({ success: true, msg: `Delete writtenWork with id = ${req.params.id}` });
}