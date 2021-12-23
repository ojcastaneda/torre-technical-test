import './overlay.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import LanguageContext from '../../contexts/languageContext';

const Overlay = () => {
	const navigate = useNavigate();
	const [search, setSearch] = useState('');
	const [searching, setSearching] = useState(false);
	const language = useContext(LanguageContext);

	const searchBar = (
		<>
			<input
				className='form-control input-overlay border-0'
				type='text'
				placeholder={language.search}
				aria-label='Search'
				value={search}
				onChange={event => setSearch(event.target.value)}
				onFocus={() => setSearching(true)}
				onBlur={() => setSearching(false)}
				onKeyDown={event => {
					if (event.key === 'Enter') navigate(`/userSearch/${search}`);
				}}
			/>
			{searching ? (
				<button className='styleless-button px-2' onClick={() => setSearching(false)}>
					<FontAwesomeIcon className='align-middle select-cursor' icon={faTimes} size='lg' />
				</button>
			) : (
				<button className='styleless-button px-2' onClick={() => setSearching(true)}>
					<FontAwesomeIcon className='align-middle select-cursor' icon={faSearch} size='lg' />
				</button>
			)}
		</>
	);

	return (
		<nav className='navbar overlay-color sticky-top overlay-container'>
			<div className='container-fluid container'>
				<a className='navbar-brand overlay-color' href='/'>
					torre.co
				</a>
				<div className={`border border-1 p-1 rounded-2 input-group d-flex d-lg-none ${searching ? 'w-75' : 'w-50'}`}>
					{searchBar}
				</div>
				<div className={`border border-1 p-1 rounded-2 input-group d-none d-lg-flex ${searching ? 'w-50' : 'w-25'}`}>
					{searchBar}
				</div>
			</div>
		</nav>
	);
};

export default Overlay;
