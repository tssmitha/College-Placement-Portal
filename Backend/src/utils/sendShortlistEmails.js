const { sendEmailToStudent } = require('./emailService');  // Your email service utility

const sendShortlistEmails = async (students, jobInfo) => {
    console.log("CLicked");
  for (const student of students) {
    const subject = `You have been shortlisted for ${jobInfo.company} - ${jobInfo.role}`;
    
    const context = {
      name: student.name,
      company: jobInfo.company,
      role: jobInfo.role,
      round: jobInfo.round,
      stage: jobInfo.stage,
      roundDateTime: jobInfo.roundDateTime,
      message: jobInfo.message || ''
    };

    try {
      // Sending the email using Handlebars template
      await sendEmailToStudent({
        to: student.personalEmail,
        subject,
        templateName: 'shortlistTemplate',  // Template name (e.g., shortlistTemplate.handlebars)
        context
      });
      console.log(`Email sent to ${student.name}`);
      console.log(`Successfully sent email to ${student.name} (${student.personalEmail})`);

    } catch (error) {
      console.error(`Failed to send email to ${student.name}:`, error);
    }
  }
};

module.exports = { sendShortlistEmails };
