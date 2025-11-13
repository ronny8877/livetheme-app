// Return type unknown to avoid using any; caller assigns to template.component
export async function loadTemplateComponent(t: TemplateDefinition): Promise<unknown> {
	// Use explicit static dynamic imports so bundler can include chunks.
	switch (t.id) {
		case 'landing-page':
			return (await import('$lib/templates/landing-page.svelte')).default;
		case 'daisy-ui':
			return (await import('$lib/templates/daisyUI.svelte')).default;
		case 'shad-cn-login':
			return (await import('$lib/templates/shad-cn-login.svelte')).default;
		case 'shadcn-mock':
			return (await import('$lib/templates/shadcn-mock.svelte')).default;
		case 'shadcn-dashboard':
			return (await import('$lib/templates/shadcn-dashboard.svelte')).default;
		case 'blog-view':
			return (await import('$lib/templates/blog.svelte')).default;
		case 'blog-landing':
			return (await import('$lib/templates/blog-landing.svelte')).default;
		case 'tech-blog':
			return (await import('$lib/templates/tech-blog.svelte')).default;
		case 'waifu-gallery':
			return (await import('$lib/templates/waifu-gallery.svelte')).default;
		case 'auth-ui':
			return (await import('$lib/templates/auth.svelte')).default;
		case 'dashboard':
			return (await import('$lib/templates/dashboard.svelte')).default;
		case 'email-inbox':
			return (await import('$lib/templates/email-inbox.svelte')).default;
		case 'email-empty-state':
			return (await import('$lib/templates/email-empty-state.svelte')).default;
		case 'youtube':
			return (await import('$lib/templates/youtube.svelte')).default;
		case 'devv-social':
			return (await import('$lib/templates/devv-social.svelte')).default;
		case 'zen-showcase':
			return (await import('$lib/templates/zen-showcase.svelte')).default;
		case 'cooking-recipe':
			return (await import('$lib/templates/cooking-recipe.svelte')).default;
		case 'sass-landing':
			return (await import('$lib/templates/sass-landing.svelte')).default;
		case 'placeholder':
			return (await import('$lib/templates/placeholder.svelte')).default;
		default:
			throw new Error('Unknown template id: ' + t.id);
	}
}

export type FrameworkId = 'shadcn' | 'daisyui' | 'tailwind';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SvelteComponentConstructor = any;

export interface TemplateDefinition {
	id: string;
	title: string;
	description: string;
	category: string; // e.g. 'Blog', 'App'
	// Svelte component constructor (lazy loaded later)
	component: SvelteComponentConstructor | null;
	theme_id?: string; // optional theme to auto load
	fonts?: { heading?: string; body?: string };
	tags?: string[]; // keywords to help filtering
	framework?: FrameworkId;
}

