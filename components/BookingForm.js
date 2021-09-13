import { Formik, Form, ErrorMessage, Field } from "formik";
import {
	Input,
	FormControl,
	FormLabel,
	Button,
	useToast,
} from "@chakra-ui/react";
import axios from "axios";
import * as Yup from "yup";
import { useState } from "react";

const initialValues = {
	firstName: "",
	lastName: "",
	phone: "",
	email: "",
	start: "",
	end: "",
};

const validation = Yup.object().shape({
	firstName: Yup.string().required("Required"),
	lastName: Yup.string().required("Required"),
	phone: Yup.string().required("Required"),
	email: Yup.string().email("Invalid email format").required("Required"),
	start: Yup.string().required("Required"),
	end: Yup.string().required("Required"),
});

export default function BookingForm({ carName }) {
	const [loading, setLoading] = useState(false);
	const toast = useToast();

	const handleSubmit = async (values, { resetForm }) => {
		values.car = carName;
		setLoading(true);
		try {
			await axios.post("/api/book-car", values);
			resetForm({ values: "" });
			toast({
				title: "Booking Request Sent successfully",
				status: "success",
				duration: 4000,
				isClosable: true,
			});
		} catch (error) {
			toast({
				title: "Something went wrong, Try again",
				status: "error",
				duration: 4000,
				isClosable: true,
			});
		}
		setLoading(false);
	};

	return (
		<Formik
			initialValues={initialValues}
			onSubmit={handleSubmit}
			validationSchema={validation}
		>
			{() => (
				<Form
					className="grid md:grid-cols-2 gap-4 border border-gray-300 rounded p-4"
					noValidate
				>
					<FormControl>
						<FormLabel>First Name</FormLabel>
						<Field as={Input} name="firstName" type="text" />
						<ErrorMessage
							name="firstName"
							component="span"
							className="text-red-600"
						/>
					</FormControl>
					<FormControl>
						<FormLabel>Last Name</FormLabel>
						<Field as={Input} name="lastName" type="text" />
						<ErrorMessage
							name="lastName"
							component="span"
							className="text-red-600"
						/>
					</FormControl>
					<FormControl>
						<FormLabel>Phone</FormLabel>
						<Field as={Input} name="phone" type="tel" />
						<ErrorMessage
							name="phone"
							component="span"
							className="text-red-600"
						/>
					</FormControl>
					<FormControl>
						<FormLabel>Email Address</FormLabel>
						<Field as={Input} name="email" type="email" />
						<ErrorMessage
							name="email"
							component="span"
							className="text-red-600"
						/>
					</FormControl>
					<FormControl>
						<FormLabel>Start</FormLabel>
						<Field as={Input} name="start" type="date" />
						<ErrorMessage
							name="start"
							component="span"
							className="text-red-600"
						/>
					</FormControl>
					<FormControl>
						<FormLabel>End</FormLabel>
						<Field as={Input} name="end" type="date" />
						<ErrorMessage
							name="end"
							component="span"
							className="text-red-600"
						/>
					</FormControl>
					<Button
						className="md:col-span-2"
						colorScheme="blue"
						type="submit"
						isLoading={loading}
					>
						Send Request
					</Button>
				</Form>
			)}
		</Formik>
	);
}
