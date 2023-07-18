import {ReactNode} from 'react';

import './PageWrapper.scss';

interface PageWrapperProps {
	children: ReactNode;
	customStyle?: string;
	className?: string;
}

const PageWrapper = ({children, customStyle, className}:PageWrapperProps) => {
	return (
		<div className={`page-wrapper ${customStyle} ${className}`}>
			{children}
		</div>
	);
}

export default PageWrapper;