<script>
	const COLORS = ['', 'primary', 'secondary', 'accent', 'info', 'success', 'warning', 'error'];
	const SIZES = ['xl', 'lg', 'md', 'sm', 'xs'];

	const componentGrid = {
		button: {
			element: 'button',
			icon: true,
			baseClass: 'btn',
			colors: COLORS.map((c) => (c ? `btn-${c}` : '')),
			sizes: SIZES.map((s) => `btn-${s}`),
			label: 'Button',
			attributes: {}
		},
		badge: {
			element: 'button',
			icon: true,
			baseClass: 'badge',
			colors: COLORS.slice(0, -1).map((c) => (c ? `badge-${c}` : '')),
			sizes: SIZES.map((s) => `badge-${s}`),
			label: 'Badge',
			attributes: {}
		},
		input: {
			element: 'input',
			icon: false,
			baseClass: 'input max-w-32',
			colors: COLORS.map((c) => (c ? `input-${c}` : '')),
			sizes: SIZES.map((s) => `input-${s}`),
			label: false,
			attributes: { type: 'text', placeholder: 'Input' }
		},
		toggle: {
			element: 'input',
			icon: false,
			baseClass: 'toggle',
			colors: COLORS.map((c) => (c ? `toggle-${c}` : '')),
			sizes: SIZES.map((s) => `toggle-${s}`),
			label: false,
			attributes: { type: 'checkbox', checked: 'checked' }
		},
		checkbox: {
			element: 'input',
			icon: false,
			baseClass: 'checkbox',
			colors: COLORS.map((c) => (c ? `checkbox-${c}` : '')),
			sizes: SIZES.map((s) => `checkbox-${s}`),
			label: false,
			attributes: { type: 'checkbox', checked: 'checked' }
		},
		radio: {
			element: 'input',
			icon: false,
			baseClass: 'radio',
			colors: COLORS.map((c) => (c ? `radio-${c}` : '')),
			sizes: SIZES.map((s) => `radio-${s}`),
			label: false,
			attributes: { type: 'radio', checked: 'checked' }
		},
		alert: {
			element: 'div',
			icon: true,
			baseClass: 'alert w-full',
			colors: ['alert-info', 'alert-success', 'alert-warning', 'alert-error'],
			sizes: [''],
			label: '4 Messages',
			attributes: {}
		}
	};

	let sliderValue = $state(50);
	let previewtabs = $state('Daisy UI Components');
</script>

<div
	class={`mx-auto my-8 max-w-6xl rounded-box bg-base-200 pt-6 text-base-content transition-colors duration-500`}
