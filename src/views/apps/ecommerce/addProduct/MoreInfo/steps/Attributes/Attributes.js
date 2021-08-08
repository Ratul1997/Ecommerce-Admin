/* eslint-disable */
import { Fragment, React, useEffect } from "react";
import axios from "axios";
import { urls } from "@urls";
import AttributeOption from "./AttributeOption";
export default function Attributes({ attributesList, setAttributesList }) {
	const onRemove = (index) => () => {
		attributesList.splice(index, 1);
		setAttributesList([...attributesList]);
	};
	return (
		<Fragment>
			<div className="content-header">
				<h5 className="mb-0">Attributes</h5>
			</div>
			{
				<ul>
					{attributesList.map((item, key) => {
						console.log(key);
						return (
							<AttributeOption
								attribute={item}
								key={key}
								index={key}
								onRemove={onRemove}
							/>
						);
					})}
				</ul>
			}
		</Fragment>
	);
}
