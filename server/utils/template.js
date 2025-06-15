export const generateOtpEmailTemplate = (otp, username = "User") => `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>OTP Verification</title>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap" rel="stylesheet" />
  </head>
  <body style="margin: 0; font-family: 'Poppins', sans-serif; background: #ffffff; font-size: 14px;">
    <div style="max-width: 680px; margin: 0 auto; padding: 45px 30px 60px; background: #f4f7ff;
        background-image: url(https://archisketch-resources.s3.ap-northeast-2.amazonaws.com/vrstyler/1661497957196_595865/email-template-background-banner);
        background-repeat: no-repeat; background-size: 800px 452px; background-position: top center;
        font-size: 14px; color: #434343;">
      <header>
        <table style="width: 100%;">
          <tr>
            <td>
              <img alt="logo" src="https://archisketch-resources.s3.ap-northeast-2.amazonaws.com/vrstyler/1663574980688_114990/archisketch-logo" height="30" />
            </td>
            <td style="text-align: right;">
              <span style="font-size: 16px; line-height: 30px; color: #ffffff;">${new Date().toLocaleDateString()}</span>
            </td>
          </tr>
        </table>
      </header>

      <main>
        <div style="margin-top: 70px; padding: 92px 30px 115px; background: #ffffff; border-radius: 30px; text-align: center;">
          <div style="max-width: 489px; margin: 0 auto;">
            <h1 style="font-size: 24px; font-weight: 500; color: #1f1f1f;">Your OTP</h1>
            <p style="margin-top: 17px; font-size: 16px; font-weight: 500;">Hey ${username},</p>
            <p style="margin-top: 17px; font-weight: 500; letter-spacing: 0.56px;">
              Thank you for choosing Archisketch Company. Use the following OTP to complete the procedure. OTP is valid for
              <span style="font-weight: 600; color: #1f1f1f;">5 minutes</span>. Do not share this code with others.
            </p>
            <p style="margin-top: 60px; font-size: 40px; font-weight: 600; letter-spacing: 25px; color: #ba3d4f;">${otp}</p>
          </div>
        </div>

        <p style="max-width: 400px; margin: 90px auto 0; text-align: center; font-weight: 500; color: #8c8c8c;">
          Need help? Contact
          <a href="mailto:archisketch@gmail.com" style="color: #499fb6; text-decoration: none;">archisketch@gmail.com</a>
          or visit our
          <a href="#" target="_blank" style="color: #499fb6; text-decoration: none;">Help Center</a>
        </p>
      </main>

      <footer style="max-width: 490px; margin: 20px auto 0; text-align: center; border-top: 1px solid #e6ebf1;">
        <p style="margin-top: 40px; font-size: 16px; font-weight: 600; color: #434343;">Archisketch Company</p>
        <p style="margin-top: 8px; color: #434343;">Address 540, City, State.</p>
        <div style="margin-top: 16px;">
          <a href="#"><img width="36" alt="Facebook" src="https://archisketch-resources.s3.ap-northeast-2.amazonaws.com/vrstyler/1661502815169_682499/email-template-icon-facebook" /></a>
          <a href="#" style="margin-left: 8px;"><img width="36" alt="Instagram" src="https://archisketch-resources.s3.ap-northeast-2.amazonaws.com/vrstyler/1661504218208_684135/email-template-icon-instagram" /></a>
          <a href="#" style="margin-left: 8px;"><img width="36" alt="Twitter" src="https://archisketch-resources.s3.ap-northeast-2.amazonaws.com/vrstyler/1661503043040_372004/email-template-icon-twitter" /></a>
          <a href="#" style="margin-left: 8px;"><img width="36" alt="Youtube" src="https://archisketch-resources.s3.ap-northeast-2.amazonaws.com/vrstyler/1661503195931_210869/email-template-icon-youtube" /></a>
        </div>
        <p style="margin-top: 16px; color: #434343;">Copyright © 2022 Company. All rights reserved.</p>
      </footer>
    </div>
  </body>
</html>
`;
