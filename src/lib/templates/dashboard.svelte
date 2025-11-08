<script lang="ts">
	/**
	 * LiveTheme Analytics Dashboard
	 *
	 * This dashboard displays comprehensive analytics for the LiveTheme platform:
	 *
	 * KEY METRICS:
	 * - Total Themes Generated: All-time theme creation count
	 * - Dark Themes: Number of dark mode themes created
	 * - Total Visits: Overall site traffic
	 * - Visits Today: Current day's traffic
	 * - Realtime Visitors: Live visitor count
	 *
	 * CHARTS:
	 * - Daily Theme Generation: Bar chart showing weekly theme creation
	 * - Theme Distribution: Donut chart for light vs dark theme ratio
	 * - Hourly Visits: Line chart tracking today's traffic by hour
	 * - Monthly Growth: Long-term trend analysis
	 *
	 * TEMPLATE ANALYTICS:
	 * - Top 5 Most Used Templates with usage percentages
	 * - Real-time activity feed showing recent user actions
	 *
	 * INTEGRATION POINTS:
	 * TODO: Connect to Umami Analytics API
	 * - Replace mock data with real Umami API calls in onMount()
	 * - Set up realtime WebSocket connection for live visitor count
	 * - Implement data refresh intervals (recommended: 60 seconds)
	 * - Add error handling for API failures
	 *
	 * UMAMI API ENDPOINTS TO USE:
	 * - /api/websites/:id/stats - Get overall statistics
	 * - /api/websites/:id/pageviews - Get pageview data
	 * - /api/websites/:id/metrics - Get detailed metrics
	 * - /api/websites/:id/active - Get realtime active users
	 */

	import {
		Palette,
		Moon,
		Eye,
		TrendingUp,
		Users,
		Activity,
		BarChart3,
		Sparkles,
		Clock,
		Globe,
		Zap,
		ArrowUpRight,
		ArrowDownRight,
		Menu,
		X
	} from '@lucide/svelte';
	import ChartD3Bar from '$lib/components/ui/templates/chart-d3-bar.svelte';
	import ChartD3Line from '$lib/components/ui/templates/chart-d3-line.svelte';
	import ChartDonut from '$lib/components/ui/templates/chart-donut.svelte';
	import { onMount } from 'svelte';

	// Sidebar toggle state
	let sidebarOpen = $state(false);

	// Main statistics - will be populated from Umami API
	let stats = $state({
		totalThemes: 15234,
		totalThemesChange: 12.5,
		darkThemes: 8567,
		darkThemesChange: 8.3,
		totalVisits: 45678,
		totalVisitsChange: 15.2,
		visitsToday: 1234,
		visitsTodayChange: -3.4,
		realtimeVisitors: 47
	});

	// Template usage stats - Top 5 most used templates
	let topTemplates = $state([
		{ name: 'Dashboard', uses: 3456, percentage: 22.7, color: 'primary' },
		{ name: 'Blog', uses: 2890, percentage: 19.0, color: 'secondary' },
		{ name: 'E-commerce', uses: 2345, percentage: 15.4, color: 'accent' },
		{ name: 'Landing Page', uses: 1987, percentage: 13.0, color: 'info' },
		{ name: 'Portfolio', uses: 1567, percentage: 10.3, color: 'success' }
	]);

	// Hourly visits data for today (24 hours)
	let hourlyVisits = $state([
		45, 23, 12, 8, 15, 34, 67, 89, 123, 145, 167, 189, 201, 195, 178, 156, 134, 112, 98, 87, 76, 65,
		54, 48
	]);

	// Daily theme generation for the last 7 days
	let dailyThemeGeneration = $state([234, 345, 289, 412, 378, 445, 523]);
	let weekLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

	// Monthly trends (last 12 months)
	let monthlyTrends = $state([
		3450, 3890, 4123, 4567, 5012, 5456, 5890, 6234, 6789, 7123, 7456, 7890
	]);
	let monthLabels = [
		'Jan',
		'Feb',
		'Mar',
		'Apr',
		'May',
		'Jun',
		'Jul',
		'Aug',
		'Sep',
		'Oct',
		'Nov',
		'Dec'
	];

	// Theme distribution (Light vs Dark)
	let darkThemePercentage = $state(56);

	// Recent activities
	let recentActivities = $state([
		{
			action: 'New theme generated',
			template: 'Dashboard',
			time: '2 minutes ago',
			icon: Palette,
			color: 'primary'
		},
		{
			action: 'Dark theme created',
			template: 'Blog',
			time: '5 minutes ago',
			icon: Moon,
			color: 'secondary'
		},
		{
			action: 'Theme exported',
			template: 'E-commerce',
			time: '12 minutes ago',
			icon: Sparkles,
			color: 'accent'
		},
		{
			action: 'Theme shared',
			template: 'Landing Page',
			time: '18 minutes ago',
			icon: Globe,
			color: 'info'
		}
	]);

	// Realtime visitor simulation
	function simulateRealtimeUpdate() {
		const change = Math.floor(Math.random() * 7) - 3; // Random change between -3 and +3
		stats.realtimeVisitors = Math.max(0, stats.realtimeVisitors + change);
	}

	// Format number with commas
	function formatNumber(num: number): string {
		return num.toLocaleString();
	}

	// Format percentage
	function formatPercentage(num: number): string {
		return (num > 0 ? '+' : '') + num.toFixed(1) + '%';
	}

	onMount(() => {
		// TODO: Fetch real data from Umami API
		// This is where you'll integrate your Umami analytics

		// Simulate realtime updates
		const realtimeInterval = setInterval(simulateRealtimeUpdate, 5000);

		// Simulate hourly data updates
		const hourlyInterval = setInterval(() => {
			const currentHour = new Date().getHours();
			hourlyVisits[currentHour] += Math.floor(Math.random() * 10);
			hourlyVisits = [...hourlyVisits];
		}, 30000);

		return () => {
			clearInterval(realtimeInterval);
			clearInterval(hourlyInterval);
		};
	});
