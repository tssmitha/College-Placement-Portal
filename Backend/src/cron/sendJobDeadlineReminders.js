// // /cron/sendJobDeadlineReminders.js
// const cron = require('node-cron');
// const Job = require('../models/jobs'); // Adjust path to your Job model
// const Application = require('../models/JobApplication'); // Adjust as needed
// const sendEmail = require('../utils/emailService');

// const formatDate = (date) => {
//   return date.toLocaleDateString('en-IN', {
//     day: 'numeric',
//     month: 'short',
//     year: 'numeric'
//   });
// };

// const sendJobDeadlineReminders = () => {
//   cron.schedule('0 8 * * *', async () => {
//     console.log('⏰ Running daily job reminder check...');

//     try {
//       const today = new Date();
//       today.setHours(0, 0, 0, 0); // Normalize to 00:00:00

//       const jobsClosingToday = await Job.find({
//         deadline: {
//           $gte: today,
//           $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000) // within today
//         }
//       });

//       if (!jobsClosingToday.length) return;

//       let emailContent = `<h3>📌 Job Deadlines Today</h3><ul>`;

//       for (const job of jobsClosingToday) {
//         const applicantCount = await Application.countDocuments({ jobId: job._id });
//         emailContent += `
//           <li>
//             <strong>${job.companyName}</strong> - ${job.role} <br/>
//             Applicants: <strong>${applicantCount}</strong><br/>
//             Deadline: ${formatDate(job.deadline)}
//           </li><br/>
//         `;
//       }

//       emailContent += `</ul><p>Login to the admin portal for more info.</p>`;

//       await sendEmail(
//         process.env.ADMIN_EMAIL, // Put this in your .env file
//         '📢 Job Deadlines Today',
//         emailContent
//       );

//       console.log('✅ Job deadline summary sent!');
//     } catch (err) {
//       console.error('❌ Error sending job deadline email:', err);
//     }
//   });
// };

// module.exports = sendJobDeadlineReminders;


// /cron/sendJobDeadlineReminders.js
const cron = require('node-cron');
const Job = require('../models/jobs'); // Adjust path to your Job model
const Application = require('../models/JobApplication'); // Adjust as needed
const sendEmail = require('../utils/emailService');

// 📅 Format date
const formatDate = (date) =>
  date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

// 🚀 Job Deadline Reminder Function
const sendJobDeadlineReminders = async () => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const jobsClosingToday = await Job.find({
      deadline: { $gte: today, $lt: tomorrow },
    });

    if (!jobsClosingToday.length) {
      console.log('ℹ️ No job deadlines today.');
      return;
    }

    let emailContent = `<h3>📌 Job Deadlines Today</h3><ul>`;

    for (const job of jobsClosingToday) {
      const applicantCount = await Application.countDocuments({ jobId: job._id });

      emailContent += `
        <li>
          <strong>${job.companyName}</strong> — ${job.role}<br/>
          Applicants: <strong>${applicantCount}</strong><br/>
          Deadline: ${formatDate(job.deadline)}
        </li><br/>
      `;
    }

    emailContent += `</ul><p>Login to the admin portal to view applicants.</p>`;

    await sendEmail(process.env.ADMIN_EMAIL, '📢 Job Deadlines Today', emailContent);
    console.log('✅ Reminder email sent to admin.');
  } catch (err) {
    console.error('❌ Error sending deadline reminders:', err);
  }
};

// 🔄 Schedule: Runs daily at 8 AM
cron.schedule('0 8 * * *', () => {
  console.log('🕗 Running scheduled job deadline reminder...');
  sendJobDeadlineReminders();
});

// ✅ Manual test trigger
if (require.main === module) {
  console.log('🧪 Manually triggering job deadline reminder...');
  sendJobDeadlineReminders();
}

module.exports = sendJobDeadlineReminders;




