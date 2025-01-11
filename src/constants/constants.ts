export const constants = Object.freeze({
  destinationPets: "uploads/pets",
  destinationUsers: "uploads/users",
  sinPhoto: "sinphoto.jpg",
});

type MimeTypeMap = {
  [key: string]: string;
};
export const mimeTypesPhotos: MimeTypeMap = {
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
};