</script>

<!-- LiveTheme Analytics Dashboard - Umami Style -->
<div class="min-h-screen bg-base-100">
	<!-- Header -->
	<header class="border-b border-base-300">
		<div class="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
			<div class="flex items-center justify-between">
				<div class="flex items-center gap-3">
					<Palette class="h-6 w-6 text-primary" />
					<h1 class="text-xl font-semibold text-base-content">LiveTheme</h1>
				</div>
				<div class="flex items-center gap-4">
					<div class="flex items-center gap-2 text-sm">
						<div class="relative flex h-2 w-2">
							<span
								class="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75"
							></span>
							<span class="relative inline-flex h-2 w-2 rounded-full bg-success"></span>
						</div>
						<span class="text-base-content/70">{stats.realtimeVisitors} current visitors</span>
					</div>
				</div>
			</div>
		</div>
	</header>

	<!-- Main Content -->
	<main class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
		<!-- Stats Grid - Umami Style -->
		<div class="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
			<!-- Total Themes -->
			<div class="border border-base-300 bg-base-100 p-5">
				<div class="mb-1 text-xs font-medium tracking-wide text-base-content/60 uppercase">
					Total Themes
				</div>
				<div class="flex items-baseline gap-2">
					<div class="text-3xl font-bold text-base-content tabular-nums">
						{formatNumber(stats.totalThemes)}
					</div>
					<div
						class="text-sm font-medium {stats.totalThemesChange > 0
							? 'text-success'
							: 'text-error'}"
					>
						{formatPercentage(stats.totalThemesChange)}
					</div>
				</div>
			</div>

			<!-- Dark Themes -->
			<div class="border border-base-300 bg-base-100 p-5">
				<div class="mb-1 text-xs font-medium tracking-wide text-base-content/60 uppercase">
					Dark Themes
				</div>
				<div class="flex items-baseline gap-2">
					<div class="text-3xl font-bold text-base-content tabular-nums">
						{formatNumber(stats.darkThemes)}
					</div>
					<div class="text-sm font-medium text-base-content/50">
						{darkThemePercentage}%
					</div>
				</div>
			</div>

			<!-- Total Visits -->
			<div class="border border-base-300 bg-base-100 p-5">
				<div class="mb-1 text-xs font-medium tracking-wide text-base-content/60 uppercase">
					Total Visits
				</div>
				<div class="flex items-baseline gap-2">
					<div class="text-3xl font-bold text-base-content tabular-nums">
						{formatNumber(stats.totalVisits)}
					</div>
					<div
						class="text-sm font-medium {stats.totalVisitsChange > 0
							? 'text-success'
							: 'text-error'}"
					>
						{formatPercentage(stats.totalVisitsChange)}
					</div>
				</div>
			</div>

			<!-- Visits Today -->
			<div class="border border-base-300 bg-base-100 p-5">
				<div class="mb-1 text-xs font-medium tracking-wide text-base-content/60 uppercase">
					Visits Today
				</div>
				<div class="flex items-baseline gap-2">
					<div class="text-3xl font-bold text-base-content tabular-nums">
						{formatNumber(stats.visitsToday)}
					</div>
					<div
						class="text-sm font-medium {stats.visitsTodayChange > 0
							? 'text-success'
							: 'text-error'}"
					>
						{formatPercentage(stats.visitsTodayChange)}
					</div>
				</div>
			</div>
		</div>

		<!-- Theme Generation Chart -->
		<div class="mb-8 border border-base-300 bg-base-100 p-6">
			<h3 class="mb-4 text-sm font-semibold text-base-content">Theme Generation This Week</h3>
			<div class="h-64">
				<ChartD3Bar
					data={dailyThemeGeneration.map((val, i) => ({ label: weekLabels[i], value: val }))}
					height={256}
				/>
			</div>
		</div>

		<!-- Hourly Traffic Chart -->
		<div class="mb-8 border border-base-300 bg-base-100 p-6">
			<h3 class="mb-4 text-sm font-semibold text-base-content">Traffic Today</h3>
			<div class="h-64">
				<ChartD3Line
					data={hourlyVisits}
					labels={Array.from({ length: 24 }, (_, i) => `${i}:00`)}
					height={256}
				/>
			</div>
		</div>

		<!-- Tables Grid -->
		<div class="grid grid-cols-1 gap-8 lg:grid-cols-2">
			<!-- Top Templates Table -->
			<div class="border border-base-300 bg-base-100">
				<div class="border-b border-base-300 px-6 py-4">
					<h3 class="text-sm font-semibold text-base-content">Most Used Templates</h3>
				</div>
				<div class="divide-y divide-base-300">
					{#each topTemplates as template}
						<div class="px-6 py-4 transition-colors hover:bg-base-200/50">
							<div class="flex items-center justify-between">
								<div class="flex-1">
									<div class="text-sm font-medium text-base-content">{template.name}</div>
									<div class="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-base-300">
										<div
											class="h-full bg-primary transition-all"
											style="width: {template.percentage}%"
										></div>
									</div>
								</div>
								<div class="ml-6 text-right">
									<div class="text-sm font-semibold text-base-content tabular-nums">
										{formatNumber(template.uses)}
									</div>
									<div class="text-xs text-base-content/60">{template.percentage.toFixed(1)}%</div>
								</div>
							</div>
						</div>
					{/each}
				</div>
			</div>

			<!-- Recent Activity Table -->
			<div class="border border-base-300 bg-base-100">
				<div class="border-b border-base-300 px-6 py-4">
					<h3 class="text-sm font-semibold text-base-content">Recent Activity</h3>
				</div>
				<div class="divide-y divide-base-300">
					{#each recentActivities as activity}
						{@const ActivityIcon = activity.icon}
						<div class="px-6 py-4 transition-colors hover:bg-base-200/50">
							<div class="flex items-start gap-3">
								<div class="mt-0.5">
									<ActivityIcon class="h-4 w-4 text-base-content/40" />
								</div>
								<div class="flex-1">
									<div class="text-sm font-medium text-base-content">{activity.action}</div>
									<div class="mt-1 text-xs text-base-content/60">{activity.template}</div>
								</div>
								<div class="text-xs text-base-content/50 tabular-nums">{activity.time}</div>
							</div>
						</div>
					{/each}
				</div>
			</div>
		</div>

		<!-- Monthly Trends Chart -->
		<div class="mt-8 border border-base-300 bg-base-100 p-6">
			<div class="mb-4 flex items-center justify-between">
				<h3 class="text-sm font-semibold text-base-content">Monthly Trends</h3>
				<div class="flex gap-2">
					<button class="rounded bg-base-200 px-3 py-1 text-xs font-medium text-base-content">
						12 Months
					</button>
					<button
						class="rounded px-3 py-1 text-xs font-medium text-base-content/60 hover:bg-base-200"
					>
						6 Months
					</button>
					<button
						class="rounded px-3 py-1 text-xs font-medium text-base-content/60 hover:bg-base-200"
					>
						3 Months
					</button>
				</div>
			</div>
			<div class="h-64">
				<ChartD3Line data={monthlyTrends} labels={monthLabels} height={256} />
			</div>
		</div>
	</main>
</div>

<style>
	/* Tabular numbers for consistent digit width */
	.tabular-nums {
		font-variant-numeric: tabular-nums;
	}
</style>
