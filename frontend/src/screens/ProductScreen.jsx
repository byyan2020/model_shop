import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
	Row,
	Col,
	Image,
	ListGroup,
	Card,
	Button,
	ListGroupItem,
} from "react-bootstrap";
import Rating from "../components/Rating";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listProductDetails } from "../actions/productActions";

function ProductScreen() {
	const { id } = useParams();

	const dispatch = useDispatch();

	const productDetails = useSelector((state) => state.productDetails);
	const { loading, error, product } = productDetails;

	useEffect(() => {
		dispatch(listProductDetails(id));
	}, [dispatch, id]);

	return (
		<>
			<Link className="btn btn-light my-3" to="/">
				Go Back
			</Link>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant="danger">{error}</Message>
			) : (
				<Row>
					<Col md={6}>
						<Image
							src={product.image}
							alt={product.name}
							fluid
						></Image>
					</Col>
					<Col md={3}>
						<ListGroup variant="flush">
							<ListGroup.Item>
								<h3>{product.name}</h3>
							</ListGroup.Item>
							<ListGroup.Item>
								<Rating
									value={product.rating}
									text={`${product.numReviews} reviews`}
								></Rating>
							</ListGroup.Item>
							<ListGroupItem>
								Price: ${product.price}
							</ListGroupItem>
							<ListGroupItem>
								Description: {product.description}
							</ListGroupItem>
						</ListGroup>
					</Col>
					<Col md={3}>
						<Card>
							<ListGroup variant="flush">
								<ListGroupItem>
									<Row>
										<Col>Price:</Col>
										<Col>
											<strong>${product.price}</strong>
										</Col>
									</Row>
								</ListGroupItem>
								<ListGroupItem>
									<Row>
										<Col>Status:</Col>
										<Col>
											{product.countInStock > 0
												? "In Stock"
												: "Out of Stock"}
										</Col>
									</Row>
								</ListGroupItem>
								<ListGroupItem className="d-grid">
									<Button
										className="btn-block"
										type="button"
										disabled={product.countInStock === 0}
									>
										Add To Card
									</Button>
								</ListGroupItem>
							</ListGroup>
						</Card>
					</Col>
				</Row>
			)}
		</>
	);
}

export default ProductScreen;
