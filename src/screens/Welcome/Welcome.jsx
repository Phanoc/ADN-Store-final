import React, { useEffect, useState, useContext } from 'react';
import Items from '../Item/Items';
import { AppContext } from '../../AppContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import {
	faChevronLeft,
	faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import './Welcome.css';
import './WelcomeCustom.css';
import axios from 'axios';
import Footer from '../Footer/Footer';
import { useNavigate } from 'react-router-dom';
import { teams, applyTheme } from '../../colors/theme';

const Welcome = () => {
	const navigate = useNavigate();
	const [featuredItemsUpper, setFeaturedItemsUpper] = useState([]);
	const [currentIndexUpper, setCurrentIndexUpper] = useState(0);
	const [featuredItems, setFeaturedItems] = useState([]);
	const [currentIndex, setCurrentIndex] = useState(0);
	const { club, setClub } = useContext(AppContext);

	useEffect(() => {
		axios
			.get(process.env.PUBLIC_URL + '/data/Data.json')
			.then((res) => {
				const data = res.data.legends;
				const filteredItemsUpper = data
					.filter((item) => item.club === club)
					.slice(0, 3);
				setFeaturedItemsUpper(filteredItemsUpper);
			})
			.catch((error) => {
				console.error('Error fetching data:', error);
			});
	}, [club]);

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentIndexUpper(
				(prevIndexUpper) => (prevIndexUpper + 1) % featuredItemsUpper.length
			);
		}, 7000);
		return () => clearInterval(interval);
	}, [featuredItemsUpper]);

	const handleNextUpper = () => {
		setCurrentIndexUpper(
			(prevIndexUpper) => (prevIndexUpper + 1) % featuredItemsUpper.length
		);
	};

	const handlePrevUpper = () => {
		setCurrentIndexUpper(
			(prevIndexUpper) =>
				(prevIndexUpper - 1 + featuredItemsUpper.length) %
				featuredItemsUpper.length
		);
	};
	useEffect(() => {
		axios
			.get(process.env.PUBLIC_URL + '/data/Data.json')
			.then((res) => {
				const data = res.data.items;
				const filteredItems = data
					.filter((item) => item.club === club)
					.slice(0, 5);
				setFeaturedItems(filteredItems);
			})
			.catch((error) => {
				console.error('Error fetching data:', error);
			});
	}, [club]);

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentIndex((prevIndex) => (prevIndex + 1) % featuredItems.length);
		}, 5000);
		return () => clearInterval(interval);
	}, [featuredItems]);

	const handleNext = () => {
		setCurrentIndex((prevIndex) => (prevIndex + 1) % featuredItems.length);
	};

	const handlePrev = () => {
		setCurrentIndex(
			(prevIndex) =>
				(prevIndex - 1 + featuredItems.length) % featuredItems.length
		);
	};

	return (
		<div className='page-container'>
			<div className='content'>
				<div
					className='hero-section'
					style={{
						backgroundImage: `linear-gradient(rgba(0,0,0,0.9),rgba(0,0,0,0.5)),url(${teams[club]?.hero_background})`,
					}}
				>
					<div className=''>
						<h3 className='fs-md mb-3 light-text'>Welcome to ADN Store</h3>
						<p className='word-wrap desc-text mb-3 light-text lead'>
							Here offer a wide selection of high-quality football jerseys from
							some of the most prestigious and historic football clubs in
							England.
						</p>
						<Link to='/home'>
							<button className='btn btn-primary'>SHOP NOW</button>
						</Link>
					</div>
					<div>
						<h3 className='lead light-text mb-1'>
							Choose a jersey from the club you want:
						</h3>
						<div
							className='flex dropdown-parent'
							style={{
								width: '300px',
								backgroundImage: `url(${teams[club].background})`,
							}}
						>
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
												style={{
													height: '80px',
													backgroundImage: `url(${teams[e].background})`,
												}}
												onClick={() => setClub(e)}
											>
												<div className='flex '>
													<img className='logo' src={teams[e].logo} alt={e} />
													<span className='fs-md color-title club-name'>
														{e}
													</span>
												</div>
											</div>
										))}
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className='slideshow-upper-container'>
					<div
						style={{
							width: '100%',
							lineHeight: '90px',
							backgroundImage: `url(${teams[club].background})`,
						}}
					>
						<h3 className='fs-md light-text text-center'>Club's Legend</h3>
					</div>
					{featuredItemsUpper.length > 0 && (
						<>
							<FontAwesomeIcon
								icon={faChevronLeft}
								className='slideshow-upper-btn prev'
								onClick={handlePrevUpper}
								onMouseDown={(event) => event.preventDefault()}
								onDoubleClick={(event) => event.preventDefault()}
							/>
							<div className='slideshow-upper-item'>
								<img
									src={featuredItemsUpper[currentIndexUpper]?.image}
									alt={featuredItemsUpper[currentIndexUpper]?.name}
									className='legend-image'
								/>
								<h2>
									<a
										href={featuredItemsUpper[currentIndexUpper]?.link}
										className='legends-name'
										target='_blank'
										rel='noopener noreferrer'
										style={{
											width: '100%',
											lineHeight: '90px',
											backgroundImage: `url(${teams[club].background})`,
										}}
									>
										{featuredItemsUpper[currentIndexUpper]?.name}
									</a>
								</h2>
							</div>
							<FontAwesomeIcon
								icon={faChevronRight}
								className='slideshow-upper-btn next'
								onClick={handleNextUpper}
								onMouseDown={(event) => event.preventDefault()}
								onDoubleClick={(event) => event.preventDefault()}
							/>
						</>
					)}
				</div>

				<div className='mt-3 container'>
					<div className='featured-text'>
						<h2 className='color-primary'>Featured Product</h2>
						<Link to='/home' className='linked-text lead'>
							View More
						</Link>
					</div>
					<div className='slideshow-wrapper'>
						<div className='slideshow-container'>
							{featuredItems.length > 0 && (
								<>
									<FontAwesomeIcon
										icon={faChevronLeft}
										className='slideshow-btn prev'
										onClick={handlePrev}
										onMouseDown={(event) => event.preventDefault()}
										onDoubleClick={(event) => event.preventDefault()}
									/>
									<div className=''>
										<Items
											id={featuredItems[currentIndex]?.id}
											name={featuredItems[currentIndex]?.name}
											image={featuredItems[currentIndex]?.image1}
											s_image={featuredItems[currentIndex]?.image2}
											price={featuredItems[currentIndex]?.price}
											hideCart={true}
										/>
									</div>
									<FontAwesomeIcon
										icon={faChevronRight}
										className='slideshow-btn next'
										onClick={handleNext}
										onMouseDown={(event) => event.preventDefault()}
										onDoubleClick={(event) => event.preventDefault()}
									/>
								</>
							)}
						</div>
						<div className='slideshow-indicators'>
							{featuredItems.map((_, index) => (
								<span
									key={index}
									className={`indicator ${
										index === currentIndex ? 'active' : ''
									}`}
								></span>
							))}
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default Welcome;
