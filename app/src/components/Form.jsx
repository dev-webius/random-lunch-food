import React from "react";

import "../styles/form.scss";

export default class Form extends React.Component {
	render() {
		return <>
			<form onSubmit={this.props.onSubmit}>{this.props.children}</form>
		</>;
	}
}