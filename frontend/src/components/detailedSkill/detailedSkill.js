import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBalanceScale, faHandshake, faTimes } from '@fortawesome/free-solid-svg-icons';
import Tag from '../tag/tag';
import { useContext } from 'react';
import LanguageContext from '../../contexts/languageContext';
import './detailedSkill.css';

const DetailedSkill = props => {
	const { name, proficiency, recommendations, weight, exit } = props;
	const [relatedPeople, setRelatedPeople] = useState();
	const navigate = useNavigate();
	const language = useContext(LanguageContext);

	useEffect(() => {
		(async () => {
			const response = await fetch('/api/usersWithSkill', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ skill: name, proficiency })
			});
			const fetchedUsers = await response.json();
			setRelatedPeople(fetchedUsers.results);
		})();
	}, [name, proficiency]);

	return (
		<div className='container detailed-skill-container p-3 rounded-3'>
			<div className='text-end'>
				<button className='styleless-button' onClick={() => exit()}>
					<FontAwesomeIcon className='align-middle select-cursor m-1' icon={faTimes} size='lg' />
				</button>
			</div>
			<div className='row mb-1'>
				<div>
					<div className='secondary-font-color'>{language.skill}</div>
					<h3>{name}</h3>
				</div>
				<div className='p-2 border-bottom text-center'>
					<div className='secondary-font-color'>{language.proficiency}</div>
					<h4>{proficiency}</h4>
				</div>
			</div>
			<div className='row p-3 text-center border-bottom'>
				<div className='col'>
					<div>
						<FontAwesomeIcon className='align-middle select-cursor m-1' icon={faHandshake} />
						{recommendations}
					</div>
					<div>{language.recommendations}</div>
				</div>
				<div className='col'>
					<div>
						<FontAwesomeIcon className='align-middle select-cursor m-1' icon={faBalanceScale} />
						{Math.round(weight)}
					</div>
					<div>{language['recommendation-weight']}</div>
				</div>
			</div>
			<div className='row p-3'>
				<h4 className='text-center'>{language.peopleSameSkill}:</h4>
				<div>
					{relatedPeople === undefined ? (
						<div className='p-4'>
							<div className='loading-icon' />
						</div>
					) : (
						relatedPeople.map(person => (
							<Tag
								key={person.subjectId}
								content={person.name}
								onClick={() => {
									exit();
									navigate(`/user/${person.username}`);
								}}
							/>
						))
					)}
				</div>
			</div>
		</div>
	);
};

export default DetailedSkill;
