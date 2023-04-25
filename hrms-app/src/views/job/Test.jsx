import React, { Component, useEffect } from "react";
import axios_client from "../../axios-client";

export class Test extends Component {
	constructor(props) {
		super(props);

		this.state = { value: "coconut", companies: {} };

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	getCompanies() {
		axios_client
			.get("/company-list")
			.then(({ data }) => {
				this.setState({ companies: data.data });
			})
			.catch((err) => {
				console.log(err);
			});
	}

	handleChange(event) {
		this.setState({ value: event.target.value });
	}

	handleSubmit(event) {
		alert("Your favorite flavor is: " + this.state.value);
		event.preventDefault();
	}

	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				<label>
					Pick your favorite flavor:
					<select value={this.state.value} onChange={this.handleChange}>
						{this.state.companies.map((data) => (
							<option value="">{data}</option>
						))}
					</select>
				</label>
				<input type="submit" value="Submit" />
			</form>
		);
	}
}

export default Test;
