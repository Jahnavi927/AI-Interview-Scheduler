const supabase = require("../config/supabase");
const crypto = require("crypto");

/**
 * Upload resume to Supabase Storage
 * @param {Object} file - Multer file object
 * @param {String} userId - Logged-in user's ID
 * @returns {String} filePath
 */
const uploadResume = async (file, userId) => {
  const fileExtension = file.originalname.split(".").pop();

  const fileName = `${userId}-${crypto.randomUUID()}.${fileExtension}`;

  const filePath = `resumes/${fileName}`;

  const { error } = await supabase.storage
    .from("resume-files")
    .upload(filePath, file.buffer, {
      contentType: file.mimetype,
      upsert: true,
    });

  if (error) {
    throw error;
  }

  return filePath;
};

module.exports = {
  uploadResume,
};