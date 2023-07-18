import { useEffect, useRef, useState } from 'react';

import './CustomDropDown.scss';

interface OptionType {
	label: string,
	value: string
}

interface CustomDropDownType {
	options: OptionType[],
	onSelect?: (value:string) => void,
	label: string,
	icon?: string
	placeholder?: string
}

const CustomDropDown = ({ options, onSelect, label, icon, placeholder}: CustomDropDownType) => {
	const [selectedOption, setSelectedOption] = useState<OptionType | null>(null);
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

	const handleToggleDropdown = () => {
		setIsOpen(!isOpen);
	};

	const handleSelectOption = (option:OptionType) => {
		setSelectedOption(option);
		if (onSelect) {
			onSelect(option.value);
		}	
		setIsOpen(false);
	};

	const handleClickOutside = (event: MouseEvent) => {
		if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
			setIsOpen(false);
		}
	};

	useEffect(() => {
		document.addEventListener('click', handleClickOutside);
	
		return () => {
			document.removeEventListener('click', handleClickOutside);
		};
	}, []);

	return (
		<div className="custom-dropdown" ref={dropdownRef}>
			<div className='label'>
				{label}
			</div>

			<div
				style={{backgroundImage: `url(${icon})`}}
				className={`custom-inpt ${(icon) && 'with-icon'} ${(selectedOption) ? '' : 'empty'} ${isOpen ? 'is-open' : ''} `}
				onClick={() => handleToggleDropdown()}
			>
				{(selectedOption) ?
					selectedOption.label
				:
					placeholder
				}

				<ul className="dropdown-menu">
					{options.map((option) => (
						<li
						key={option.value}
						className="dropdown-item"
						onClick={() => handleSelectOption(option)}
						>
						{option.label}
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}

export default CustomDropDown;