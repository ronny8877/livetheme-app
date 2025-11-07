<script lang="ts">
	// Array of inspirational quotes
	const quotes = [
		'The best time to start was yesterday. The next best time is now.',
		"Life is what happens when you're busy making other plans.",
		'Success is not final, failure is not fatal: It is the courage to continue that counts.',
		'It does not matter how slowly you go as long as you do not stop.',
		'The only way to do great work is to love what you do.',
		"Believe you can and you're halfway there.",
		"Everything you've ever wanted is on the other side of fear.",
		'Your inbox is empty. Time to make something amazing!'
	];

	let time = $state(new Date());
	let is24Hour = $state(false);
	let currentQuote = $state(quotes[Math.floor(Math.random() * quotes.length)]);

	$effect(() => {
		const timer = setInterval(() => {
			time = new Date();
		}, 1000);

		// Rotate quotes every 30 seconds
		const quoteTimer = setInterval(() => {
			currentQuote = quotes[Math.floor(Math.random() * quotes.length)];
		}, 30000);

		return () => {
			clearInterval(timer);
			clearInterval(quoteTimer);
		};
	});

	function formatTime(date: Date, use24Hour: boolean): string {
		let hours = date.getHours();
		const minutes = date.getMinutes();
		const seconds = date.getSeconds();

		if (!use24Hour && hours > 12) {
			hours -= 12;
		} else if (!use24Hour && hours === 0) {
			hours = 12;
		}

		const formattedHours = hours.toString().padStart(2, '0');
		const formattedMinutes = minutes.toString().padStart(2, '0');
		const formattedSeconds = seconds.toString().padStart(2, '0');

		return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
	}

	function formatDate(date: Date): string {
		const options: Intl.DateTimeFormatOptions = {
			weekday: 'long',
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		};

		return date.toLocaleDateString(undefined, options);
	}

	function greeting(): string {
		const hours = time.getHours();
		if (hours < 12) return 'Good Morning!';
		if (hours < 18) return 'Good Afternoon!';
		return 'Good Evening!';
	}

	$effect(() => {
		const formattedTime = formatTime(time, is24Hour);
		const formattedDate = formatDate(time);
		const amPm = !is24Hour ? (time.getHours() >= 12 ? 'PM' : 'AM') : '';
	});

	let formattedTime = $derived(formatTime(time, is24Hour));
	let formattedDate = $derived(formatDate(time));
	let amPm = $derived(!is24Hour ? (time.getHours() >= 12 ? 'PM' : 'AM') : '');
</script>

<div class="font-body hero h-full">
	<div class="hero-content text-center">
		<div class="max-w-md lg:max-w-lg">
			<div class="mb-4 lg:mb-6">
				<h1 class="font-heading text-2xl font-bold text-base-content/70 lg:text-4xl">
					{greeting()}
				</h1>
			</div>

			<div class="p-6 lg:p-8">
				<div class="flex items-end justify-center">
					<div class="font-mono text-5xl leading-none font-bold text-primary lg:text-8xl">
						{formattedTime}
					</div>
					{#if !is24Hour}
						<div class="mb-2 ml-2 text-lg text-base-content/60 lg:mb-6 lg:text-2xl">
							{amPm}
						</div>
					{/if}
				</div>

				<div
					class="mt-4 flex flex-col items-center gap-4 lg:mt-6 lg:flex-row lg:justify-between lg:gap-0"
				>
					<div class="order-2 text-sm text-base-content/70 lg:order-1 lg:text-base">
						{formattedDate}
					</div>

					<div class="btn-group order-1 lg:order-2">
						<button
							onclick={() => (is24Hour = false)}
							class={`btn btn-sm ${!is24Hour ? 'btn-primary' : 'btn-ghost'}`}
							aria-label="Switch to 12-hour format"
						>
							12h
						</button>
						<button
							onclick={() => (is24Hour = true)}
							class={`btn btn-sm ${is24Hour ? 'btn-primary' : 'btn-ghost'}`}
							aria-label="Switch to 24-hour format"
						>
							24h
						</button>
					</div>
				</div>

				<div class="mt-6 flex min-h-16 items-center justify-center lg:mt-8">
					<p
						class="px-4 text-sm text-base-content/60 italic transition-opacity duration-500 lg:text-base"
					>
						"{currentQuote}"
					</p>
				</div>
			</div>
		</div>
	</div>
</div>
