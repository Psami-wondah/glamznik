// server
export const SECRET_KEY = process.env.SECRET_KEY as string;
export const ALGORITHM = process.env.ALGORITHM as string;
export const MONGO_URI = process.env.MONGO_URI as string;
export const SALTROUNDS = 10;

// client
export const API_URL = process.env.NEXT_PUBLIC_API_URL as string;
export const MAIN_URL = process.env.NEXT_PUBLIC_URL as string;
export const CLOUDINARY_PRESET = process.env
  .NEXT_PUBLIC_CLOUDINARY_PRESET as string;

export const PHONE_NO = process.env.NEXT_PUBLIC_PHONE_NO as string;
const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME as string;

export const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;