export const templates_catalog = $state<TemplateDefinition[]>([
	{
		id: 'landing-page',
		title: 'Landing Page',
		description:
			'Professional marketing landing page with hero, features, pricing, and CTA sections',
		category: 'Marketing',
		component: null,
		theme_id: 'emerald',
		fonts: { heading: 'inter', body: 'inter' },
		tags: ['landing', 'marketing', 'saas', 'pricing', 'hero', 'cta'],
		framework: 'daisyui'
	},
	{
		id: 'sass-landing',
		title: 'SaaS Landing',
		description:
			'Modern SaaS landing page with AI-powered features, live preview, export code, and comprehensive showcase sections',
		category: 'Marketing',
		component: null,
		theme_id: 'fuschia',
		fonts: { heading: 'inter', body: 'inter' },
		tags: ['saas', 'landing', 'marketing', 'ai', 'features', 'pricing', 'export'],
		framework: 'daisyui'
	},
	{
		id: 'zen-showcase',
		title: 'Zen Showcase',
		description: 'Minimal, animated clock and color palette that highlights your active theme',
		category: 'Showcase',
		component: null,
		theme_id: 'caramellatte',
		framework: 'daisyui',
		fonts: { heading: 'bitcount', body: 'nunito' },
		tags: ['minimal', 'palette', 'clock', 'theme', 'showcase', 'animation']
	},
	{
		id: 'shad-cn-login',
		title: 'Shadcn Login',
		description: 'Clean and modern login/signup form styled with shadcn/ui components',
		category: 'App',
		component: null,
		theme_id: 'business',
		fonts: { heading: 'inter', body: 'inter' },
		tags: ['auth', 'login', 'signup', 'form', 'authentication'],
		framework: 'shadcn'
	},
	{
		id: 'shadcn-mock',
		title: 'Shadcn Mock',
		description:
			'Comprehensive showcase of Shadcn UI components including buttons, cards, dialogs, and form elements',
		category: 'Showcase',
		component: null,
		theme_id: 'retro',
		fonts: { heading: 'bitcount', body: 'nunito' },
		tags: ['components', 'showcase', 'ui', 'buttons', 'forms', 'cards'],
		framework: 'shadcn'
	},
	{
		id: 'daisy-ui',
		title: 'DaisyUI Components',
		description: 'A collection of popular DaisyUI components showcasing various styles and themes',
		category: 'Components',
		component: null,
		theme_id: 'fuschia',
		fonts: { heading: 'nunito', body: 'ubuntu' },
		tags: ['components', 'daisyui', 'ui', 'showcase', 'buttons', 'cards'],
		framework: 'daisyui'
	},
	{
		id: 'blog-view',
		title: 'Blog View',
		description: 'A detailed blog layout with header, articles, categories & newsletter box',
		category: 'Blog',
		component: null,
		theme_id: 'forest',
		framework: 'daisyui',
		fonts: { heading: 'poppins', body: 'inter' },
		tags: ['blog', 'articles', 'newsletter', 'content', 'reading']
	},
	{
		id: 'blog-landing',
		title: 'Blog Landing Page',
		description:
			'Modern landing page for blogs with hero, topics, testimonials & newsletter signup',
		category: 'Blog',
		component: null,
		theme_id: 'emerald',
		framework: 'daisyui',
		fonts: { heading: 'montserrat', body: 'lato' },
		tags: ['blog', 'landing', 'marketing', 'newsletter', 'testimonials']
	},
	{
		id: 'tech-blog',
		title: 'Tech Blog',
		description:
			'Professional technology blog with navigation, featured posts, search functionality, and pagination',
		category: 'Blog',
		component: null,
		theme_id: 'business',
		framework: 'daisyui',
		fonts: { heading: 'inter', body: 'inter' },
		tags: ['blog', 'tech', 'articles', 'search', 'navigation', 'content']
	},
	{
		id: 'waifu-gallery',
		title: 'Waifu Gallery',
		description: 'Playful anime art gallery with masonry layout, powered by waifu.im API',
		category: 'Gallery',
		component: null,
		theme_id: 'coffee',
		framework: 'daisyui',
		fonts: { heading: 'bitcount', body: 'nunito' },
		tags: ['gallery', 'anime', 'images', 'masonry', 'api', 'art']
	},
	{
		id: 'cooking-recipe',
		title: 'Cooking Recipe',
		description:
			'Beautiful recipe template with ingredients list, step-by-step instructions, ratings, and user reviews',
		category: 'Content',
		component: null,
		theme_id: 'emerald',
		framework: 'daisyui',
		fonts: { heading: 'poppins', body: 'inter' },
		tags: ['recipe', 'cooking', 'food', 'instructions', 'reviews', 'ratings']
	},
	{
		id: 'auth-ui',
		title: 'Authentication UI',
		description:
			'Clean and modern authentication interface with login, signup, and password recovery flows',
		category: 'App',
		component: null,
		framework: 'daisyui',
		theme_id: 'coffee',
		fonts: { heading: 'ubuntu', body: 'nunito' },
		tags: ['auth', 'login', 'signup', 'authentication', 'forms', 'security']
	},
	{
		id: 'dashboard',
		framework: 'daisyui',
		title: 'Dashboard',
		description:
			'Professional project management dashboard with live charts, analytics, team collaboration, and time tracking',
		category: 'App',
		component: null,
		theme_id: 'emerald',
		fonts: { heading: 'inter', body: 'inter' },
		tags: ['dashboard', 'analytics', 'charts', 'project', 'management', 'data']
	},
	{
		id: 'shadcn-dashboard',
		title: 'Dashboard (Shadcn)',

		description: 'Shadcn-styled dashboard layout with sidebar, header, charts and data table',
		category: 'App',
		component: null,
		theme_id: 'fuschia',
		fonts: { heading: 'inter', body: 'inter' },
		tags: ['dashboard', 'analytics', 'charts', 'shadcn', 'sidebar', 'data'],
		framework: 'shadcn'
	},
	{
		id: 'email-inbox',
		title: 'Email Inbox',
		framework: 'daisyui',
		description:
			'Feature-rich email client with collapsible sidebar, search, compose modal, and beautiful empty state',
		category: 'App',
		component: null,
		theme_id: 'business',
		fonts: { heading: 'inter', body: 'inter' },
		tags: ['email', 'inbox', 'productivity', 'messaging', 'compose', 'search']
	},
	{
		id: 'email-empty-state',
		title: 'Email Empty State',
		framework: 'daisyui',
		description:
			'Zen-like empty inbox state with live clock, time format toggle, and inspirational quotes that rotate every 30 seconds',
		category: 'Components',
		component: null,
		theme_id: 'coffee',
		fonts: { heading: 'inter', body: 'inter' },
		tags: ['empty-state', 'email', 'clock', 'zen', 'minimal', 'quotes']
	},
	{
		id: 'youtube',
		title: 'YouTube Clone',
		framework: 'daisyui',
		description:
			'Full-featured YouTube clone with smooth transitions, video grid, player view, related videos sidebar, and watch history',
		category: 'App',
		component: null,
		theme_id: 'dark',
		fonts: { heading: 'roboto', body: 'roboto' },
		tags: ['video', 'media', 'player', 'streaming', 'content', 'youtube']
	},
	{
		id: 'devv-social',
		title: 'Devv Social',
		framework: 'daisyui',
		description:
			'Twitter-like social media UI with posts, image carousel, animations, trending topics, and interactive features',
		category: 'App',
		component: null,
		theme_id: 'bumblebee',
		fonts: { heading: 'inter', body: 'inter' },
		tags: ['social', 'feed', 'posts', 'twitter', 'carousel', 'trending', 'interactive']
	},
	{
		id: 'placeholder',
		title: 'Placeholder Template',
		framework: 'daisyui',
		description:
			'Simple placeholder template for testing and prototyping new layouts and components',
		category: 'Utility',
		component: null,
		theme_id: 'emerald',
		fonts: { heading: 'inter', body: 'inter' },
		tags: ['placeholder', 'prototype', 'testing', 'template']
	}
]);

export const active_template = $state<{ template: TemplateDefinition | null }>({
	template: null
});

// Initialize the default template on the client side
if (typeof window !== 'undefined') {
	(async () => {
		const defaultTemplate = templates_catalog[1]; // sass-landing
		try {
			const component = await loadTemplateComponent(defaultTemplate);
			active_template.template = { ...defaultTemplate, component };
		} catch (error) {
			console.error('Failed to load default template:', error);
		}
	})();
}
