import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserTie } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';
import LanguageContext from '../../contexts/languageContext';
import './users.css';

const Users = () => {
	const { name } = useParams();
	const navigate = useNavigate();
	const language = useContext(LanguageContext);
	const [candidatePeople, setCandidatePeople] = useState();

	useEffect(() => {
		(async () => {
			const response = await fetch('/api/usersWithName', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ name })
			});
			const fetchedUsers = await response.json();
			setCandidatePeople(fetchedUsers.results);
		})();
	}, [name]);

	return (
		<div className='rounded-3 profile-container container my-5 '>
			<div className='container p-2 p-lg-5'>
				<h1 className='text-center mb-3'>{language['matches-for']}: {name}</h1>
				{candidatePeople === undefined ? (
					<div className='p-4'>
						<div className='loading-icon' />
					</div>
				) : (
					candidatePeople.map(person => (
						<div
							key={person.subjectId}
							className='matched-user border shadow-3 mb-2 p-2 rounded-3 row '
							onClick={() => navigate(`/user/${person.username}`)}>
							<div className='col-3 col-lg-1 text-center d-flex d-lg-block align-items-center'>
								<FontAwesomeIcon className='align-middle' icon={faUserTie} size='3x' />
							</div>
							<div className='col-9 col-lg-11'>
								<h4 className='m-0 fw-bold'>{person.name}</h4>
								<div className='secondary-font-color'>{person.professionalHeadline}</div>
							</div>
						</div>
					))
				)}
			</div>
		</div>
	);
};

export default Users;
