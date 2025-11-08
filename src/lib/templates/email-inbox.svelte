<script lang="ts">
	import { fly, slide, fade, scale } from 'svelte/transition';
	import { quintOut, cubicOut, backOut } from 'svelte/easing';
	import EmailEmptyState from './email-empty-state.svelte';

	interface Email {
		id: string;
		from: string;
		email: string;
		subject: string;
		preview: string;
		body: string;
		timestamp: string;
		read: boolean;
		starred: boolean;
		hasAttachment: boolean;
		labels?: string[];
	}

	// Sample email data with more variety
	const sampleEmails: Email[] = [
		{
			id: '1',
			from: 'Sarah Johnson',
			email: 'sarah.j@example.com',
			subject: 'Design Review Meeting',
			preview: "Hey! Can we reschedule tomorrow's design review? I have a conflict with...",
			body: "Hey! Can we reschedule tomorrow's design review? I have a conflict with another meeting. How about Thursday at 2 PM instead?\n\nLooking forward to hearing from you soon. Let me know what works best for your schedule.\n\nBest regards,\nSarah",
			timestamp: '10:30 AM',
			read: false,
			starred: true,
			hasAttachment: false,
			labels: ['work', 'urgent']
		},
		{
			id: '2',
			from: 'Mike Chen',
			email: 'mike.chen@example.com',
			subject: 'Project Deadline Update',
			preview: "Just wanted to give you a heads up that we're pushing the launch date by one...",
			body: "Just wanted to give you a heads up that we're pushing the launch date by one week. The development team needs more time for testing.\n\nWe'll have a meeting on Monday to discuss the new timeline.\n\nThanks for your understanding!",
			timestamp: 'Yesterday',
			read: true,
			starred: false,
			hasAttachment: true,
			labels: ['work']
		},
		{
			id: '3',
			from: 'Emma Williams',
			email: 'emma.w@example.com',
			subject: 'Weekend Hiking Trip',
			preview: "Who's up for a hiking adventure this Saturday? I found an amazing trail with...",
			body: "Who's up for a hiking adventure this Saturday? I found an amazing trail with beautiful views!\n\nWe can meet at 8 AM at the parking lot. Bring water, snacks, and wear comfortable shoes.\n\nLet me know if you're in!",
			timestamp: 'Yesterday',
			read: true,
			starred: false,
			hasAttachment: false,
			labels: ['personal']
		},
		{
			id: '4',
			from: 'David Park',
			email: 'david.p@example.com',
			subject: 'Budget Approval Request',
			preview: "I've attached the Q3 budget proposal for your review. Please let me know if you...",
			body: "I've attached the Q3 budget proposal for your review. Please let me know if you have any questions or concerns.\n\nWe need approval by end of week to proceed with the planned initiatives.\n\nThank you!",
			timestamp: '2 days ago',
			read: true,
			starred: false,
			hasAttachment: true,
			labels: ['work', 'finance']
		},
		{
			id: '5',
			from: 'Lisa Anderson',
			email: 'lisa.a@example.com',
			subject: 'Team Lunch Tomorrow',
			preview: 'Reminder: Team lunch at the new Italian place downtown tomorrow at 12:30...',
			body: 'Reminder: Team lunch at the new Italian place downtown tomorrow at 12:30 PM.\n\nPlease RSVP so I can make a reservation for the right number of people.\n\nSee you there!',
			timestamp: '3 days ago',
			read: true,
			starred: false,
			hasAttachment: false,
			labels: ['work', 'social']
		}
	];

	let emails = $state<Email[]>(sampleEmails);
	let selectedEmail = $state<Email | null>(null);
	let activeFolder = $state<string>('inbox');
	let searchQuery = $state('');
	let showCompose = $state(false);
	let sidebarOpen = $state(false);
	let selectedEmails = $state<Set<string>>(new Set());
	let showBulkActions = $derived(selectedEmails.size > 0);

	const folders = [
		{ id: 'inbox', name: 'Inbox', icon: '📥', count: 13 },
		{ id: 'starred', name: 'Starred', icon: '⭐', count: 3 },
		{ id: 'drafts', name: 'Drafts', icon: '📝', count: 5 },
		{ id: 'sent', name: 'Sent', icon: '📤', count: 0 },
		{ id: 'archive', name: 'Archive', icon: '�', count: 24 },
		{ id: 'trash', name: 'Trash', icon: '🗑️', count: 2 }
	];

	let filteredEmails = $derived(
		emails.filter(
			(email) =>
				email.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
				email.from.toLowerCase().includes(searchQuery.toLowerCase()) ||
				email.body.toLowerCase().includes(searchQuery.toLowerCase())
		)
	);

	function selectEmail(email: Email) {
		selectedEmail = email;
		email.read = true;
		// Close sidebar on mobile after selecting
		if (window.innerWidth < 1024) {
			setTimeout(() => (sidebarOpen = false), 100);
		}
	}

	function toggleStar(email: Email, event: Event) {
		event.stopPropagation();
		email.starred = !email.starred;
	}

	function selectFolder(folderId: string) {
		activeFolder = folderId;
		selectedEmail = null;
		selectedEmails.clear();
		if (window.innerWidth < 1024) {
			sidebarOpen = false;
		}
	}

	function toggleEmailSelection(emailId: string, event: Event) {
		event.stopPropagation();
		if (selectedEmails.has(emailId)) {
			selectedEmails.delete(emailId);
		} else {
			selectedEmails.add(emailId);
		}
		selectedEmails = selectedEmails;
	}

	function selectAllEmails() {
		if (selectedEmails.size === filteredEmails.length) {
			selectedEmails.clear();
		} else {
			selectedEmails = new Set(filteredEmails.map((e) => e.id));
		}
	}

	function deleteSelectedEmails() {
		emails = emails.filter((email) => !selectedEmails.has(email.id));
		selectedEmails.clear();
		selectedEmail = null;
	}

	function markSelectedAsRead(read: boolean) {
		emails.forEach((email) => {
			if (selectedEmails.has(email.id)) {
				email.read = read;
			}
		});
		selectedEmails.clear();
	}

	function archiveSelectedEmails() {
		// In a real app, this would move to archive folder
		emails = emails.filter((email) => !selectedEmails.has(email.id));
		selectedEmails.clear();
		selectedEmail = null;
	}

	function deleteEmail(emailId: string) {
		emails = emails.filter((email) => email.id !== emailId);
		if (selectedEmail?.id === emailId) {
			selectedEmail = null;
		}
	}

	function archiveEmail(emailId: string) {
		emails = emails.filter((email) => email.id !== emailId);
		if (selectedEmail?.id === emailId) {
			selectedEmail = null;
		}
	}

	function getInitials(name: string): string {
		return name
			.split(' ')
			.map((n) => n[0])
			.join('')
			.toUpperCase();
	}

	function getRandomColor(name: string): string {
		const colors = [
			'bg-rose-500',
			'bg-orange-500',
			'bg-amber-500',
			'bg-emerald-500',
			'bg-teal-500',
			'bg-cyan-500',
			'bg-blue-500',
			'bg-indigo-500',
			'bg-purple-500',
			'bg-pink-500'
		];
		const index = name.charCodeAt(0) % colors.length;
		return colors[index];
	}

	// Keyboard shortcuts
	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'c' && !showCompose) {
			showCompose = true;
		} else if (event.key === 'Escape') {
			showCompose = false;
			selectedEmails.clear();
		} else if (event.key === '/' && !showCompose) {
			event.preventDefault();
			document.querySelector<HTMLInputElement>('input[type="search"]')?.focus();
		}
	}
