import { ReactNode } from 'react';

import PageWrapper from 'components/layout/pageWrapper';
import CustomButton from 'components/common/customButton';

import CustomInputText from 'components/common/customInputText';
import CustomDropDown from 'components/common/customDropDown';

import MailIcon from 'assets/icons/mail.svg';
import TelegramIcon from 'assets/icons/telegram.svg';
import LinkIcon from 'assets/icons/link.svg';
import GroupIcon from 'assets/icons/group.svg';

import "./Step2.scss";


interface Step2Type {
	children: ReactNode,
	goToNextStep: () => void
}

const dropDownOptions = [
	{
		label: '0',
		value: '0'
	},
	{
		label: '1',
		value: '1'
	},
	{
		label: '2',
		value: '2'
	},
	{
		label: '3',
		value: '3'
	},
	{
		label: '4',
		value: '4'
	},

]

const Step2 = ({children, goToNextStep}: Step2Type) => {
	const onFormSubmit = () => {
		console.log('todo')
	}

	return (
		<PageWrapper customStyle='small' className='step-2'>
			<div className='title'>
				Register your community today! 
			</div>

			<div className='form-container'>
				<form onSubmit={() => onFormSubmit()}>
					<CustomInputText
						label='Email adress'
						placeholder='user@mail.com'
						icon={MailIcon}
					/>

					<CustomInputText
						label='Telegram handle (optional)'
						placeholder='@User'
						icon={TelegramIcon}
					/>

					<CustomInputText
						label='Website URL'
						placeholder='Website'
						icon={LinkIcon}
					/>

					<CustomDropDown
						options={dropDownOptions}
						placeholder='0-5'
						label='Community size'
						icon={GroupIcon}
					/>
				</form>
			</div>

			<div className='common-part'>
				{children}
			</div>
			
			<CustomButton className="validation-btn" onClickBtn={() => goToNextStep()}>
				SEND
			</CustomButton>
		</PageWrapper>
	)
}
  
export default Step2;