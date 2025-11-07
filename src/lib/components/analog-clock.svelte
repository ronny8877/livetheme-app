<script lang="ts">
	import { onMount } from 'svelte';

	type Props = {
		/**
		 * Overall square size for the clock. If provided, both width and height use this value.
		 * Can be a number (pixels) or any CSS length/expression (e.g. "clamp(240px, 40vw, 560px)").
		 */
		size?: number | string;
		/** Optional explicit width; overrides size for width only */
		width?: number | string;
		/** Optional explicit height; overrides size for height only */
		height?: number | string;
		/** Optional multiplier to make hands thicker/thinner without affecting layout */
		thicknessFactor?: number;
		/** Additional CSS classes to apply to the root element */
		class?: string;
	};

	let { size = 200, width, height, thicknessFactor = 1, class: className = '' }: Props = $props();

	let rootEl: HTMLDivElement;
	let hourEl: HTMLDivElement;
	let minuteEl: HTMLDivElement;

	const finalWidth: number | string = $derived(width ?? height ?? size);
	const finalHeight: number | string = $derived(height ?? width ?? size);
	const thickScale: number = $derived(Math.max(0.5, Math.min(2.5, Number(thicknessFactor) || 1)));

	let resizeObs: ResizeObserver | undefined;
	let timeoutId: number | undefined;
	let minuteInterval: number | undefined;

	function updateOrbit() {
		const el = rootEl;
		if (!el) return;
		const rect = el.getBoundingClientRect();
		const minSide = Math.min(rect.width, rect.height);
		const r = Math.max(18, minSide * 0.34);
		el.style.setProperty('--sizePx', `${Math.round(minSide)}px`);
		el.style.setProperty('--orbit', `${Math.round(r)}px`);
		// Scale clock parts relative to a design base of 260px
		const base = 260; // matches previous default visual size
		const scale = Math.max(0.5, Math.min(4, minSide / base));
		el.style.setProperty('--scale', String(scale));
	}

	function syncSecondDelay() {
		const el = rootEl;
		if (!el) return;
		const now = new Date();
		const seconds = now.getSeconds() + now.getMilliseconds() / 1000;
		el.style.setProperty('--sec-delay', `-${seconds}s`);
	}

	function setAngles() {
		const now = new Date();
		const minutes = now.getMinutes();
		const hours = (now.getHours() % 12) + minutes / 60;
		hourEl?.style.setProperty('--angle', `${hours * 30}deg`);
		minuteEl?.style.setProperty('--angle', `${minutes * 6}deg`);
	}

	onMount(() => {
		updateOrbit();
		syncSecondDelay();
		setAngles();

		if (typeof ResizeObserver !== 'undefined' && rootEl) {
			resizeObs = new ResizeObserver(updateOrbit);
			resizeObs.observe(rootEl);
		} else {
			window.addEventListener('resize', updateOrbit);
		}

		const now = new Date();
		const msToNextMinute = (60 - now.getSeconds()) * 1000 - now.getMilliseconds();
		const to = window.setTimeout(
			() => {
				setAngles();
				minuteInterval = window.setInterval(setAngles, 60 * 1000) as unknown as number;
			},
			Math.max(0, msToNextMinute)
		);
		timeoutId = to as unknown as number;

		return () => {
			resizeObs?.disconnect();
			if (timeoutId) window.clearTimeout(timeoutId);
			if (minuteInterval) window.clearInterval(minuteInterval);
			window.removeEventListener('resize', updateOrbit);
		};
	});
</script>

<div
	class="clock {className}"
	id="analogClock"
	bind:this={rootEl}
	style="display:block; width:{finalWidth}; height:{finalHeight}; position:relative; --thickScale:{thickScale}"
	aria-hidden={false}
>
	<svg
		fill="none"
		height="100%"
		viewBox="0 0 461 461"
		width="100%"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			class="bgLightTint"
			clip-rule="evenodd"
			fill-rule="evenodd"
			d="M93.6379 63.9405C89.7543 78.4344 78.4333 89.7554 63.9394 93.639l-7.4405 1.9937c-22.4055 6.0033-35.702 29.0333-29.6984 51.4393l1.9196 7.164c3.8837 14.494-.2601 29.959-10.8704 40.569l-5.5482 5.548c-16.402 16.402-16.402 42.995 0 59.397l5.6221 5.622c10.6102 10.611 14.754 26.075 10.8704 40.569l-1.9936 7.441c-6.0036 22.405 7.2929 45.435 29.6985 51.439l7.4406 1.994c14.4939 3.883 25.8149 15.204 29.6985 29.698l1.9942 7.443c6.0038 22.405 29.0338 35.702 51.4388 29.698l7.442-1.994c14.494-3.883 29.959.26 40.569 10.871l5.271 5.271c16.402 16.402 42.995 16.402 59.397 0l5.347-5.347c10.61-10.61 26.075-14.754 40.569-10.87l7.717 2.068c22.405 6.003 45.435-7.293 51.439-29.699l1.993-7.439c3.884-14.494 15.205-25.815 29.699-29.699l7.441-1.994c22.406-6.003 35.702-29.033 29.699-51.439l-2.068-7.718c-3.884-14.493.26-29.958 10.87-40.569l5.346-5.346c16.402-16.402 16.402-42.995 0-59.397l-5.272-5.272c-10.61-10.61-14.754-26.075-10.87-40.569l1.994-7.441c6.003-22.406-7.293-45.436-29.699-51.4398l-7.441-1.9939c-14.494-3.8836-25.815-15.2046-29.699-29.6984l-1.993-7.4395c-6.004-22.4056-29.034-35.702-51.439-29.6985l-7.441 1.9937c-14.494 3.8836-29.959-.2601-40.569-10.8704l-5.623-5.6227c-16.402-16.402-42.995-16.402-59.397 0l-5.547 5.5476c-10.61 10.6102-26.075 14.754-40.569 10.8704l-7.166-1.92c-22.405-6.0036-45.435 7.2929-51.4388 29.6985l-1.9943 7.4425Z"
		/>
	</svg>

	<div class="sui" id="hour" bind:this={hourEl}></div>
	<div class="sui" id="second"></div>
	<div class="sui" id="minute" bind:this={minuteEl}></div>
