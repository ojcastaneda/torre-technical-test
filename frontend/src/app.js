import Overlay from './components/overlay/overlay';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import LanguageContext from './contexts/languageContext';
import Profile from './components/profile/profile';
import Users from './components/users/users';
import PageNotFound from './components/pageNotFound/pageNotFound';
import localeEnglish from './i18n/en.json';
import localeSpanish from './i18n/es.json';

const language = window.navigator.language || navigator.browserLanguage;
const languageFile = language.startsWith('es') ? localeSpanish : localeEnglish;

function App() {
	return (
		<LanguageContext.Provider value={languageFile}>
			<BrowserRouter>
				<Overlay />
				<Routes>
					<Route exact path='/' element={<Navigate replace to='/user/ojcastaneda72' />} />
					<Route exact path='/userSearch/:name' element={<Users />} />
					<Route exact path='/user/:username' element={<Profile />} />
					<Route path='*' element={<PageNotFound />} />
				</Routes>
			</BrowserRouter>
		</LanguageContext.Provider>
	);
}

export default App;
