import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGhost } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';
import LanguageContext from '../../contexts/languageContext';

const PageNotFound = () => {
	const language = useContext(LanguageContext);

	return (
		<div className='text-center rounded-3 profile-container container my-5 '>
			<div className='container p-5'>
				<FontAwesomeIcon className='align-middle select-cursor mb-3' icon={faGhost} size='9x' />
				<h3>{language['page-not-found']}</h3>
			</div>
		</div>
	);
};

export default PageNotFound;
