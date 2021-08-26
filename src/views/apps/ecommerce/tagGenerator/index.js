/*eslint-disable*/
import {Fragment} from "react";
import { Card } from "reactstrap";
import Breadcrumbs from '@components/breadcrumbs'
import GenerateTag from './generateTag'
const TagGenerator = () => {
	return (
		<Fragment>
			<Breadcrumbs
				breadCrumbTitle="Shop"
				breadCrumbParent="eCommerce"
				breadCrumbActive="Shop"
			/>
			<GenerateTag />
		</Fragment>
	);
};

export default TagGenerator;
