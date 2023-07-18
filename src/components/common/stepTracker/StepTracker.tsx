import './StepTracker.scss';

interface StepTrackerType {
	stepNumber: number,
	currentStep: number
}

const StepTracker = ({stepNumber, currentStep}: StepTrackerType) => {
	return (
		<div className='step-tracker'>
			{Array(stepNumber).fill('').map((_, index) => {
				return (
					<div key={index} className={`dot ${(index === currentStep) && 'current'} `}>
					</div>
				)
			})}
		</div>
	);
}

export default StepTracker;