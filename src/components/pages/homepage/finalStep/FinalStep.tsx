import PageWrapper from 'components/layout/pageWrapper';
import CustomButton from 'components/common/customButton';

import LogoIcon from 'assets/icons/logo.svg';

import "./FinalStep.scss";


const FinalStep = () => {
	const finalStepValidation = () => {
		window.location.href='https://one.nuvosphere.io/';
	}
	return (
		<PageWrapper customStyle='small always-center' className='final-step'>
			<img src={LogoIcon} alt="logo" className='logo' />

			<div className='title'>
				Thank your for completing your registration
			</div>

			<div className='subtitle'>
				click below to visit NuvoOne
			</div>
			
			<CustomButton className="thank-you-btn" onClickBtn={() => finalStepValidation()}>
				GO TO MY ACCOUNT
			</CustomButton>
		</PageWrapper>
	)
}
  
export default FinalStep;