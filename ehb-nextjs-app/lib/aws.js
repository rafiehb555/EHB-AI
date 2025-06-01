import AWS from 'aws-sdk';

if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY || !process.env.AWS_REGION) {
  throw new Error('Missing AWS environment variables');
}

// Configure AWS
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});

// Initialize AWS services
const s3 = new AWS.S3();
const rekognition = new AWS.Rekognition();
const dynamoDB = new AWS.DynamoDB.DocumentClient();

export { s3, rekognition, dynamoDB }; 