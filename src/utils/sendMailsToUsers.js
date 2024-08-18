import { USER, USER_ACCEPTANCE_EVENT_HTMLCONTENT } from "../../constants.js";
import { MailService } from "../mailService/MailService.js";
import { fetchUsers } from "../services/authService.js";

export const sendMailsToUsers = async () => {
  const users = await fetchUsers();
  const userMails = users
    ?.filter(({ role }) => role === USER)
    .map(({ email }) => email)
    .join(",");
  const mailTrans = new MailService();
  await mailTrans.sendMail({
    to: userMails,
    subject: "subject",
    html: USER_ACCEPTANCE_EVENT_HTMLCONTENT,
  });
};
