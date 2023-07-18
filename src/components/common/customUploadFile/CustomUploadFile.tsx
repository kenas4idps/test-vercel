import { useState, ChangeEvent, useRef } from 'react';


import CustomButton from '../customButton';
import CustomErrorInput from '../customErrorInput';

import UploadIcon from 'assets/icons/upload.svg';

import './CustomUploadFile.scss';

interface ImgPreview {
	preview: string,
	raw: File | null
}

interface CustomUploadFileType {
	label: string,
	onChange?: (value:File | null) => void,
	maxSize?: number, //Should be in MB
	isPicture?: boolean,
	cropSize?: number 
}

const CustomUploadFile = ({ label, onChange, maxSize, isPicture=false, cropSize=0  }: CustomUploadFileType) => {
	const [image, setImage] = useState<ImgPreview>({
		preview: "",
		raw: null
	});
	const [error, setError] = useState('');
	const [isErrorVisible, setIsErrorVisible] = useState(false);

	const fileInputRef = useRef<HTMLInputElement>(null);

	const resetFileUpload = () => {
		setImage({preview: "", raw: null});
		
		if (fileInputRef.current) {
			fileInputRef.current.value = '';
		}

		if (onChange) {
			onChange(null);
		}
	}

	const printError = (message: string) => {
		setError(message);
		setIsErrorVisible(true);
		resetFileUpload();
	}

	const handleFileChange = (file: File) => {
		return new Promise<File | null>((resolve) => {
			if (file) {
				const reader = new FileReader();
			
				reader.onload = (e) => {
					const image = new Image();
					
					if (e.target) {
						image.src = e.target.result as string;
					}
			
					image.onload = () => {
						const canvas = document.createElement('canvas');
						const ctx = canvas.getContext('2d');
				
						const targetWidth = cropSize;
						const targetHeight = cropSize;
						
						// Calculate the aspect ratio to maintain image proportions
						let width = image.width;
						let height = image.height;
						const aspectRatio = width / height;
				
						if (aspectRatio > 1) {
							// Landscape image
							width = targetWidth * aspectRatio;
							height = targetWidth;
						} else {
							// Portrait or square image
							height = targetHeight / aspectRatio;
							width = targetHeight;
						}
				
						// Resize the image
						canvas.width = width;
						canvas.height = height;
						if (ctx) {
							ctx.drawImage(image, 0, 0, width, height);
						}
				
						// Calculate the cropping dimensions
						const cropX = (width - targetWidth) / 2;
						const cropY = (height - targetHeight) / 2;
				
						// Create a new canvas for cropping
						const croppedCanvas = document.createElement('canvas');
						const croppedCtx = croppedCanvas.getContext('2d');

						croppedCanvas.width = targetWidth;
						croppedCanvas.height = targetHeight;
						if (croppedCtx && ctx) {
							// Crop the image
							croppedCtx.drawImage(canvas, cropX, cropY, targetWidth, targetHeight, 0, 0, targetWidth, targetHeight);
						}
				
						// Convert the cropped image to Blob
						croppedCanvas.toBlob((blob) => {
							if (blob) {
								const croppedFile = new File([blob], file.name, {
									type: file.type,
									lastModified: Date.now(),
								});
					
								resolve(croppedFile);
							} else {
								resolve(null);
							}
						}, file.type);
					};
				};
			
				reader.readAsDataURL(file);
			} else {
				resolve(file);
			}
		});
	};

	const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
		if (fileInputRef.current) {
			if (event.target.files && event.target.files.length) {
				
				const uploadedFile = event.target.files[0];
				//Conversion to MB
				const fileSizeInMB = uploadedFile.size / (1024 * 1024);

				if (maxSize && fileSizeInMB > maxSize) {
					printError('File size exceeds the maximum limit.');
					return;
				} else if (isPicture && !/^(image\/jpeg|image\/png|image\/gif)$/.test(uploadedFile.type)) {
					printError('The file should be a picture(PNG, JPEG, GIF).');
					return;
				} else {
					setIsErrorVisible(false);
				}

				let updatedFile = uploadedFile;
				if (cropSize > 0) {
					updatedFile = await handleFileChange(uploadedFile) as File;
				}
				

				const newFile = {
					preview: URL.createObjectURL(updatedFile),
					raw: updatedFile
				}
				
				setImage(newFile);

				if (onChange) {
					onChange(newFile.raw);
				}
			}
		}
	}

	const handleClickUpload = (event:React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		if (fileInputRef.current) {
			fileInputRef.current.click();
		}
	}

	const handleRemoveFile = (event:React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		resetFileUpload();
	}

	return (
		<div className='custom-upload-file'>
			<div className='real-label'>
				{label}
			</div>

			<label htmlFor='upload-button' className='img-preview-container'>
				{image.preview ? (
					<div className='upload-success'>
						<img 
							src={image.preview}
							alt="dummy"
							className="img-preview"
						/>

						<div className='img-uploaded-txt'>
							File Uploaded
						</div>
					</div>
				) : (
					<div className='waiting-img'>
						<img className='icon' alt="upload-icon" src={UploadIcon} />

						<div className='file-extentions'>
							JPG, PNG, GIF
						</div>

						<div className="description">
							Select your file (max. {maxSize} mb)
						</div>
					</div>
				)}

				<CustomErrorInput 
					text={error}
					visible={isErrorVisible}
				/>
			</label>

			<input
				type="file"
				className="hidden-input"
				id="upload-button"
				onChange={(event) => handleChange(event)}
				ref={fileInputRef}
			/>

			<div className='btn-list'>
				{(image.preview === "") ?
					<CustomButton 
					onClickBtn={(event) => handleClickUpload(event)}
					>
						Upload File
					</CustomButton>
				:
					<CustomButton btnStyle='custom-2' onClickBtn={(event) => handleRemoveFile(event)}>
						Remove file
					</CustomButton>
				}
			</div>
		</div>
	);
}

export default CustomUploadFile;