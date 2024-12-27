import { v4 as uuidv4 } from 'uuid';
import AWS from 'aws-sdk';
import { Resend } from 'resend';

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const s3 = new AWS.S3();

export async function POST(req) {
  const resend = new Resend(process.env.RESEND_KEY);
  const formData = await req.formData();
  const email = formData.get('email');
  const videoFile = formData.get('videoFile');

  if (!email || !videoFile) {
    return new Response(
      JSON.stringify({ status: 2, message: 'Email and video file are required.' }),
      { status: 400 }
    );
  }
  const requestId = uuidv4();
  const fileName = `${requestId}.mp4`;
  const fileBuffer = await videoFile.arrayBuffer();

  try {

      // Generate UUID
      
      await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: 'contact@fiftyfiveseconds.com',
        subject: 'fiftyfivesecs-new-request',
        html: 
        `<p>You have a new message from <b>${email}</b>:</p>
        <p><strong>Video File Name:</strong> ${fileName}</p>
        <p><strong>Request ID:</strong> ${requestId}</p>`
      ,
      });
    const uploadParams = {
      Bucket: process.env.AWS_S3BUCKET,
      Key: fileName,
      Body: Buffer.from(fileBuffer),
      ContentType: 'video/mp4',
    };

    await s3.upload(uploadParams).promise();

   
    
    return new Response(
      JSON.stringify({ status: 1, message: 'File uploaded and email sent successfully.' }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Error uploading file:', error);
    return new Response(
      JSON.stringify({ status: 2, message: 'Error uploading file or sending email.' }),
      { status: 500 }
    );
  }
}
