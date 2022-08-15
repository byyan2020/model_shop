import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate, useLocation, useParams } from "react-router-dom";

function withRouter(Component) {
	function ComponentWithRouterProp(props) {
		let location = useLocation();
		let navigate = useNavigate();
		let params = useParams();
		return <Component {...props} router={{ location, navigate, params }} />;
	}

	return ComponentWithRouterProp;
}

const SearchBox = () => {
	const history = useNavigate();

	const [keyword, setKeyword] = useState("");

	const submitHandler = (e) => {
		e.preventDefault();
		if (keyword.trim()) {
			history(`/search/${keyword}`);
		} else {
			history("/");
		}
	};

	return (
		<Form onSubmit={submitHandler} className="d-flex">
			<Form.Control
				type="text"
				name="q"
				onChange={(e) => setKeyword(e.target.value)}
				placeholder="Search Products..."
				className="mr-sm-2 ml-sm-5"
			></Form.Control>
			<Button type="submit" variant="outline-success" className="p-2">
				Search
			</Button>
		</Form>
	);
};

export default withRouter(SearchBox);
