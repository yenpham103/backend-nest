import { Injectable } from "@nestjs/common";
import { Resend } from "resend";
import envConfig from "../config";
// import path from "path";
// import  fs from "fs";
import { OTPEmail } from "../../../emails/otp";
import * as React from "react";

@Injectable()

export class EmailService {
    private resend: Resend;

    constructor() {
        this.resend = new Resend(envConfig.RESEND_API_KEY);
    }

    sendOTP(payload: { email: string, code: string }) {
        // const otpTemplate = fs.readFileSync(path.resolve('src/shared/email-template/otp.html'), 'utf8');
        const subject = 'OTP Code';
        return this.resend.emails.send({
            from: 'Yenx P. <no-reply@phamyen.id.vn>',
            to: [payload.email],
            subject,
            react: <OTPEmail otpCode={payload.code} title={subject} />,
            // html: otpTemplate.replaceAll('{{subject}}', subject).replaceAll('{{code}}', payload.code)
          });
    }
}