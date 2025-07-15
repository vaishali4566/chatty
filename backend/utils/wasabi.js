import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import dotenv from "dotenv";
dotenv.config();

//create wasabi connection
const s3Client = new S3Client({
  region: process.env.WASABI_REGION,
  endpoint: `https://s3.${process.env.WASABI_REGION}.wasabisys.com`,
  credentials: {
    accessKeyId: process.env.WASABI_ACCESS_KEY,
    secretAccessKey: process.env.WASABI_SECRET_KEY,
  },
});

export const generateProfilePicUploadUrl = async (userId, fileType) => {
  const fileKey = `profiles/${userId}.jpg`; //"fileKey": "profiles/64a2c7.jpg"

  // This prepares the PUT object command that defines:
  // Which bucket to store the image in
  // What key (filename/path) to give it
  // What MIME type the file is (JPEG, PNG, etc.)
  const command = new PutObjectCommand({
    Bucket: process.env.WASABI_BUCKET_NAME,
    Key: fileKey,
    ContentType: fileType,
  });

  const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 300 });

  return { signedUrl, fileKey };
};
