import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';

dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const sendOrderEmail = async (order) => {
  await sgMail.send({
    to: order.user.email,
    from: 'jordantseng1024@gmail.com',
    subject: 'Video game e-shop order',
    html: `
    <h2>Hi, ${order.user.name},</h2> 
    <h3>Your order was created (Order Num: ${order._id}).</h3>
    `,
  });

  console.log('email sent');
};
