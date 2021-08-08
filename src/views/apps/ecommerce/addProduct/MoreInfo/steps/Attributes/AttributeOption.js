/* eslint-disable */
import React, { Fragment } from "react";
import { FormGroup, Label, Col, Card, CustomInput } from "reactstrap";
import { X } from "react-feather";
import Select from "react-select";

import { selectThemeColors } from "@utils";
export default function AttributeOption({ attribute, onRemove, index }) {
	console.log(index);
	const getOptions = () => {
		return attribute.options.map((item) => {
			return { value: item.option_id, label: item.option_name };
		});
	};

	return (
		<div>
			<Card className="p-1">
				<FormGroup row>
					<Label sm="3" for="attribute_name">
						Attribute Name
					</Label>
					<Label sm="7" for="attribute_name">
						{attribute.attribute_name}
					</Label>

					<X sm="2" className="border" color="red" onClick={onRemove(index)} />
				</FormGroup>
				<FormGroup row>
					<Label sm="3" for="enable_for_variants">
						Variation
					</Label>
					<Col sm="9">
						<CustomInput
							type="checkbox"
							id="enable-variations"
							defaultChecked={true}
							label="Enable For Variants"
						/>
					</Col>
				</FormGroup>
				<FormGroup row>
					<Label sm="3" for="attribute_options">
						Attribute Options
					</Label>
					<Col sm="9">
						<Select
							id="blog-edit-category"
							isClearable={false}
							theme={selectThemeColors}
							isMulti
							name="colors"
							options={getOptions()}
							className="react-select"
							classNamePrefix="select"
						/>
					</Col>
				</FormGroup>
			</Card>
		</div>
	);
}
