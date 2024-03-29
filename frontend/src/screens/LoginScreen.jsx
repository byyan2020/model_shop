import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col, FormGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { login } from "../actions/userActions";

function LoginScreen() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const dispatch = useDispatch();

	const userLogin = useSelector((state) => state.userLogin);
	const { loading, error, userInfo } = userLogin;

	const location = useLocation();

	const redirect = location.search ? location.search.split("=")[1] : "/";

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(login(email, password));
	};

	const history = useNavigate();

	useEffect(() => {
		if (userInfo) {
			history(redirect);
		}
	}, [history, userInfo, redirect]);

	return (
		<FormContainer>
			<h1>Sign In</h1>
			{error && <Message variant="danger">{error}</Message>}
			{loading && <Loader />}
			<Form onSubmit={submitHandler}>
				<FormGroup className="mb-3" controlId="email">
					<Form.Label>Email Address</Form.Label>
					<Form.Control
						type="email"
						placeholder="Enter email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					></Form.Control>
				</FormGroup>

				<FormGroup className="mb-3" controlId="password">
					<Form.Label>Password Address</Form.Label>
					<Form.Control
						type="password"
						placeholder="Enter password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					></Form.Control>
				</FormGroup>

				<Button type="submit" variant="primary">
					Sign In
				</Button>
			</Form>

			<Row className="py-3">
				<Col>
					New Customer?{" "}
					<Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>Register</Link>
				</Col>
			</Row>
		</FormContainer>
	);
}

export default LoginScreen;
