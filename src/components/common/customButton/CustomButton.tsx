import { ReactNode } from 'react';

import './CustomButton.scss';

interface CustomButtonType {
	children: ReactNode,
	onClickBtn?: (event:React.MouseEvent<HTMLButtonElement>) => void,
	btnStyle?: string,
	className?: string,
	isActive?: boolean
}

const CustomButton = ({children, onClickBtn, btnStyle, className, isActive=true }: CustomButtonType) => {
	return (
		<>
			<button
				className={`btn ${(btnStyle)? btnStyle: 'custom-1'} ${className} ${isActive ? '':'inactive'}`}
				onClick={(event) => {if (onClickBtn) onClickBtn(event)}}
			>
				{children}
			</button>
		</>
	);
}

export default CustomButton;