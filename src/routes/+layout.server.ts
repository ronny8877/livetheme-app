import { getThemeFromCookieHeader } from '$lib/utils/app-themes';

export const load = (event) => {
	//get theme from cookie and return
	const theme = getThemeFromCookieHeader(event.request.headers.get('cookie'));

	return { theme: theme || 'bumblebee' };
};
