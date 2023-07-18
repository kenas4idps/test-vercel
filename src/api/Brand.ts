import { useContext } from 'react';
import axios from 'axios';
import { NotificationContext } from 'providers/notificationProvider';

const BrandApi = () => {
	const { displayNotification } = useContext(NotificationContext);

	const getPreviousBrandData = async () => {
		const result = await axios.get(
			process.env.REACT_APP_LOCAL_SERVER_URL + '/data'
		).then(response => {
			console.log("response", response);
			return response.data;
		}).catch(error => {
			displayNotification('Error trying to contact BE', 'error');
			console.error("[Error - API] Error calling setBrand", error);
			return error.response
		});

		return result;
	}

	const setBrand = async (brandName: string, logo: string, contactName:string, email:string, websiteUrl:string) => {
		const data = {
			'brandName': brandName,
			'logo': logo,
			'contactName': contactName,
			'email': email,
			'websiteUrl': websiteUrl
		}

		const result = await axios.post(
			process.env.REACT_APP_BE_URL + '/auth/create_brand',
			data
		).then(response => {
			return response.data;
		}).catch(error => {
			displayNotification('Error trying to contact BE', 'error');
			console.error("[Error - API] Error calling setBrand", error);
			return error.response
		});

		return result;
	}

	return {
		getPreviousBrandDataApi: getPreviousBrandData,
		setBrandApi: setBrand
	};
}

export default BrandApi;