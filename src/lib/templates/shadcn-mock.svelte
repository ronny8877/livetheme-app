<script lang="ts">
	import AppSidebar from '$lib/components/app-sidebar.svelte';
	import * as Breadcrumb from '$lib/components/ui/breadcrumb/index.js';
	import { Separator } from '$lib/components/ui/separator/index.js';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
</script>

<Sidebar.Provider>
	<AppSidebar />
	<Sidebar.Inset>
		<header class="flex h-16 shrink-0 items-center gap-2 border-b px-4">
			<Sidebar.Trigger class="-ml-1" />
			<Separator orientation="vertical" class="mr-2 data-[orientation=vertical]:h-4" />
			<Breadcrumb.Root>
				<Breadcrumb.List>
					<Breadcrumb.Item class="hidden md:block">
						<Breadcrumb.Link href="##">lib</Breadcrumb.Link>
					</Breadcrumb.Item>
					<Breadcrumb.Separator class="hidden md:block" />
					<Breadcrumb.Item class="hidden md:block">
						<Breadcrumb.Link href="##">components</Breadcrumb.Link>
					</Breadcrumb.Item>
					<Breadcrumb.Separator class="hidden md:block" />
					<Breadcrumb.Item>
						<Breadcrumb.Page>button.svelte</Breadcrumb.Page>
					</Breadcrumb.Item>
				</Breadcrumb.List>
			</Breadcrumb.Root>
		</header>
		<div class="flex flex-1 flex-col gap-4 p-4">
			<div class="grid auto-rows-min gap-4 md:grid-cols-3">
				<div class="flex aspect-video items-center justify-center rounded-xl bg-accent">
					<div class="flex w-52 flex-col gap-4">
						<div class="h-16 w-16 shrink-0 skeleton rounded-full"></div>
						<div class="flex flex-col gap-4">
							<div class="h-4 w-20 skeleton"></div>
							<div class="h-4 w-28 skeleton"></div>
						</div>
					</div>
				</div>
				<div class="bg-muted aspect-video skeleton rounded-xl"></div>
				<div class=" bg-foreground aspect-video rounded-xl"></div>
			</div>
			<div class="bg-muted min-h-screen flex-1 skeleton rounded-xl md:min-h-min"></div>
		</div>
	</Sidebar.Inset>
</Sidebar.Provider>
