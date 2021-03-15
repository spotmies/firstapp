import React, { useState, useRef, useEffect } from 'react';
import { HiOutlineX, HiMenu } from 'react-icons/hi';

const Navbar = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const linkContainerRef = useRef(null);
	const linksRef = useRef(null);
	useEffect(() => {
		if (isMenuOpen) {
			linkContainerRef.current.style.height =
				linksRef.current.getBoundingClientRect().height + 'px';
		} else {
			linkContainerRef.current.style.height = '0px';
		}
	}, [isMenuOpen]);
	return (
		<div className="relative bg-white">
			<div className="max-w-7xl mx-auto  ">
				{/* Main menu start*/}
				<div className="relative py-5 px-4 hidden md:block">
					<nav className="flex justify-between items-center ">
						<div className="logo">
							<div className="text-gray-600 font-bold text-2xl flex items-center px-5">
								ZRF
								<span className="px-2 text-indigo-600 ">
									Tech
								</span>
							</div>
						</div>
						<div className="flex capitalize items-center">
							
								return (
									<a
										className=" text-gray-500 hover:text-gray-900 font-medium hover:bg-gray-50 py-4 px-5 rounded-sm capitalize"
									>
										Home
									</a>
                                    <a
										className=" text-gray-500 hover:text-gray-900 font-medium hover:bg-gray-50 py-4 px-5 rounded-sm capitalize"
									>
										Bookings
									</a>
                                    <a
										className=" text-gray-500 hover:text-gray-900 font-medium hover:bg-gray-50 py-4 px-5 rounded-sm capitalize"
									>
										settings
									</a>
                                    <a
										className=" text-gray-500 hover:text-gray-900 font-medium hover:bg-gray-50 py-4 px-5 rounded-sm capitalize"
									>
										Login
									</a>
								);
							
						</div>
					</nav>
				</div>

				{/* mobile menu start*/}
				<div
					className={`absolute py-5 px-4 md:hidden top-0 w-full bg-white overflow-hidden`}
				>
					<nav className="flex flex-col my-2">
						<div className="flex justify-between">
							<div className="text-gray-600 font-bold text-2xl flex items-center px-5">
								ZRF
								<span className="px-2 text-indigo-600 ">
									Tech
								</span>
							</div>
							{isMenuOpen && (
								<button
									onClick={() => {
										setIsMenuOpen(!isMenuOpen);
									}}
									className="opacity-100 flex items-center justify-center w-10 h-10 text-gray-500 hover:text-gray-700 hover:bg-gray-100 active:bg-gray-200 rounded-sm focus:outline-none focus:ring focus:ring-indigo-500"
								>
									<HiOutlineX className="w-6 h-6" />
								</button>
							)}
							{!isMenuOpen && (
								<button
									onClick={() => {
										setIsMenuOpen(!isMenuOpen);
									}}
									className="flex items-center justify-center w-10 h-10 text-gray-500 hover:text-gray-700 hover:bg-gray-100 active:bg-gray-200 rounded-sm focus:outline-none focus:ring focus:ring-indigo-500"
								>
									<HiMenu className="w-6 h-6" />
								</button>
							)}
						</div>

						<div
							className={`transition-all ease-linear duration-200 ${
								isMenuOpen ? 'visible' : 'invisible '
							}`}
							ref={linkContainerRef}
						>
							<div className="flex flex-col" ref={linksRef}>
								
									return (
                                        <a
										className=" text-gray-500 hover:text-gray-900 font-medium hover:bg-gray-50 py-4 px-5 rounded-sm capitalize"
									>
										Home
									</a>
                                    <a
										className=" text-gray-500 hover:text-gray-900 font-medium hover:bg-gray-50 py-4 px-5 rounded-sm capitalize"
									>
										Bookings
									</a>
                                    <a
										className=" text-gray-500 hover:text-gray-900 font-medium hover:bg-gray-50 py-4 px-5 rounded-sm capitalize"
									>
										settings
									</a>
                                    <a
										className=" text-gray-500 hover:text-gray-900 font-medium hover:bg-gray-50 py-4 px-5 rounded-sm capitalize"
									>
										Login
									</a>
									);
								
							</div>
						</div>
					</nav>
				</div>
			</div>
		</div>
	);
};

export default Navbar;