<script lang="ts">
	import { templates_catalog, templates_ui } from '$lib/store/templates.svelte';
	import { Sparkles } from '@lucide/svelte';
	import AnalogClock from '../components/analog-clock.svelte';

	let now = $state(new Date());
	let timer: ReturnType<typeof setInterval> | null = null;
	$effect(() => {
		timer = setInterval(() => (now = new Date()), 1000);
		return () => timer && clearInterval(timer);
	});

	// Pomodoro Timer functionality
	type PomodoroMode = 'focus' | 'short-break' | 'long-break';
	type PomodoroSession = {
		mode: PomodoroMode;
		duration: number;
		completedAt: number;
	};

	const POMODORO_DURATIONS = {
		focus: 25 * 60, // 25 minutes
		'short-break': 5 * 60, // 5 minutes
		'long-break': 15 * 60 // 15 minutes
	};

	let pomodoroMode = $state<PomodoroMode>('focus');
	let timerSeconds = $state(POMODORO_DURATIONS.focus);
	let timerRunning = $state(false);
	let timerInterval: ReturnType<typeof setInterval> | null = null;
	let completedSessions = $state<PomodoroSession[]>([]);

	// Load persisted state
	$effect(() => {
		if (typeof window === 'undefined') return;
		try {
			const raw = localStorage.getItem('lt-pomodoro');
			if (!raw) return;
			const saved = JSON.parse(raw) as {
				mode: PomodoroMode;
				seconds: number;
				sessions: PomodoroSession[];
			};
			if (saved?.mode && typeof saved.seconds === 'number') {
				pomodoroMode = saved.mode;
				timerSeconds = Math.max(0, Math.min(POMODORO_DURATIONS[saved.mode], saved.seconds));
			}
			if (Array.isArray(saved?.sessions)) completedSessions = saved.sessions;
		} catch {}
	});

	// Persist on change
	$effect(() => {
		if (typeof window === 'undefined') return;
		const data = JSON.stringify({
			mode: pomodoroMode,
			seconds: timerSeconds,
			sessions: completedSessions
		});
		localStorage.setItem('lt-pomodoro', data);
	});

	function toggleTimer() {
		if (timerRunning) {
			if (timerInterval) clearInterval(timerInterval);
			timerInterval = null;
			timerRunning = false;
		} else {
			// Ask for notifications once when starting
			if (typeof Notification !== 'undefined' && Notification.permission === 'default') {
				Notification.requestPermission().catch(() => {});
			}
			timerRunning = true;
			timerInterval = setInterval(() => {
				timerSeconds--;
				if (timerSeconds <= 0) {
					completeSession();
				}
			}, 1000);
		}
	}

	function completeSession() {
		if (timerInterval) clearInterval(timerInterval);
		timerInterval = null;
		timerRunning = false;

		// Save completed session
		completedSessions = [
			...completedSessions,
			{
				mode: pomodoroMode,
				duration: POMODORO_DURATIONS[pomodoroMode],
				completedAt: Date.now()
			}
		];

		// Auto-switch to next mode
		if (pomodoroMode === 'focus') {
			const focusSessions = completedSessions.filter((s) => s.mode === 'focus').length;
			if (focusSessions % 4 === 0) {
				switchMode('long-break');
			} else {
				switchMode('short-break');
			}
		} else {
			switchMode('focus');
		}

		// Play completion sound (optional - browser notification)
		if ('Notification' in window && Notification.permission === 'granted') {
			new Notification('Pomodoro Complete!', {
				body: `${pomodoroMode === 'focus' ? 'Focus session' : 'Break'} completed. Time for ${pomodoroMode === 'focus' ? 'a break' : 'focus'}!`,
				icon: '/favicon.png'
			});
		}
	}

	function switchMode(mode: PomodoroMode) {
		pomodoroMode = mode;
		timerSeconds = POMODORO_DURATIONS[mode];
		if (timerInterval) clearInterval(timerInterval);
		timerInterval = null;
		timerRunning = false;
	}

	function resetTimer() {
		if (timerInterval) clearInterval(timerInterval);
		timerInterval = null;
		timerRunning = false;
		timerSeconds = POMODORO_DURATIONS[pomodoroMode];
	}

	const timerDisplay = $derived.by(() => {
		const mins = Math.floor(timerSeconds / 60);
		const secs = timerSeconds % 60;
		return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
	});

	const progressPercentage = $derived.by(() => {
		const total = POMODORO_DURATIONS[pomodoroMode];
		return ((total - timerSeconds) / total) * 100;
	});

	const focusSessionsToday = $derived(completedSessions.filter((s) => s.mode === 'focus').length);

	const modeConfig = $derived.by(() => {
		const configs = {
			focus: {
				label: 'Focus Time',
				emoji: '🎯',
				color: 'text-error',
				bgColor: 'from-error/20',
				ringColor: 'text-error'
			},
			'short-break': {
				label: 'Short Break',
				emoji: '☕',
				color: 'text-success',
				bgColor: 'from-success/20',
				ringColor: 'text-success'
			},
			'long-break': {
				label: 'Long Break',
				emoji: '🌴',
				color: 'text-info',
				bgColor: 'from-info/20',
				ringColor: 'text-info'
			}
		};
		return configs[pomodoroMode];
	});

	// Weather from Open-Meteo API (free, no API key needed)
	type WeatherData = {
		temperature: number;
		weatherCode: number;
		windSpeed: number;
		humidity: number;
	};

	let weather = $state<WeatherData | null>(null);
	let weatherLoading = $state(true);
	let locationName = $state('Fetching location...');

	async function fetchWeather() {
		try {
			// Use IP-based geolocation (no permission needed) via ipapi.co
			const ipRes = await fetch('https://ipapi.co/json/');
			const ipData = (await ipRes.json()) as any;

			const latitude = ipData.latitude || 40.7128; // Default to NYC
			const longitude = ipData.longitude || -74.006;
			locationName = ipData.city || 'New York';

			// Fetch weather data from Open-Meteo (free API, no key needed)
			const weatherRes = await fetch(
				`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code,wind_speed_10m,relative_humidity_2m&temperature_unit=celsius`
			);
			const weatherData = (await weatherRes.json()) as any;

			weather = {
				temperature: Math.round(weatherData.current.temperature_2m),
				weatherCode: weatherData.current.weather_code,
				windSpeed: weatherData.current.wind_speed_10m,
				humidity: weatherData.current.relative_humidity_2m
			};
			weatherLoading = false;
		} catch (error) {
			console.error('Weather fetch error:', error);
			weatherLoading = false;
			// Fallback to NYC weather
			locationName = 'New York';
			const hour = now.getHours();
			const isNight = hour >= 19 || hour < 6;
			weather = {
				temperature: isNight ? 18 : 24,
				weatherCode: isNight ? 0 : 1,
				windSpeed: 8,
				humidity: 60
			};
		}
	}

	$effect(() => {
		fetchWeather();
	});

	// Weather code to icon/description mapping (WMO codes)
	const getWeatherInfo = (code: number) => {
		const weatherMap: Record<number, { icon: string; desc: string }> = {
			0: { icon: '☀️', desc: 'Clear sky' },
			1: { icon: '☀️', desc: 'Mainly clear' },
			2: { icon: '⛅', desc: 'Partly cloudy' },
			3: { icon: '☁️', desc: 'Overcast' },
			45: { icon: '🌫️', desc: 'Foggy' },
			48: { icon: '🌫️', desc: 'Foggy' },
			51: { icon: '🌦️', desc: 'Light drizzle' },
			53: { icon: '🌦️', desc: 'Drizzle' },
			55: { icon: '🌧️', desc: 'Heavy drizzle' },
			61: { icon: '🌧️', desc: 'Light rain' },
			63: { icon: '🌧️', desc: 'Rain' },
			65: { icon: '🌧️', desc: 'Heavy rain' },
			71: { icon: '🌨️', desc: 'Light snow' },
			73: { icon: '🌨️', desc: 'Snow' },
			75: { icon: '🌨️', desc: 'Heavy snow' },
			77: { icon: '❄️', desc: 'Snow grains' },
			80: { icon: '🌦️', desc: 'Rain showers' },
			81: { icon: '🌧️', desc: 'Rain showers' },
			82: { icon: '⛈️', desc: 'Heavy showers' },
			85: { icon: '🌨️', desc: 'Snow showers' },
			86: { icon: '🌨️', desc: 'Heavy snow' },
			95: { icon: '⛈️', desc: 'Thunderstorm' },
			96: { icon: '⛈️', desc: 'Thunderstorm' },
			99: { icon: '⛈️', desc: 'Severe storm' }
		};
		return weatherMap[code] || { icon: '🌤️', desc: 'Fair' };
	};

	// No extra state needed for the simple theme palette

	// Template interaction - just open modal
	function viewTemplate(id: string) {
		templates_ui.is_open = true;
	}

	function openTemplates() {
		templates_ui.is_open = true;
	}

	// Featured templates (first 2)
	const featuredTemplates = $derived(templates_catalog.slice(0, 2));
