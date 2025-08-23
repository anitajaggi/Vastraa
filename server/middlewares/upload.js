import multer from "multer";

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: { fileSize: 1 * 1024 * 1024 }, // 1MB per file
  fileFilter: (req, file, cb) => {
    cb(null, true); // accept all files (no filtering here)
  },
}).array("images", 5);

// Middleware to wrap multer with custom error handler
export const uploadImg = (req, res, next) => {
  upload(req, res, function (err) {
    if (err && err.code === "LIMIT_FILE_SIZE") {
      req.fileValidationError = "LIMIT_FILE_SIZE"; // attach error to req
    }
    next(); // always call next to reach validateProduct
  });
};
