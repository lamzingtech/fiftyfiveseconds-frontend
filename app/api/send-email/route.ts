// app/api/send-email/route.js



import { Resend } from 'resend';
import { v4 as uuidv4 } from 'uuid';

import axios from 'axios';
import fs from 'fs';
import path from 'path';
//import AWS from 'aws-sdk';

// Configure AWS SDK
// const s3 = new AWS.S3({
//   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//   region: process.env.AWS_REGION,
// });

//const COBALT_API_URL = "https://c.blahaj.ca/";
const COBALT_API_URL = "http://13.201.86.186:9000/";



export async function POST(req: any) {
  const resend = new Resend('re_6k1pvmap_2LPZSjfc4MNp2zTJkWCJeTHp');
  const { email, vlink } = await req.json();

  // Email validation function
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // YouTube URL validation function
  // const isValidYouTubeURL = (url: string) => {
  //   const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)[\w-]{11}$/;
  //   return youtubeRegex.test(url);
  // };
  const isValidYouTubeURL = (url: string) => {
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/(watch\?v=|shorts\/)[\w-]{11}|youtu\.be\/[\w-]{11})(\&.*)?$/;
    return youtubeRegex.test(url);
  };

  if (!email || !vlink) {
    return new Response(
      JSON.stringify({ status: 2, message: 'Email and Video link are required' }),
      { status: 400 }
    );
  }

  if (!isValidEmail(email)) {
    return new Response(
      JSON.stringify({ status: 2, message: 'Invalid email format' }),
      { status: 400 }
    );
  }

  // if (!isValidYouTubeURL(vlink)) {
  //   return new Response(
  //     JSON.stringify({ status: 2, message: 'Invalid YouTube video link' }),
  //     { status: 400 }
  //   );
  // }

  try {
    console.log("1111");
    // Generate UUID
    const requestId = uuidv4();
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'contact@fiftyfiveseconds.com',
      subject: 'fiftyfivesecs-new-request',
      html: `
      <p>You have a new message from <b>${email}</b>:</p>
      <p><strong>Video Link:</strong> ${vlink}</p>
      <p><strong>Request ID:</strong> ${requestId}</p>
    `,
    });
    console.log("2222");
    //===============================================================================================
    // return new Response(
    //   JSON.stringify({ status: 1, message: 'Email sent successfully' }),
    //   { status: 200 }
    // );
    // Step 1: Send video URL to Cobalt API
    const cobaltResponse = await axios.post(COBALT_API_URL, {
      url: vlink,
      x: 'audio',
    }, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });

    console.log("checking --- 111 "+JSON.stringify(cobaltResponse))

    if (!cobaltResponse.data || !cobaltResponse.data.url) {
      return new Response(
        JSON.stringify({ status: 2, message: 'Failed to fetch MP3 URL from Cobalt API' }),
        { status: 500 }
      );
    }

    const downloadUrl = cobaltResponse.data.url;

    // Step 2: Download MP3 file
    const mp3Filename = `${requestId}.mp3`;
    const mp3FilePath = path.join(process.cwd(), 'public', 'mp3', mp3Filename); // Save to public/mp3 directory

    const mp3Response = await axios.get(downloadUrl, { responseType: 'stream' });
    await new Promise((resolve, reject) => {
      const writer = fs.createWriteStream(mp3FilePath);
      mp3Response.data.pipe(writer);
      writer.on('finish', resolve);
      writer.on('error', reject);
    });

    // Step 3: Upload to S3
    // const fileStream = fs.createReadStream(mp3FilePath);
    // const s3Params = {
    //   Bucket: process.env.AWS_S3_BUCKET_NAME,
    //   Key: `mp3/${mp3Filename}`,
    //   Body: fileStream,
    // };

    // await s3.upload(s3Params).promise();

    // Cleanup: Optionally delete local file
    fs.unlinkSync(mp3FilePath);

    return new Response(
      JSON.stringify({ status: 1, message: 'Process completed successfully', requestId }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Error:----', error);
    return new Response(
      JSON.stringify({ status: 2, message: 'An error occurred during the process' }),
      { status: 500 }
    );
  }
 
}


