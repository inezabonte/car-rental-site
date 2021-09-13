import sgMail from "@sendgrid/mail";
import { format, parseISO } from "date-fns";

function convertDate(date) {
	return format(new Date(parseISO(date)), "PPP");
}

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export default async (req, res) => {
	const { firstName, lastName, phone, email, start, end, car } = req.body;
	const msg = {
		from: `${process.env.SENDGRID_EMAIL_FROM}`,
		to: `${process.env.SENDGRID_EMAIL_TO}`,
		subject: "Car Booking Request",
		text: car,
		html: `
        <p>
        <b>${firstName} ${lastName}</b> wants to book <b>${car}</b>
        </p>
        <p> 
        From: <b>${convertDate(start)}</b> To: <b>${convertDate(end)} </b>
        </p>
        <h3>Contact Details</h3>
        <p>Phone: ${phone}</p> 
        <p>Email: ${email}</p>
        
        `,
	};

	sgMail
		.send(msg)
		.then(() => {
			return res.status(200).json({ message: "Successful" });
		})
		.catch((error) => {
			return res.status(500).json({ Error: error });
		});
};
