import React, { useContext, useEffect, useState } from 'react';
import { applyTheme, teams } from '../../colors/theme';
import { AppContext } from '../../AppContext';
import './Navbar.css';
import { FaShoppingCart } from 'react-icons/fa';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faHouse,
	faCartShopping,
	faRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const {
		club,
		setClub,
		setGlobalSearchTerm,
		cartCount,
		gender,
		setGender,
		cartItems,
	} = useContext(AppContext);
	const [searchTerm, setSearchTerm] = useState('');
	const [count, setCount] = useState(1);
	const [menuState, setMenuState] = useState(false);

	useEffect(() => {
		applyTheme(club);
		setGender('All');
	}, [club]);

	const handleSearch = (e) => {
		const term = e.target.value;
		setSearchTerm(term);
		setGlobalSearchTerm(term); // Cập nhật giá trị tìm kiếm toàn cục
	};

	const handleClickMenu = () => {
		setMenuState(!menuState);
	};

	useEffect(() => {
		if (teams[club]?.color_title) {
			document.documentElement.style.setProperty(
				'--color_title',
				teams[club].color_title
			);
			document.documentElement.style.setProperty(
				'--navbar-bg',
				`url(${teams[club].background})`
			);
			document.documentElement.style.setProperty(
				'--font_logo',
				teams[club].font_logo
			);
			document.documentElement.style.setProperty(
				'--font_text',
				teams[club].font_text
			);
			document.documentElement.style.setProperty(
				'--main_color',
				teams[club].main_color
			);
			document.documentElement.style.setProperty(
				'--second_color',
				teams[club].second_color
			);
		}
	}, [club]);
	const handleClickMenu2_home = () => {
		navigate('/', { state: { fromWelcome: true } });
		setMenuState(false);
	};
	const handleClickMenu2_cart = () => {
		navigate('/cart', { state: { fromWelcome: true } });
		setMenuState(false);
	};

	return (
		<nav className=' app__navbar'>
			{menuState && (
				<div className='app__navbar-menu2'>
					<div className='container-menu2'>
						<div className='menu2-home' onClick={handleClickMenu2_home}>
							<FontAwesomeIcon icon={faHouse} style={{ marginRight: '8px' }} />
							Trang chủ
						</div>
						<div className='menu2-cart' onClick={handleClickMenu2_cart}>
							<FontAwesomeIcon
								icon={faCartShopping}
								style={{ marginRight: '8px' }}
							/>
							Giỏ hàng
						</div>
						<div onClick={(e) => setMenuState(false)} className='menu2-exit'>
							<FontAwesomeIcon
								icon={faRightFromBracket}
								style={{ marginRight: '8px' }}
							/>
							Exit
						</div>
					</div>
				</div>
			)}

			<div className='container flex flex-gap-3'>
				<Link to='/'>
					<div className='flex dropdown-parent' style={{ width: '300px' }}>
						<img className='logo' src={teams[club]?.logo} alt={club} />
						<span className='fs-md color-title club-name'>{club}</span>
						<div className='dropdown'>
							<div className='flex flex-col dropdown-item'>
								{Object.keys(teams)
									.filter((prsClub) => prsClub !== club)
									.map((e) => (
										<div
											key={e}
											className=' dropdown-item'
											style={{ backgroundImage: `url(${teams[e].background})` }}
											onClick={() => setClub(e)}
										>
											<div className='flex '>
												<img className='logo' src={teams[e].logo} alt={e} />
												<span className='fs-md color-title club-name'>{e}</span>
											</div>
										</div>
									))}
							</div>
						</div>
					</div>
				</Link>

				{location.pathname === '/home' && (
					<div className='container flex flex-gap-3'>
						<div
							className='search-bar'
							style={{ marginRight: '20px', marginLeft: '30px', flex: 1 }}
						>
							<input
								type='text'
								placeholder='Tìm kiếm sản phẩm...'
								value={searchTerm}
								onChange={handleSearch}
								className='search-input'
							/>
						</div>
						<div className='app__navbar-icons'>
							<div className='app__top-bottom-center app__nav-open-button app__nav-open-button1 dropdown-parent'>
								<Link to='/cart'>
									<FaShoppingCart
										className='shopping-cart'
										size={35}
										color={teams[club]?.color_title}
									/>
								</Link>
								{cartItems?.length > 0 && (
									<div className='app__nav-count'>{cartItems?.length}</div>
								)}{' '}
							</div>
							<button
								className='app__top-bottom-center app__nav-open-button app__nav-open-button2'
								onClick={handleClickMenu}
							>
								<span className='line line-1'></span>
								<span className='line line-2'></span>
								<span className='line line-3'></span>
							</button>
						</div>
					</div>
				)}
			</div>
		</nav>
	);
};

export default Navbar;
