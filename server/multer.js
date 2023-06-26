import multer from "multer";
import fs from 'fs';
import dayjs from "dayjs";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {

    const id = decodeURIComponent(req.query.id);
    const uploadPath = `public/superheroes/${id}`;

    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    cb(null, uploadPath)
  },

  filename: function (req, file, cb) {
    cb(null, dayjs().format('DDMMYYYY-HHmmss_SSS'));
  }
});

const fileFilter = (req, file, cb) => {

  if ((/^image\//).test(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
}


export default multer({ storage, fileFilter });