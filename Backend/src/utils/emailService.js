// const nodemailer = require("nodemailer");
// const path = require("path");

// async function sendEmailToStudent({ to, subject, templateName, context }) {
//   const { default: hbs } = await import("nodemailer-express-handlebars");

//   const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: process.env.EMAIL_USER,
//       pass: process.env.EMAIL_PASS,
//     },
//   });

//   transporter.use("compile", hbs({
//     viewEngine: {
//       extname: ".handlebars",
//       partialsDir: path.resolve(__dirname, "../emails/templates"),
//       defaultLayout: false,
//     },
//     viewPath: path.resolve(__dirname, "../emails/templates"),
//     extName: ".handlebars",
//   }));

//   return transporter.sendMail({
//     from: `"NIE Placement Cell" <${process.env.EMAIL_USER}>`,
//     to,
//     subject,
//     template: templateName,
//     context,
//   });
// }

// module.exports = {sendEmailToStudent};


const nodemailer = require("nodemailer");
const path = require("path");

async function sendEmailToStudent({ to, subject, templateName, context }) {
  const hbs = require("nodemailer-express-handlebars");

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  transporter.use("compile", hbs({
    viewEngine: {
      extname: ".handlebars",
      partialsDir: path.resolve(__dirname, "../emails/templates"),
      defaultLayout: false,
    },
    viewPath: path.resolve(__dirname, "../emails/templates"),
    extName: ".handlebars",
  }));

  return transporter.sendMail({
    from: `"NIE Placement Cell" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    template: templateName,
    context,
  });
}

module.exports = { sendEmailToStudent };
