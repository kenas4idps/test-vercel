import { useContext } from 'react';
import AWS from 'aws-sdk';

import { NotificationContext } from 'providers/notificationProvider';


const AwsApi = () => {
	const { displayNotification } = useContext(NotificationContext);
	
	const AWSConfig = {
		bucket: 'nuvo-event-4i-dev',
		accessKeyId: 'AKIA52NNDU2WS6R22QG3',
		secretAccessKey: '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'
	}

	const s3 = new AWS.S3({
		accessKeyId: AWSConfig.accessKeyId,
		secretAccessKey: AWSConfig.secretAccessKey,
	});

	const randStr = (length = 5) => {
		let result = '';
		const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		const charactersLength = characters.length;
		let counter = 0;
		while (counter < length) {
		  result += characters.charAt(Math.floor(Math.random() * charactersLength));
		  counter += 1;
		}
		return result;
	}

	const fileToUploadHandler = async (file: File) => {
		return new Promise((resolve, reject) => {
			const ext = file.type.split('/')[1];
		
			s3.upload({
				Bucket: AWSConfig.bucket,
				Key: randStr(10) + '.' + ext,
				Body: file,
			},
			function (err: any, data: any) {
				if (err) {
					displayNotification('Error trying to upload your picture', 'error');
					console.log("[Error - AWS] Fail uploading image to AWS", err);
					reject(err);
				}
		
				if (data) {
					resolve(data.Location);
				} else {
					resolve(null);
				}	
			});
		});
	}

	return {
		fileToUploadHandler: fileToUploadHandler
	}
}

export default AwsApi;