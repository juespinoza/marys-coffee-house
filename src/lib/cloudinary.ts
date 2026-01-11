export function cloudinaryUrl(cafeFolder: string, file: string) {
  const cloud = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  // URL simple (podés agregar transformaciones)
  return `https://res.cloudinary.com/${cloud}/image/upload/f_auto,q_auto/${cafeFolder}/${file}`;
}
