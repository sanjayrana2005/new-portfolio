const RESET_PASSWORD_TEMPLATE=`
<!DOCTYPE html>
<html lang="en">
<body style="font-family: Arial, sans-serif; background:#f7f7f7; padding:20px;">
    <div style="max-width:600px; margin:auto; background:white; padding:30px; border-radius:10px;">
        <h2>Reset Password OTP</h2>
        <p>Hi {username},</p>
        <p>Use the OTP below to reset your password. This OTP will expire in 10 minutes.</p>
        <h1 style="text-align:center; color:#007BFF; background-color:#f7f7f5">{otp}</h1>
        <p>If you did not request this, please ignore this email.</p>
        <hr>
        <p style="color:#999; font-size:12px;">&copy; 2025 My Portfolio</p>
    </div>
</body>
</html>
`
const RESET_PASSWORD_SUCCESS_TEMPLATE=`
<!DOCTYPE html>
<html lang="en">
<body style="font-family: Arial, sans-serif; background:#f7f7f7; padding:20px;">
    <div style="max-width:600px; margin:auto; background:white; padding:30px; border-radius:10px;">
        <h2>Your Password Reset Successfully</h2>
        <p>Hi {username},</p>
        <h1 style="text-align:center; color:#007BFF; background-color:#f7f7f5">Your password reset successfully</h1>
        <hr>
        <p style="color:#999; font-size:12px;">&copy; 2025 My Portfolio</p>
    </div>
</body>
</html>
`


module.exports= {
    RESET_PASSWORD_TEMPLATE,
    RESET_PASSWORD_SUCCESS_TEMPLATE,
}