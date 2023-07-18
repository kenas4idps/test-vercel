import PageWrapper from 'components/layout/pageWrapper';
import CustomButton from 'components/common/customButton';

import PhoneIcon from 'assets/icons/phone.svg';
import BadgeIcon from 'assets/icons/badge.svg';
import FingerprintIcon from 'assets/icons/fingerprint.svg';

import "./LandingStep.scss";

interface LandingStepType {
	goToNextStep: () => void;
}

const LandingStep = ({goToNextStep}: LandingStepType) => {
	return (
		<PageWrapper className="landing-step">
			<div className="left-column">
				<div className='title'>
					Community Marketing and Engagement
				</div>

				<div className='subtitle'>
					Your community is at the heart of your product.
				</div>
				
				<CustomButton
					className='btn-next-step'
					onClickBtn={() => goToNextStep()}
				>
					Register your community today! 
				</CustomButton>
			</div>

			<div className='right-column'>
				<div className='description'>
					<p>
						Nuvo is giving you a new way to make your brand part of their digital identity.
					</p>

					<p>
						NuvoMe and NuvoOne make your brand part of the Nuvo Digital Identity experience, unlocking the power of digital identity for your community.
					</p>
	
					<ul>
						<li style={{backgroundImage: `url(${PhoneIcon})`}}>
							Featured Community Profiles
						</li>

						<li style={{backgroundImage: `url(${BadgeIcon})`}}>
							NuvoBadges
						</li>

						<li style={{backgroundImage: `url(${FingerprintIcon})`}}>
							Reputation Power
						</li>
					</ul>

					<p>
						Nuvo is a modernised and better way to inspire and engage your community, audience, and followers!
					</p>

					<p>
						Register your community with Nuvo, limited spaces available
					</p>
				</div>

				<CustomButton
					className='btn-next-step-mobile'
					onClickBtn={() => goToNextStep()}
				>
					Register your community today! 
				</CustomButton>
			</div>
		</PageWrapper>
	)
}
  
export default LandingStep;