</script>

<!-- Minimal Zen Showcase using DaisyUI -->
<section
	class="font-body relative flex min-h-screen w-full items-center justify-center bg-linear-to-b from-base-200 to-base-300/60"
>
	<!-- Brand badge -->
	<div class="pointer-events-none absolute top-4 left-4 z-20">
		<div class="badge gap-2 border badge-soft border-base-300 bg-base-100/80">
			<Sparkles class="h-3 w-3 text-primary" />
			<span class="font-semibold tracking-tight">LiveTheme</span>
			<span class="badge badge-ghost badge-xs">beta</span>
		</div>
	</div>
	<div class="w-full max-w-6xl px-4">
		<div class="grid items-center gap-6 md:grid-cols-12">
			<!-- Left: Clock and redesigned swatches -->
			<div class="flex flex-col gap-4 md:col-span-5">
				<div class="flex w-full">
					<AnalogClock size="min(100%, 480px)" class="mx-auto my-4 w-full max-w-[480px] md:mx-0" />
				</div>
			</div>

			<!-- Right: Pomodoro on top, Weather + Templates row below -->
			<div class="flex flex-col gap-4 md:col-span-7 md:justify-center md:self-center">
				<!-- Pomodoro (top) -->
				<div class="card border border-base-200 bg-base-100">
					<div class="card-body gap-2 p-4">
						<div class="flex w-full items-center justify-between rounded-lg bg-accent/10 p-2">
							<div>
								<div class="flex items-center gap-2">
									<span class="text-lg">{modeConfig.emoji}</span>
									<h3 class="card-title font-heading text-sm">{modeConfig.label}</h3>
								</div>
								{#if focusSessionsToday > 0}
									<div class="badge badge-ghost badge-xs">🍅 {focusSessionsToday}</div>
								{/if}
							</div>

							<div class="btn-group btn-group-sm">
								<button
									class="btn flex-1 btn-xs {pomodoroMode === 'focus' ? 'btn-error' : 'btn-ghost'}"
									onclick={() => switchMode('focus')}
									disabled={timerRunning}>Focus</button
								>
								<button
									class="btn flex-1 btn-xs {pomodoroMode === 'short-break'
										? 'btn-success'
										: 'btn-ghost'}"
									onclick={() => switchMode('short-break')}
									disabled={timerRunning}>Break</button
								>
								<button
									class="btn flex-1 btn-xs {pomodoroMode === 'long-break'
										? 'btn-info'
										: 'btn-ghost'}"
									onclick={() => switchMode('long-break')}
									disabled={timerRunning}>Long</button
								>
							</div>
						</div>

						<div class="flex flex-col items-center justify-center gap-4 py-4">
							<div class=" font-heading text-5xl tabular-nums {modeConfig.color}">
								{timerDisplay}
							</div>
							<progress class="progress w-56 progress-primary" value={progressPercentage} max="100"
							></progress>
						</div>

						<div class="flex gap-2">
							<button
								class="btn flex-1 btn-ghost btn-xs"
								onclick={resetTimer}
								disabled={timerSeconds === POMODORO_DURATIONS[pomodoroMode]}>Reset</button
							>
							<button
								class="btn flex-1 btn-xs {timerRunning
									? 'btn-neutral'
									: modeConfig.color === 'text-error'
										? 'btn-error'
										: modeConfig.color === 'text-success'
											? 'btn-success'
											: 'btn-info'}"
								onclick={toggleTimer}
							>
								{#if timerRunning}Pause{:else}Start{/if}
							</button>
						</div>
					</div>
				</div>

				<!-- Weather + Templates row -->
				<div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
					<!-- Weather -->
					<div class="card border border-base-200 bg-base-100">
						<div class="card-body flex h-full flex-col p-4">
							<div class="mb-2 flex items-center justify-between">
								<h3 class="card-title font-heading text-sm">Weather</h3>
								{#if !weatherLoading}
									<span class="badge badge-ghost badge-xs">{locationName}</span>
								{/if}
							</div>
							{#if weatherLoading}
								<div class="flex flex-1 items-center justify-center gap-3">
									<span class="loading loading-sm loading-spinner text-accent"></span>
									<span class="text-xs opacity-70">Loading…</span>
								</div>
							{:else if weather}
								<div class="flex flex-1 flex-col gap-3">
									<div class="flex items-center gap-3">
										<div class="text-3xl" aria-hidden="true">
											{getWeatherInfo(weather.weatherCode).icon}
										</div>
										<div>
											<div class="text-2xl font-bold text-accent">{weather.temperature}°C</div>
											<div class="text-xs opacity-70">
												{getWeatherInfo(weather.weatherCode).desc}
											</div>
										</div>
									</div>
									<div class="grid grid-cols-2 gap-2 text-xs">
										<div class="rounded-lg bg-base-200 p-2">
											<div class="opacity-60">Wind</div>
											<div class="font-semibold">{weather.windSpeed} km/h</div>
										</div>
										<div class="rounded-lg bg-base-200 p-2">
											<div class="opacity-60">Humidity</div>
											<div class="font-semibold">{weather.humidity}%</div>
										</div>
									</div>
								</div>
							{/if}
						</div>
					</div>

					<!-- Templates -->
					<div class="card border border-base-200 bg-base-100">
						<div class="card-body flex h-full flex-col gap-2 p-4">
							<div class="flex items-center justify-between">
								<h3 class="card-title font-heading text-sm">Templates</h3>
								<button class="btn btn-ghost btn-xs" onclick={openTemplates}>View all</button>
							</div>
							<div class="flex flex-1 flex-col gap-2 overflow-y-auto">
								{#each featuredTemplates as t (t.id)}
									<button
										class="card-compact card border-0 bg-base-200 text-left transition-colors hover:bg-base-300"
										onclick={() => viewTemplate(t.id)}
									>
										<div class="card-body p-3">
											<div class="flex items-center justify-between gap-2">
												<div class="min-w-0 flex-1">
													<div class="truncate text-xs font-medium">{t.title}</div>
													<div class="line-clamp-1 text-[10px] opacity-70">{t.description}</div>
												</div>
												<span class="text-xs opacity-60">→</span>
											</div>
										</div>
									</button>
								{/each}
							</div>
						</div>
					</div>
				</div>

				<div class="card border border-base-200 bg-base-100">
					<div class="card-body p-4">
						<div class="mb-2 flex items-center justify-between">
							<h3 class="card-title font-heading text-sm">Theme palette</h3>
						</div>
						<div class="grid grid-cols-2 gap-3 sm:grid-cols-4">
							<button
								class="rounded-lg border border-base-300 bg-base-200 p-3 text-left text-base-content transition hover:opacity-90"
								aria-label="Copy base token"
							>
								<div class="text-[10px] uppercase opacity-70">Base</div>
								<div class="text-sm font-medium">Aa</div>
							</button>
							<button
								class="rounded-lg bg-primary p-3 text-left text-primary-content transition hover:opacity-90"
								aria-label="Copy primary token"
							>
								<div class="text-[10px] uppercase opacity-80">Primary</div>
								<div class="text-sm font-medium">Aa</div>
							</button>
							<button
								class="rounded-lg bg-secondary p-3 text-left text-secondary-content transition hover:opacity-90"
								aria-label="Copy secondary token"
							>
								<div class="text-[10px] uppercase opacity-80">Secondary</div>
								<div class="text-sm font-medium">Aa</div>
							</button>
							<button
								class="rounded-lg bg-accent p-3 text-left text-accent-content transition hover:opacity-90"
								aria-label="Copy accent token"
							>
								<div class="text-[10px] uppercase opacity-80">Accent</div>
								<div class="text-sm font-medium">Aa</div>
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
