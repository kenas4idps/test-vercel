import { useEffect, useRef, useState } from 'react';

import WarningIcon from 'assets/icons/warning.svg';

import './CustomErrorInput.scss';

interface CustomErrorInputType {
	text: string,
	visible: boolean,
	hideTimeout?: () => void
}

const CustomErrorInput = ({text, visible, hideTimeout}: CustomErrorInputType) => {
	const [textMessageError, setTextMessageError] = useState(text);
	const errorTimeOut = useRef<NodeJS.Timeout | null>(null);

	
	useEffect(() => {
		setTextMessageError(text);

		if (hideTimeout) {
			if (errorTimeOut.current) {
				clearTimeout(errorTimeOut.current);
			}
	
			errorTimeOut.current = setTimeout(() => {
				hideTimeout();
			}, 3000) 
		}
		
		return () => {
			if (errorTimeOut.current) {
				clearTimeout(errorTimeOut.current);
			}
		};
	}, [text, visible, hideTimeout]);

	return (
		<>
			{(visible) && 
				<div className='error-container'>
					<img src={WarningIcon} className='error-icon' alt='warning icon'/>

					<div className='error-message'>
						{textMessageError}
					</div>
				</div>
			}
		</>
	);
}

export default CustomErrorInput;