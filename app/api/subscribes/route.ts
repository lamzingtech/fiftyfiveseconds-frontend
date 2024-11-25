import { Resend } from 'resend';


export async function POST(req: any) {
  const resend = new Resend('re_6k1pvmap_2LPZSjfc4MNp2zTJkWCJeTHp');
  const { email, vlink } = await req.json();

  if (!email) {
      return new Response(JSON.stringify({status: 2, message: 'Email is required' }), { status: 400 });
  }else{
    try {
      console.log("1111")
    resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'contact@fiftyfiveseconds.com',
      subject: 'Subscription Request',
      html: `You have a subscription request from the email ${email}`
    });
    return new Response(JSON.stringify({ status: 1, message: 'Email sent successfully' }), { status: 200 });
   
  } catch (error) {
    console.log("33333")
        console.error('Error sending email:', error);
        return new Response(JSON.stringify({status: 2, message: 'Failed to send email' }), { status: 500 });
      }

  }
}
