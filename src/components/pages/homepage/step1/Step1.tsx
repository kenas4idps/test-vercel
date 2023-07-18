import { ReactNode } from 'react';

import PageWrapper from 'components/layout/pageWrapper';
import CustomButton from 'components/common/customButton';

import CustomInputText from 'components/common/customInputText';

import EntrepriseIcon from 'assets/icons/entreprise.svg';
import UserIcon from 'assets/icons/user.svg';
import StarIcon from 'assets/icons/star.svg';
import PhoneIcon from 'assets/icons/phone-2.svg';

import "./Step1.scss";


interface Step1Type {
	children: ReactNode,
	goToNextStep: () => void
}

const Step1 = ({children, goToNextStep}: Step1Type) => {
	const onFormSubmit = () => {
		console.log('todo')
	}

	return (
		<PageWrapper customStyle='small' className='step-1'>
			<div className='title'>
				Register your community today! 
			</div>

			<div className='form-container'>
				<form onSubmit={() => onFormSubmit()}>
					<CustomInputText
						label='Organization'
						placeholder='Organization Name'
						icon={EntrepriseIcon}
					/>

					<CustomInputText
						label='Contact name'
						placeholder='Your Name'
						icon={UserIcon}
					/>

					<CustomInputText
						label='Position'
						placeholder='Your position'
						icon={StarIcon}
					/>

					<CustomInputText
						label='Contact number'
						placeholder='00 000 000'
						icon={PhoneIcon}
					/>
				</form>
			</div>

			<div className='common-part'>
				{children}
			</div>
			
			<CustomButton className="validation-btn" onClickBtn={() => goToNextStep()}>
				NEXT
			</CustomButton>
		</PageWrapper>
	)
}
  
export default Step1;