</script>

<svelte:window onkeydown={handleKeydown} />

<div class="relative flex h-screen overflow-hidden bg-base-100 font-body">
	<!-- Mobile Menu Button -->
	<button
		class="btn fixed top-4 left-4 z-50 btn-circle bg-base-100 shadow-lg btn-ghost btn-sm lg:hidden"
		onclick={() => (sidebarOpen = !sidebarOpen)}
		aria-label="Toggle menu"
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="1.5"
			stroke="currentColor"
			class="h-5 w-5"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
			/>
		</svg>
	</button>

	<!-- Overlay for mobile -->
	{#if sidebarOpen}
		<div
			class="fixed inset-0 z-30 bg-black/30 backdrop-blur-sm lg:hidden"
			onclick={() => (sidebarOpen = false)}
			transition:fade={{ duration: 200 }}
		></div>
	{/if}

	<!-- Sidebar -->
	<aside
		class={`fixed z-40 flex h-screen w-64 flex-col border-r border-base-300/30 bg-base-100 transition-transform duration-300 ease-out lg:relative ${
			sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
		}`}
	>
		<!-- Header -->
		<div class="border-b border-base-300/30 p-5">
			<div class="mb-5 flex items-center justify-between">
				<div class="flex items-center gap-2.5">
					<div
						class="flex h-7 w-7 items-center justify-center rounded-lg bg-linear-to-br from-primary to-secondary shadow-sm"
					>
						<span class="text-base">✉️</span>
					</div>
					<div>
						<h2 class="font-heading text-base font-bold">Minimal Mail</h2>
						<p class="text-[10px] tracking-wide text-base-content/40 uppercase">Pro</p>
					</div>
				</div>
			</div>

			<!-- Compose Button -->
			<button
				class="btn w-full gap-2 rounded-xl shadow-lg shadow-primary/20 transition-all duration-300 btn-primary hover:shadow-primary/30"
				onclick={() => (showCompose = true)}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="2"
					stroke="currentColor"
					class="h-4 w-4"
				>
					<path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
				</svg>
				Compose
			</button>
		</div>

		<!-- Navigation -->
		<nav class="flex-1 overflow-y-auto px-3 py-3">
			<ul class="space-y-0.5">
				{#each folders as folder}
					<li in:slide={{ duration: 300, delay: folders.indexOf(folder) * 50, easing: quintOut }}>
						<button
							class={`group flex w-full items-center gap-3 rounded-xl px-3 py-2 transition-all duration-200 ${
								activeFolder === folder.id
									? 'bg-primary/10 font-medium text-primary shadow-sm'
									: 'text-base-content/60 hover:bg-base-200/50 hover:text-base-content'
							}`}
							onclick={() => selectFolder(folder.id)}
						>
							<span class="text-base transition-transform duration-200 group-hover:scale-110"
								>{folder.icon}</span
							>
							<span class="flex-1 text-left text-sm">{folder.name}</span>
							{#if folder.count > 0}
								<span
									class="rounded-md px-1.5 py-0.5 text-[10px] font-medium transition-all duration-200 {activeFolder ===
									folder.id
										? 'bg-primary text-primary-content'
										: 'bg-base-300/50 text-base-content/50 group-hover:bg-base-300'}"
									in:scale={{ duration: 200, easing: backOut }}
								>
									{folder.count}
								</span>
							{/if}
						</button>
					</li>
				{/each}
			</ul>
		</nav>

		<!-- User Profile -->
		<div class="border-t border-base-300/30 p-3">
			<div
				class="flex cursor-pointer items-center gap-2.5 rounded-xl p-2 transition-all duration-200 hover:bg-base-200/50"
			>
				<div class="placeholder avatar">
					<div
						class="h-9 w-9 rounded-full bg-linear-to-br from-primary to-secondary text-primary-content shadow-sm"
					>
						<span class="text-xs font-semibold">AM</span>
					</div>
				</div>
				<div class="min-w-0 flex-1">
					<p class="truncate text-xs font-semibold">Alex Morgan</p>
					<p class="truncate text-[10px] text-base-content/40">alex@example.com</p>
				</div>
			</div>
		</div>
	</aside>

	<!-- Email List -->
	<section class="flex w-full flex-col border-r border-base-300/30 bg-base-100 lg:w-[420px]">
		<!-- Search Header -->
		<div class="border-b border-base-300/30 p-4 lg:p-5">
			<div class="mb-4 flex items-center justify-between">
				<div class="ml-12 lg:ml-0">
					<h3 class="font-heading text-lg font-bold tracking-tight capitalize lg:text-xl">
						{activeFolder}
					</h3>
					{#if folders.find((f) => f.id === activeFolder)?.count}
						<p class="mt-0.5 text-[10px] text-base-content/40" in:fade={{ duration: 200 }}>
							<span class="font-semibold text-primary">
								{folders.find((f) => f.id === activeFolder)?.count}
							</span>
							unread
						</p>
					{/if}
				</div>
				<div class="flex items-center gap-1">
					{#if showBulkActions}
						<button
							class="btn btn-circle btn-ghost btn-sm"
							onclick={selectAllEmails}
							aria-label="Select all"
							title="Select all"
							in:scale={{ duration: 200, easing: backOut }}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								class="h-4 w-4"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
								/>
							</svg>
						</button>
					{/if}
					<button class="btn btn-circle btn-ghost btn-sm" aria-label="Refresh" title="Refresh">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="h-4 w-4"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
							/>
						</svg>
					</button>
				</div>
			</div>

			<!-- Search Bar -->
			<div class="relative">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-base-content/30"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
					/>
				</svg>
				<input
					type="search"
					placeholder="Search emails... (Press / to focus)"
					class="input input-sm w-full rounded-xl border-base-300/30 bg-base-200/40 pr-3 pl-9 text-sm transition-all duration-200 focus:border-primary/30 focus:bg-base-100"
					bind:value={searchQuery}
				/>
			</div>
		</div>

		<!-- Bulk Actions Bar -->
		{#if showBulkActions}
			<div
				class="flex items-center justify-between gap-2 border-b border-primary/20 bg-primary/5 px-4 py-2"
				in:slide={{ duration: 300, easing: quintOut }}
			>
				<span class="text-xs font-medium text-primary">{selectedEmails.size} selected</span>
				<div class="flex items-center gap-1">
					<button
						class="btn gap-1 rounded-lg btn-ghost btn-xs"
						onclick={() => markSelectedAsRead(true)}
						title="Mark as read"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="h-3.5 w-3.5"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M21.75 9v.906a2.25 2.25 0 01-1.183 1.981l-6.478 3.488M2.25 9v.906a2.25 2.25 0 001.183 1.981l6.478 3.488m8.839 2.51l-4.66-2.51m0 0l-1.023-.55a2.25 2.25 0 00-2.134 0l-1.022.55m0 0l-4.661 2.51m16.5 1.615a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V8.844a2.25 2.25 0 011.183-1.98l7.5-4.04a2.25 2.25 0 012.134 0l7.5 4.04a2.25 2.25 0 011.183 1.98V19.5z"
							/>
						</svg>
						Read
					</button>
					<button
						class="btn gap-1 rounded-lg btn-ghost btn-xs"
						onclick={archiveSelectedEmails}
						title="Archive"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="h-3.5 w-3.5"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
							/>
						</svg>
						Archive
					</button>
					<button
						class="btn gap-1 rounded-lg text-error btn-ghost btn-xs"
						onclick={deleteSelectedEmails}
						title="Delete"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="h-3.5 w-3.5"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
							/>
						</svg>
						Delete
					</button>
				</div>
			</div>
		{/if}

		<!-- Email List Items -->
		<div class="flex-1 overflow-y-auto">
			{#each filteredEmails as email (email.id)}
				<div
					class={`group relative cursor-pointer border-b border-base-300/20 transition-all duration-200 hover:bg-base-200/40 ${
						selectedEmail?.id === email.id ? 'border-l-[3px] border-l-primary bg-base-200/60' : ''
					} ${!email.read ? 'bg-primary/2' : ''}`}
					onclick={() => selectEmail(email)}
					role="button"
					tabindex="0"
					onkeydown={(e) => {
						if (e.key === 'Enter' || e.key === ' ') {
							e.preventDefault();
							selectEmail(email);
						}
					}}
					in:slide={{ duration: 250, easing: quintOut }}
				>
					<div class="p-3 lg:p-3.5 {selectedEmail?.id === email.id ? 'pl-[10px]' : ''}">
						<div class="flex items-start gap-3">
							<!-- Checkbox -->
							<div
								class="shrink-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
							>
								<input
									type="checkbox"
									class="checkbox rounded checkbox-sm checkbox-primary"
									checked={selectedEmails.has(email.id)}
									onclick={(e) => toggleEmailSelection(email.id, e)}
									aria-label={`Select email from ${email.from}`}
								/>
							</div>

							<!-- Avatar -->
							<div class="placeholder avatar shrink-0">
								<div
									class="{getRandomColor(
										email.from
									)} flex h-10 w-10 items-center justify-center rounded-full text-white shadow-sm ring-2 ring-base-100 transition-transform duration-200 group-hover:scale-105"
								>
									<span class="text-xs font-semibold">{getInitials(email.from)}</span>
								</div>
							</div>

							<!-- Email Info -->
							<div class="min-w-0 flex-1">
								<div class="mb-1 flex items-start justify-between">
									<h4
										class={`truncate pr-2 text-sm ${!email.read ? 'font-semibold text-base-content' : 'font-medium text-base-content/80'}`}
									>
										<span class="font-heading">{email.from}</span>
									</h4>
									<div class="flex shrink-0 items-center gap-1.5">
										<span class="text-[10px] text-base-content/40">{email.timestamp}</span>
										<button
											class={`transition-all duration-200 ${email.starred ? 'text-warning opacity-100' : 'text-base-content/20 opacity-0 group-hover:opacity-100 hover:text-warning'}`}
											onclick={(e) => toggleStar(email, e)}
											aria-label={email.starred
												? `Unstar email from ${email.from}`
												: `Star email from ${email.from}`}
											title={email.starred ? 'Unstar' : 'Star'}
										>
											{#if email.starred}
												<svg
													xmlns="http://www.w3.org/2000/svg"
													viewBox="0 0 24 24"
													fill="currentColor"
													class="h-3.5 w-3.5"
													in:scale={{ duration: 200, easing: backOut }}
												>
													<path
														d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
													/>
												</svg>
											{:else}
												<svg
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 24 24"
													stroke-width="1.5"
													stroke="currentColor"
													class="h-3.5 w-3.5"
												>
													<path
														stroke-linecap="round"
														stroke-linejoin="round"
														d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
													/>
												</svg>
											{/if}
										</button>
									</div>
								</div>
								<p
									class={`mb-1 truncate text-xs ${!email.read ? 'font-semibold text-base-content' : 'text-base-content/70'}`}
								>
									{email.subject}
								</p>
								<p class="truncate text-[11px] text-base-content/40">{email.preview}</p>

								<!-- Labels -->
								{#if email.labels && email.labels.length > 0}
									<div class="mt-1.5 flex gap-1">
										{#each email.labels as label}
											<span
												class="rounded-md bg-base-300/50 px-1.5 py-0.5 text-[9px] font-medium tracking-wide text-base-content/50 uppercase"
											>
												{label}
											</span>
										{/each}
									</div>
								{/if}
							</div>

							<!-- Unread Indicator -->
							{#if !email.read}
								<div
									class="absolute top-1/2 right-3 h-2 w-2 -translate-y-1/2 rounded-full bg-primary"
									in:scale={{ duration: 200, easing: backOut }}
								></div>
							{/if}
						</div>
					</div>
				</div>
			{/each}

			{#if filteredEmails.length === 0}
				<div class="flex h-full flex-col items-center justify-center p-8 text-center">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1"
						stroke="currentColor"
						class="mb-4 h-16 w-16 text-base-content/20"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M21.75 9v.906a2.25 2.25 0 01-1.183 1.981l-6.478 3.488M2.25 9v.906a2.25 2.25 0 001.183 1.981l6.478 3.488m8.839 2.51l-4.66-2.51m0 0l-1.023-.55a2.25 2.25 0 00-2.134 0l-1.022.55m0 0l-4.661 2.51m16.5 1.615a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V8.844a2.25 2.25 0 011.183-1.98l7.5-4.04a2.25 2.25 0 012.134 0l7.5 4.04a2.25 2.25 0 011.183 1.98V19.5z"
						/>
					</svg>
					<p class="text-sm text-base-content/50">No emails found</p>
				</div>
			{/if}
		</div>
	</section>

	<!-- Email Detail View -->
	<main class="flex min-w-0 flex-1 flex-col bg-base-100">
		{#if selectedEmail}
			<div class="flex flex-1 flex-col" in:fly={{ x: 30, duration: 350, easing: cubicOut }}>
				<!-- Email Header -->
				<header class="border-b border-base-300/30 p-4 lg:p-6">
					<!-- Action Buttons Row -->
					<div class="mb-4 flex items-center justify-between">
						<button
							class="btn gap-2 rounded-xl btn-ghost btn-sm"
							onclick={() => (selectedEmail = null)}
							aria-label="Back to list"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="2"
								stroke="currentColor"
								class="h-4 w-4"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
								/>
							</svg>
							<span class="hidden lg:inline">Back</span>
						</button>

						<div class="flex items-center gap-1">
							<button
								class="btn btn-circle btn-ghost btn-sm"
								onclick={(e) => toggleStar(selectedEmail!, e)}
								aria-label={selectedEmail.starred
									? `Unstar email from ${selectedEmail.from}`
									: `Star email from ${selectedEmail.from}`}
								title={selectedEmail.starred ? 'Unstar' : 'Star'}
							>
								{#if selectedEmail.starred}
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 24 24"
										fill="currentColor"
										class="h-4 w-4 text-warning"
										in:scale={{ duration: 200, easing: backOut }}
									>
										<path
											d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
										/>
									</svg>
								{:else}
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke-width="1.5"
										stroke="currentColor"
										class="h-4 w-4"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
										/>
									</svg>
								{/if}
							</button>
							<button
								class="btn btn-circle btn-ghost btn-sm"
								onclick={() => archiveEmail(selectedEmail!.id)}
								aria-label="Archive"
								title="Archive"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
									class="h-4 w-4"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
									/>
								</svg>
							</button>
							<button
								class="btn btn-circle text-error btn-ghost btn-sm"
								onclick={() => deleteEmail(selectedEmail!.id)}
								aria-label="Delete"
								title="Delete"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
									class="h-4 w-4"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
									/>
								</svg>
							</button>
						</div>
					</div>

					<!-- Subject -->
					<h2
						class="mb-4 font-heading text-2xl leading-tight font-bold text-base-content lg:text-3xl"
					>
						{selectedEmail.subject}
					</h2>

					<!-- Sender Info -->
					<div class="flex items-center gap-3">
						<div class="placeholder avatar">
							<div
								class="{getRandomColor(
									selectedEmail.from
								)} flex h-11 w-11 items-center justify-center rounded-full text-white shadow-md ring-2 ring-base-100"
								in:scale={{ duration: 300, easing: backOut }}
							>
								<span class="text-base font-semibold">{getInitials(selectedEmail.from)}</span>
							</div>
						</div>
						<div class="min-w-0 flex-1">
							<h3 class="font-heading text-sm font-semibold">{selectedEmail.from}</h3>
							<p class="text-xs text-base-content/40">{selectedEmail.email}</p>
						</div>
						<div class="text-right">
							<p class="text-xs text-base-content/40">{selectedEmail.timestamp}</p>
						</div>
					</div>

					<!-- Labels -->
					{#if selectedEmail.labels && selectedEmail.labels.length > 0}
						<div class="mt-3 flex gap-2" in:fade={{ duration: 200 }}>
							{#each selectedEmail.labels as label}
								<span
									class="rounded-lg bg-base-200 px-2 py-1 text-[10px] font-medium tracking-wide text-base-content/60 uppercase"
									in:scale={{
										duration: 200,
										delay: selectedEmail.labels.indexOf(label) * 50,
										easing: backOut
									}}
								>
									{label}
								</span>
							{/each}
						</div>
					{/if}
				</header>

				<!-- Email Body -->
				<article class="flex-1 overflow-y-auto p-4 lg:p-8">
					<div class="mx-auto max-w-3xl">
						{#each selectedEmail.body.split('\n') as paragraph, i}
							{#if paragraph.trim()}
								<p
									class="mb-4 text-sm leading-relaxed text-base-content/80 lg:text-base"
									in:fade={{ duration: 300, delay: i * 50 }}
								>
									{paragraph}
								</p>
							{/if}
						{/each}
					</div>
				</article>

				<!-- Action Buttons -->
				<footer class="border-t border-base-300/30 bg-base-100 p-4 lg:p-6">
					<div class="flex flex-wrap gap-2">
						<button
							class="btn flex-1 gap-2 rounded-xl shadow-lg shadow-primary/20 btn-primary lg:flex-initial"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="2"
								stroke="currentColor"
								class="h-4 w-4"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
								/>
							</svg>
							Reply
						</button>
						<button class="btn gap-2 rounded-xl btn-ghost">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								class="h-4 w-4"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M3 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 010 1.954l-7.108 4.061A1.125 1.125 0 013 16.811V8.69zM12.75 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 010 1.954l-7.108 4.061a1.125 1.125 0 01-1.683-.977V8.69z"
								/>
							</svg>
							<span class="hidden lg:inline">Forward</span>
						</button>
						<button class="btn gap-2 rounded-xl btn-ghost">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								class="h-4 w-4"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5zm-3 0h.008v.008H15V10.5z"
								/>
							</svg>
							<span class="hidden lg:inline">Print</span>
						</button>
					</div>
				</footer>
			</div>
		{:else}
			<EmailEmptyState />
		{/if}
	</main>

	<!-- Compose Modal -->
	{#if showCompose}
		<div
			class="modal-open modal"
			in:fade={{ duration: 200 }}
			out:fade={{ duration: 150 }}
			onclick={(e) => {
				if (e.target === e.currentTarget) showCompose = false;
			}}
			role="dialog"
			aria-modal="true"
			aria-labelledby="compose-title"
			tabindex="-1"
		>
			<div
				class="modal-box max-w-3xl overflow-hidden rounded-3xl p-0 shadow-2xl"
				in:fly={{ y: 20, duration: 350, easing: cubicOut }}
			>
				<!-- Header -->
				<div
					class="flex items-center justify-between border-b border-base-300/30 bg-linear-to-r from-primary/5 to-secondary/5 px-6 py-4"
				>
					<h3 id="compose-title" class="font-heading text-lg font-bold">New Message</h3>
					<button
						class="btn btn-circle btn-ghost btn-sm"
						onclick={() => (showCompose = false)}
						aria-label="Close compose"
						title="Close (Esc)"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-5 w-5"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							stroke-width="2"
						>
							<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
						</svg>
					</button>
				</div>

				<form class="space-y-4 p-6" onsubmit={(e) => e.preventDefault()}>
					<!-- To Field -->
					<div class="form-control">
						<div class="flex items-center gap-3 border-b border-base-300/30 pb-3">
							<label class="w-12 text-xs font-medium text-base-content/50" for="compose-to"
								>To</label
							>
							<input
								type="email"
								placeholder="recipient@example.com"
								class="flex-1 bg-transparent text-sm outline-none"
								id="compose-to"
							/>
						</div>
					</div>

					<!-- Subject Field -->
					<div class="form-control">
						<div class="flex items-center gap-3 border-b border-base-300/30 pb-3">
							<label class="w-12 text-xs font-medium text-base-content/50" for="compose-subject"
								>Subject</label
							>
							<input
								type="text"
								placeholder="Email subject"
								class="flex-1 bg-transparent text-sm outline-none"
								id="compose-subject"
							/>
						</div>
					</div>

					<!-- Message Field -->
					<div class="form-control">
						<textarea
							class="textarea h-64 w-full resize-none textarea-ghost text-sm leading-relaxed focus:outline-none"
							placeholder="Write your message..."
							id="compose-message"
						></textarea>
					</div>

					<!-- Actions -->
					<div class="flex items-center justify-between border-t border-base-300/30 pt-4">
						<div class="flex gap-1">
							<button
								type="button"
								class="btn btn-circle btn-ghost btn-sm"
								title="Attach file"
								in:scale={{ duration: 200, delay: 50, easing: backOut }}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
									class="h-4 w-4"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13"
									/>
								</svg>
							</button>
							<button
								type="button"
								class="btn btn-circle btn-ghost btn-sm"
								title="Insert emoji"
								in:scale={{ duration: 200, delay: 100, easing: backOut }}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
									class="h-4 w-4"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
									/>
								</svg>
							</button>
							<button
								type="button"
								class="btn btn-circle btn-ghost btn-sm"
								title="Insert link"
								in:scale={{ duration: 200, delay: 150, easing: backOut }}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
									class="h-4 w-4"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
									/>
								</svg>
							</button>
							<button
								type="button"
								class="btn btn-circle btn-ghost btn-sm"
								title="Insert image"
								in:scale={{ duration: 200, delay: 200, easing: backOut }}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
									class="h-4 w-4"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
									/>
								</svg>
							</button>
						</div>
						<div class="flex gap-2">
							<button
								type="button"
								class="btn rounded-xl btn-ghost btn-sm"
								onclick={() => (showCompose = false)}
							>
								Cancel
							</button>
							<button
								type="submit"
								class="btn gap-2 rounded-xl shadow-lg shadow-primary/20 btn-sm btn-primary"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="2"
									stroke="currentColor"
									class="h-4 w-4"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
									/>
								</svg>
								Send
							</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	{/if}
</div>
