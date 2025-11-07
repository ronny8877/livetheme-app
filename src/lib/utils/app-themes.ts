const THEME_COOKIE_NAME = 'lt_theme';
const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365;

export function setThemeCookie(theme: string) {
	// browser-only
	if (typeof document === 'undefined') return;
	const expires = new Date(Date.now() + ONE_YEAR_SECONDS * 1000).toUTCString();
	// Path=/ so it's available site-wide
	document.cookie = `${THEME_COOKIE_NAME}=${encodeURIComponent(theme)}; Expires=${expires}; Path=/; SameSite=Lax`;
}
// Server-side: accepts the raw Cookie header string and returns theme or null
export function getThemeFromCookieHeader(cookieHeader?: string | null): string | null {
	if (!cookieHeader) return null;
	const parts = cookieHeader.split(';').map((s) => s.trim());
	for (const p of parts) {
		if (p.startsWith(THEME_COOKIE_NAME + '=')) {
			try {
				return decodeURIComponent(p.substring(THEME_COOKIE_NAME.length + 1));
			} catch {
				return null;
			}
		}
	}
	return null;
}
