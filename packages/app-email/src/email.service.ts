import { Inject, Injectable } from "@nestjs/common";
import { Transporter } from "nodemailer";
import * as nodemailer from "nodemailer";
import * as Mail from "nodemailer/lib/mailer";
import {
  EMAIL_CONFIG_OPTIONS,
  EmailOptions,
} from "./interface/email.interface";

@Injectable()
export class EmailsService {
  private transporter: Transporter;

  constructor(@Inject(EMAIL_CONFIG_OPTIONS) private options: EmailOptions) {
    this.transporter = nodemailer.createTransport({
      service: this.options.service,
      auth: {
        user: this.options.user,
        pass: this.options.pass,
      },
    });
  }

  sendEmail(options: Mail.Options) {
    return this.transporter.sendMail(options);
  }
}