</div>

<style>
	.clock {
		position: relative;
		aspect-ratio: 1/1;
		/* Use DaisyUI palette tokens */
		--clock-face: var(--color-base-300);
		--hand: var(--color-primary);
		--hand-dark: color-mix(in oklab, var(--color-primary) 70%, black);
		--orbit: 150px;
		--sec-delay: 0s;
		/* Scale factor set by component based on rendered size */
		--scale: 1;
		/* Optional scale from component */
		--thickScale: var(--thickScale, 1);
		/* Derived thickness for hands, scales with actual size and optional factor */
		/* Keep a safe minimum so hands never vanish */
		--thick: clamp(6px, calc(var(--sizePx, 260px) * 0.03 * var(--thickScale)), 34px);
		/* Convenience: radius from computed size */
		--radius: calc(var(--sizePx, 260px) * 0.5);
		/* Separate thickness per hand so hour can be bolder than minute */
		--thickHourScale: 1.15;
		--thickMinuteScale: 0.85;
		--thickHour: calc(var(--thick) * var(--thickHourScale));
		--thickMinute: calc(var(--thick) * var(--thickMinuteScale));
	}

	.clock svg {
		position: absolute;
		inset: 0;
	}

	.clock .bgLightTint {
		fill: var(--clock-face);
	}

	.clock .sui {
		--angle: 0deg;
		position: absolute;
		left: 50%;
		top: 50%;
		transform-origin: 50% 100%;
		z-index: 1;
	}

	/* Hour hand: short and thick rounded */
	.clock #hour {
		/* thickness adapts with size but stays within a sensible range */
		width: var(--thickHour);
		/* hour length = 60% of radius; cap to radius - half thickness */
		height: min(calc(var(--radius) * 0.6), calc(var(--radius) - var(--thickHour) * 0.5));
		background: var(--hand-dark);
		border-radius: 999px;
		transform: translate(-50%, -100%) rotate(var(--angle));
		transition: transform 0.25s linear;
		box-shadow: 0 calc(var(--thickHour) * 0.4) calc(var(--thickHour) * 0.7) rgba(0, 0, 0, 0.06);
	}

	/* Minute hand: tapered by using a pseudo element for the longer triangular style */
	.clock #minute {
		width: var(--thickMinute);
		/* container height slightly longer than visible part */
		height: min(calc(var(--radius) * 1.05), calc(var(--radius) * 1.8 - var(--thickMinute)));
		background: transparent;
		transform: translate(-50%, -100%) rotate(var(--angle));
		transition: transform 0.1s linear;
	}

	.clock #minute::before {
		content: '';
		position: absolute;
		left: 50%;
		bottom: 0;
		width: var(--thickMinute);
		/* minute visible length = 70% of radius; cap to radius */
		height: min(calc(var(--radius) * 0.7), calc(var(--radius) - var(--thickMinute) * 0.5));
		background: var(--hand);
		border-radius: calc(var(--thickMinute) * 0.75);
		transform: translateX(-50%);
		box-shadow: 0 calc(var(--thickMinute) * 0.4) calc(var(--thickMinute) * 0.7) rgba(0, 0, 0, 0.06);
	}

	/* Second indicator: an orbiting dot rather than a long hand */
	.clock #second {
		width: clamp(6px, calc(var(--sizePx, 260px) * 0.02), 16px);
		height: clamp(6px, calc(var(--sizePx, 260px) * 0.02), 16px);
		transform-origin: 50% 50%;
		transform: translate(-50%, -50%);
		animation: clock-rotate 60s linear infinite;
		animation-delay: var(--sec-delay);
	}

	.clock #second::before {
		content: '';
		position: absolute;
		left: 50%;
		top: 50%;
		width: clamp(12px, calc(var(--sizePx, 260px) * 0.06), 32px);
		height: clamp(12px, calc(var(--sizePx, 260px) * 0.06), 32px);
		background: var(--hand);
		border-radius: 50%;
		/* Place the dot on the left orbit similar to screenshot */
		transform: translate(calc(-1 * var(--orbit)), -50%);
	}

	/* Ensure seconds dot is under the center cap so it appears anchored */
	.clock #second {
		z-index: 2;
	}
	.clock #hour,
	.clock #minute {
		z-index: 1;
	}

	@keyframes clock-rotate {
		from {
			transform: translate(-50%, -50%) rotate(0deg);
		}
		to {
			transform: translate(-50%, -50%) rotate(360deg);
		}
	}
</style>
