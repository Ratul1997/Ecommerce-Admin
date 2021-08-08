/* eslint-disable */
import { Fragment, React, useEffect, useState } from "react";
import Attribute from "./Attributes";
import axios from "axios";
import { urls } from "@urls";
import { Button } from "reactstrap";
export default function Attributes() {
	const [attributesList, setAttributesList] = useState([]);
	useEffect(() => {
		loadAttributes();
	}, []);
	const loadAttributes = async () => {
		try {
			const res = await axios.get(urls.GET_ATTRIBUTES);
			setAttributesList(res.data.results);
		} catch (error) {
			console.warn(error);
		}
	};
	const onSave = () => {
		console.log("click");
	};
	return (
		<>
			<Attribute
				attributesList={attributesList}
				setAttributesList={setAttributesList}
			/>
			<Button.Ripple color="primary" className="ml-3" onClick={onSave}>
				Save
			</Button.Ripple>
		</>
	);
}
