
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
// import { useNavigate, useLocation  } from 'react-router-dom';

import Logo from 'assets/icons/logo-full.svg';
import LogoMobile from 'assets/icons/logo.svg';

import './Nav.scss';


const Nav = () => {
	const { t } = useTranslation('nav');
	// const location = useLocation();
	// const navigate = useNavigate();
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const menuRef = useRef<HTMLDivElement>(null);

	const handleClickOutside = (event: MouseEvent) => {
		if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
			setIsMenuOpen(false);
		}
	};

	useEffect(() => {
		document.addEventListener('click', handleClickOutside);
		return () => {
			document.removeEventListener('click', handleClickOutside);
		};
	},[]) 

	const isCurrentPage = (pageLink:string) => {
		// const pageTree = pageLink.split('/');
		// const currentPage = '/' + pageTree[1];
		// return (location.pathname === currentPage);
		return (pageLink === "https://www.nuvosphere.io/");
	}

	const pageList = [
		{
			label: t('home'),
			url: 'https://www.nuvosphere.io/',
		},
		{
			label: t('about'),
			url: 'https://www.nuvosphere.io/about',
		},
		{
			label: t('docs'),
			url: 'https://docs.nuvosphere.io/',
		},
		{
			label: t('blog'),
			url: 'https://www.nuvosphere.io/blog'
		}
	];

	const changePage = (newUrl:string) => {
		//navigate(newUrl);
		window.location.href=newUrl;
	}
	
	return (
	<>
		<div className='main-nav'>
			<div 
				className="logo"
				onClick={() => changePage('https://www.nuvosphere.io')}
			>
				<img 
					src={Logo}
					className="logo-desktop"
					alt="compagny logo"
				/>

				<img
					src={LogoMobile}
					className="logo-mobile"
					alt="compagny logo"
				/>
			</div>

			<div className={`menu-container ${isMenuOpen ? 'open' : ''}`} ref={menuRef}>
				<div 
					className="btn-mobile-menu"
					onClick={() => setIsMenuOpen((prev) => !prev)}
				></div>
				<div className='main-pages-list' >
					{pageList.map((page, pageKey) => {
						return (
							<div 
								key={pageKey}
								className={`main-page ${isCurrentPage(page.url) && 'current-page'}`}
								
							>
								<span
									className="page-link"
									onClick={() => changePage(page.url)}
								>
									{page.label}
								</span>
							</div>
						)
					})}
					</div>
			</div>
		</div>
	</>
  );
}

export default Nav;