>
	<div class="flex items-center justify-between gap-4 px-8 ps-10">
		<h2 class="font-title text-lg md:max-lg:hidden">{previewtabs}</h2>
		<div class="tabs-box tabs inline-flex bg-base-300 tabs-sm">
			<label class="tab" title="Daisy UI Components">
				<input
					aria-label="Daisy UI Components"
					name="previewtabs"
					type="radio"
					value="Daisy UI Components"
					bind:group={previewtabs}
				/>
				<svg class="size-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
					<g
						stroke-linejoin="round"
						stroke-linecap="round"
						stroke-width="2"
						fill="none"
						stroke="currentColor"
					>
						<rect width="7" height="9" x="3" y="3" rx="1"> </rect>
						<rect width="7" height="5" x="14" y="3" rx="1"> </rect>
						<rect width="7" height="9" x="14" y="12" rx="1"> </rect>
						<rect width="7" height="5" x="3" y="16" rx="1"> </rect>
					</g>
				</svg>
			</label>
			<label class="tab" title="Component Variants">
				<input
					aria-label="Component Variants"
					name="previewtabs"
					type="radio"
					value="Component Variants"
					bind:group={previewtabs}
				/>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="size-4"
					><g
						stroke-linejoin="round"
						stroke-linecap="round"
						stroke-width="2.5"
						fill="none"
						stroke="currentColor"
						><path d="M4 6l5.5 0"></path><path d="M4 10l5.5 0"></path><path d="M4 14l5.5 0"
						></path><path d="M4 18l5.5 0"></path><path d="M14.5 6l5.5 0"></path><path
							d="M14.5 10l5.5 0"
						></path><path d="M14.5 14l5.5 0"></path><path d="M14.5 18l5.5 0"></path></g
					></svg
				>
			</label>
		</div>
	</div>
	<div class="px-8 py-6">
		{#if previewtabs === 'Daisy UI Components'}
			<div
				class="mx-auto grid gap-6 pb-20 text-base-content sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3"
			>
				<div class="flex flex-col gap-4">
					<!-- Buttons Grid -->
					<div class="card border-base-300 bg-base-100 card-sm card-border">
						<div class="card-body gap-4">
							<h3 class="font-semibold">Button States</h3>
							<div class="flex flex-wrap gap-2">
								<button class="btn btn-primary">Primary</button>
								<button class="btn btn-secondary">Secondary</button>
								<button class="btn btn-accent">Accent</button>
								<button class="btn btn-outline">Outline</button>
							</div>
						</div>
					</div>

					<!-- Rating & Status -->
					<div class="card border-base-300 bg-base-100 card-sm card-border">
						<div class="card-body gap-4">
							<h3 class="font-semibold">Rating & Status Badges</h3>
							<div class="flex flex-col gap-3">
								<div class="flex items-center gap-3">
									<div class="rating-sm rating">
										{#each [1, 2, 3, 4, 5] as i}
											<input
												type="radio"
												name="rating"
												class="mask bg-orange-400 mask-star-2"
												checked={i === 5}
											/>
										{/each}
									</div>
									<span class="text-sm">5 stars</span>
								</div>
								<div class="flex flex-wrap gap-2">
									<div class="badge badge-success">Online</div>
									<div class="badge badge-warning">Pending</div>
									<div class="badge badge-error">Offline</div>
									<div class="badge badge-info">Info</div>
								</div>
							</div>
						</div>
					</div>

					<!-- Form Controls -->
					<div class="card border-base-300 bg-base-100 card-sm card-border">
						<div class="card-body gap-3">
							<h3 class="font-semibold">Form Controls</h3>
							<div class="flex items-center gap-2">
								<input type="checkbox" class="checkbox checkbox-sm" />
								<span class="text-sm">Checkbox</span>
							</div>
							<div class="flex items-center gap-2">
								<input type="radio" name="demo" class="radio radio-sm" />
								<span class="text-sm">Radio</span>
							</div>
							<div class="flex items-center gap-2">
								<input type="checkbox" class="toggle toggle-sm" />
								<span class="text-sm">Toggle</span>
							</div>
						</div>
					</div>

					<!-- Breadcrumbs & Links -->
					<div class="card border-base-300 bg-base-100 card-sm card-border">
						<div class="card-body gap-3">
							<h3 class="font-semibold">Navigation</h3>
							<div class="breadcrumbs text-sm">
								<ul>
									<li><a href="/">Home</a></li>
									<li><a href="/components">Components</a></li>
									<li>DaisyUI</li>
								</ul>
							</div>
							<div class="flex gap-2">
								<a href="/docs" class="link link-primary">Primary Link</a>
								<a href="/examples" class="link link-hover">Hover Link</a>
							</div>
						</div>
					</div>

					<!-- Range Slider -->
					<div class="card border-base-300 bg-base-100 card-sm card-border">
						<div class="card-body gap-3">
							<h3 class="font-semibold">Price Range: ${sliderValue}</h3>
							<input
								type="range"
								class="range range-sm"
								bind:value={sliderValue}
								min="0"
								max="100"
							/>
							<div class="flex justify-between text-xs opacity-60">
								<span>$0</span>
								<span>$100</span>
							</div>
						</div>
					</div>

					<!-- Product Card -->
					<div class="card border-base-300 bg-base-100 card-sm card-border">
						<figure class="p-3">
							<img
								class="h-32 w-full rounded-box object-cover"
								src="https://i.pinimg.com/736x/ba/92/7f/ba927ff34cd961ce2c184d47e8ead9f6.jpg"
								alt="Product"
							/>
						</figure>
						<div class="card-body gap-2">
							<div class="flex items-start justify-between">
								<h3 class="font-semibold">Premium Item</h3>
								<span class="badge badge-sm badge-success">Sale</span>
							</div>
							<div class="flex items-center gap-2 text-sm">
								<div class="rating-xs rating">
									{#each [1, 2, 3, 4, 5] as i}
										<input
											type="radio"
											name="prod-rating"
											class="mask bg-orange-400 mask-star-2"
											checked={i === 5}
										/>
									{/each}
								</div>
								<span class="text-xs opacity-60">(120)</span>
							</div>
							<div class="flex items-baseline gap-2">
								<span class="text-lg font-bold">$89</span>
								<span class="text-sm line-through opacity-60">$120</span>
							</div>
						</div>
					</div>

					<!-- Search & Input -->
					<div class="card border-base-300 bg-base-100 card-sm card-border">
						<div class="card-body gap-3">
							<h3 class="font-semibold">Search</h3>
							<label class="input-bordered input input-sm flex items-center gap-2">
								<input type="text" class="grow" placeholder="Search..." />
								<button class="btn btn-ghost btn-xs">Search</button>
							</label>
						</div>
					</div>

					<!-- Simple Form -->
					<div class="card border-base-300 bg-base-100 card-sm card-border">
						<div class="card-body gap-3">
							<h3 class="font-semibold">Subscribe</h3>
							<input
								type="email"
								placeholder="Email address"
								class="input-bordered input input-sm"
							/>
							<label class="flex items-center gap-2 text-sm">
								<input type="checkbox" class="checkbox checkbox-sm" />
								<span>Subscribe to updates</span>
							</label>
							<button class="btn btn-sm btn-primary">Subscribe</button>
						</div>
					</div>

					<!-- Masks -->
					<div class="card border-base-300 bg-base-100 card-sm card-border">
						<div class="card-body gap-3">
							<h3 class="font-semibold">Masks</h3>
							<div class="flex gap-2">
								<div class="mask h-12 w-12 bg-primary mask-circle"></div>
								<div class="mask h-12 w-12 bg-secondary mask-squircle"></div>
								<div class="mask h-12 w-12 bg-accent mask-hexagon"></div>
								<div class="mask h-12 w-12 bg-info mask-star"></div>
							</div>
						</div>
					</div>
				</div>
				<div class="flex flex-col gap-4">
					<div class="card border-base-300 bg-base-100 card-sm card-border">
						<div class="card-body gap-3">
							<h3 class="font-semibold">Skeleton</h3>
							<div class="h-4 w-full skeleton"></div>
							<div class="h-4 w-5/6 skeleton"></div>
							<div class="flex gap-2">
								<div class="h-12 w-12 skeleton rounded-full"></div>
								<div class="flex-1 space-y-2">
									<div class="h-3 w-full skeleton"></div>
									<div class="h-3 w-3/4 skeleton"></div>
								</div>
							</div>
						</div>
					</div>
					<!-- Simple Chart -->
					<div class="card border-base-300 bg-base-100 card-sm card-border">
						<div class="card-body gap-3">
							<h3 class="font-semibold">Activity</h3>
							<div class="flex h-20 items-end gap-1">
								{#each [10, 20, 15, 25, 30, 20, 35] as height}
									<div class="flex-1 rounded bg-primary" style="height: {height}%"></div>
								{/each}
							</div>
							<p class="text-xs opacity-60">7 day average: +12% from last week</p>
						</div>
					</div>

					<!-- Stats Cards -->
					<div class="grid grid-cols-2 gap-3">
						<div class="card border-base-300 bg-base-100 card-sm card-border">
							<div class="card-body gap-1">
								<p class="text-xs opacity-60">Total Users</p>
								<p class="text-2xl font-bold">12.5K</p>
								<p class="text-xs text-success">+5% this month</p>
							</div>
						</div>
						<div class="card border-base-300 bg-base-100 card-sm card-border">
							<div class="card-body gap-1">
								<p class="text-xs opacity-60">Revenue</p>
								<p class="text-2xl font-bold">$45K</p>
								<p class="text-xs text-success">+12% this week</p>
							</div>
						</div>
					</div>

					<!-- List/Table -->
					<div class="card border-base-300 bg-base-100 card-sm card-border">
						<div class="card-body gap-3">
							<h3 class="font-semibold">Recent Activity</h3>
							<div class="space-y-2 text-sm">
								<div class="flex justify-between">
									<span>Alice Johnson</span>
									<span class="badge badge-xs badge-success">Completed</span>
								</div>
								<div class="flex justify-between">
									<span>Bob Smith</span>
									<span class="badge badge-xs badge-warning">Pending</span>
								</div>
								<div class="flex justify-between">
									<span>Carol Davis</span>
									<span class="badge badge-xs badge-error">Failed</span>
								</div>
							</div>
						</div>
					</div>

					<!-- Collapse/Accordion -->
					<div class="card border-base-300 bg-base-100 card-sm card-border">
						<div class="card-body">
							<div class="collapse-arrow collapse border border-base-300">
								<input type="radio" name="accordion" />
								<div class="collapse-title font-semibold">Feature 1</div>
								<div class="collapse-content">
									<p class="text-sm">This section contains detailed information about feature 1</p>
								</div>
							</div>
							<div class="collapse-arrow collapse border border-base-300">
								<input type="radio" name="accordion" />
								<div class="collapse-title font-semibold">Feature 2</div>
								<div class="collapse-content">
									<p class="text-sm">This section contains detailed information about feature 2</p>
								</div>
							</div>
						</div>
					</div>

					<!-- Text Editor -->
					<div class="card border-base-300 bg-base-100 card-sm card-border">
						<div class="card-body gap-3">
							<h3 class="font-semibold">Message</h3>
							<textarea
								class="textarea-bordered textarea textarea-sm"
								placeholder="Write your message..."
							></textarea>
							<div class="card-actions gap-2">
								<button class="btn btn-sm">Cancel</button>
								<button class="btn btn-sm btn-primary">Send</button>
							</div>
						</div>
					</div>

					<!-- Chat -->
					<div class="card border-base-300 bg-base-100 card-sm card-border">
						<div class="card-body max-h-64 gap-3 overflow-y-auto">
							<h3 class="font-semibold">Chat</h3>
							<div class="chat-start chat">
								<div class="chat-bubble chat-bubble-primary text-sm">Hello! How can I help?</div>
							</div>
							<div class="chat-end chat">
								<div class="chat-bubble text-sm">I need help with the component</div>
							</div>
							<div class="chat-start chat">
								<div class="chat-bubble chat-bubble-primary text-sm">Sure! Let me assist you.</div>
							</div>
						</div>
						<div class="border-t border-base-300 p-3">
							<input
								type="text"
								placeholder="Type message..."
								class="input-bordered input input-sm w-full"
							/>
						</div>
					</div>

					<!-- Menu Navigation -->
					<div class="card border-base-300 bg-base-100 card-border">
						<ul class="menu menu-sm">
							<li class="menu-title"><span>Dashboard</span></li>
							<li><a href="/">Home</a></li>
							<li><a href="/settings">Settings</a></li>
							<li><a href="/profile">Profile</a></li>
							<li><a href="/logout">Logout</a></li>
						</ul>
					</div>

					<!-- Avataar -->
					<div class="card border-base-300 bg-base-100 card-border">
						<div class="avatar-group -space-x-6">
							<div class="avatar">
								<div class="w-12">
									<img
										src="https://i.pinimg.com/736x/98/05/9d/98059dee6cccef98a61be71abcd7c4ac.jpg"
									/>
								</div>
							</div>
							<div class="avatar">
								<div class="w-12">
									<img
										src="https://i.pinimg.com/736x/13/c2/02/13c20294f8ed75b30a87c8c045650536.jpg"
									/>
								</div>
							</div>
							<div class="avatar">
								<div class="w-12">
									<img src="https://media.tenor.com/FDkNy_ytUnAAAAAi/silly-cat-eating-chips.gif" />
								</div>
							</div>
							<div class="avatar avatar-placeholder">
								<div class="w-12 bg-neutral text-neutral-content">
									<span>+99</span>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="flex flex-col gap-4">
					<!-- Code Block -->
					<div class="card border-base-300 bg-base-100 card-sm card-border">
						<div class="mockup-code text-sm">
							<pre data-prefix="$"><code>npm install daisyui</code></pre>
							<pre data-prefix=">"><code>added 45 packages</code></pre>
							<pre data-prefix=">"><code>Done! ✓</code></pre>
						</div>
					</div>

					<!-- Alerts Stack -->
					<div class="space-y-2">
						<div class="alert text-sm alert-info">
							<span>Info: Your session is active</span>
						</div>
						<div class="alert text-sm alert-success">
							<span>Success: Changes saved</span>
						</div>
						<div class="alert text-sm alert-warning">
							<span>Warning: Nearing storage limit</span>
						</div>
						<div class="alert text-sm alert-error">
							<span>Error: Connection failed</span>
						</div>
					</div>

					<!-- Steps/Progress -->
					<div class="card border-base-300 bg-base-100 card-sm card-border">
						<div class="card-body gap-3">
							<h3 class="font-semibold">Progress</h3>
							<ul class="steps steps-vertical w-full">
								<li class="step step-primary">Design</li>
								<li class="step step-primary">Development</li>
								<li class="step">Testing</li>
								<li class="step">Deploy</li>
							</ul>
						</div>
					</div>

					<!-- Pricing Card -->
					<div class="card border-base-300 bg-base-100 card-sm card-border">
						<div class="card-body gap-3">
							<h3 class="font-semibold">Pricing Plan</h3>
							<div class="flex items-center justify-between">
								<div>
									<p class="text-xs opacity-60">Pro Plan</p>
									<p class="text-2xl font-bold">$29<span class="text-sm opacity-60">/mo</span></p>
								</div>
								<span class="badge badge-warning">Popular</span>
							</div>
							<ul class="space-y-1 text-sm">
								<li class="flex gap-2"><span class="text-success">✓</span> 100 Projects</li>
								<li class="flex gap-2"><span class="text-success">✓</span> API Access</li>
								<li class="flex gap-2"><span class="text-success">✓</span> Priority Support</li>
							</ul>
							<button class="btn w-full btn-sm btn-primary">Get Started</button>
						</div>
					</div>

					<!-- Text Styles -->
					<div class="card border-base-300 bg-base-100 card-sm card-border">
						<div class="card-body gap-3">
							<h3 class="font-semibold">Typography</h3>
							<div class="space-y-2">
								<h1 class="text-lg font-bold">Heading 1</h1>
								<h2 class="text-base font-bold">Heading 2</h2>
								<p class="text-sm">Regular paragraph text</p>
								<p class="text-xs opacity-60">Small caption text</p>
								<span class="text-lg font-black">Extra Bold</span>
							</div>
						</div>
					</div>

					<!-- Spinner & Loading -->
					<div class="card border-base-300 bg-base-100 card-sm card-border">
						<div class="card-body gap-3">
							<h3 class="font-semibold">Loading States</h3>
							<div class="flex items-center justify-center gap-4 py-4">
								<span class="loading loading-lg loading-spinner"></span>
								<span class="loading loading-md loading-spinner"></span>
								<span class="loading loading-sm loading-spinner"></span>
							</div>
							<div class="flex items-center justify-center gap-2 py-2">
								<span class="loading loading-md loading-dots"></span>
							</div>
						</div>
					</div>

					<!-- Boolean Indicators -->
					<div class="card border-base-300 bg-base-100 card-sm card-border">
						<div class="card-body gap-3">
							<h3 class="font-semibold">Indicators</h3>
							<div class="flex gap-3">
								<div class="indicator">
									<span class="indicator-item badge badge-xs badge-success"></span>
									<img
										src="https://media.tenor.com/ElqtX4A6a0MAAAAi/victory.gif"
										alt="Victory"
										class="grid h-16 w-16 rounded rounded-box bg-base-300 ring ring-accent"
									/>
								</div>
								<div class="indicator">
									<span class="indicator-item badge badge-xs badge-error"></span>
									<img
										src="https://media.tenor.com/s6b_m6fCF0sAAAAi/miku-miku-dance.gif"
										class="grid h-16 w-16 rounded rounded-box bg-base-300 ring-1 ring-primary"
										alt="Dance"
									/>
								</div>
								<div class="indicator">
									<span class="indicator-item badge badge-xs badge-error"></span>
									<img
										alt="Dance"
										src="https://media1.tenor.com/m/UpfTzEfs5vIAAAAC/griddy-miku.gif"
										class="grid h-16 w-16 rounded rounded-box bg-base-300 ring-1 ring-accent"
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		{/if}
		{#if previewtabs === 'Component Variants'}
			<div class="space-y-8">
				{#each Object.entries(componentGrid) as [name, config]}
					<div class="card border-base-300 bg-base-100 card-border">
						<div class="card-body gap-4">
							<h2 class="text-lg font-bold capitalize">{name}</h2>
							<div class="grid gap-3">
								{#each config.colors.slice(0, 3) as color}
									<div class="flex flex-wrap items-center gap-2">
										{#each config.sizes.slice(0, 3) as size}
											{#if config.element === 'input'}
												<svelte:element
													this={config.element}
													class="{config.baseClass} {size} {color}"
													{...config.attributes || {}}
												/>
											{:else}
												<svelte:element
													this={config.element}
													class="{config.baseClass} {size} {color}"
													{...config.attributes || {}}
												>
													{#if config.icon}
														<svg
															xmlns="http://www.w3.org/2000/svg"
															viewBox="0 0 20 20"
															fill="currentColor"
															class="size-[1em]"
														>
															<path
																d="m9.653 16.915-.005-.003-.019-.01a20.759 20.759 0 0 1-1.162-.682 22.045 22.045 0 0 1-2.582-1.9C4.045 12.733 2 10.352 2 7.5a4.5 4.5 0 0 1 8-2.828A4.5 4.5 0 0 1 18 7.5c0 2.852-2.044 5.233-3.885 6.82a22.049 22.049 0 0 1-3.744 2.582l-.019.01-.005.003h-.002a.739.739 0 0 1-.69.001l-.002-.001Z"
															/>
														</svg>
													{/if}
													{config.label}
												</svelte:element>
											{/if}
										{/each}
									</div>
								{/each}
							</div>
						</div>
					</div>
				{/each}
			</div>
		{/if}
	</div>
</div>
