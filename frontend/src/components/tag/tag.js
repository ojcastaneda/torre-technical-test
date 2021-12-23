import './tag.css';

const Tag = props => {
	const { content, onClick } = props;
	return (
		<div className='p-2 m-1 tag border rounded-pill' onClick={onClick}>
			{content}
		</div>
	);
};

export default Tag;
