// function to hash a string using bcrypt
import bcrypt from "bcrypt";
export const hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  } catch (err) {
    throw new Error("Failed to hash password");
  }
};
export const comparePass = async (password, hashedPassword) => {
  const isMatch = await bcrypt.compare(password, hashedPassword); // هنا أيضًا
  if (!isMatch) {
    const error = new Error("Invalid password");
    error.statusCode = 401;
    throw error;
  }
  return true;
};
// export const comparePass = async (password, hashedpassword) => {
//   const comphash = bcrypt.compare(password, hashedpassword);
//   if (!comphash) {
//     const error = new Error("Invalid password");
//     error.statusCode = 401;
//     throw error;
//   } else {
//     return true;
//   }
// };
