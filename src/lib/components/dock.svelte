<script lang="ts">
    import {
        Dices,
        LayoutTemplate,
        PaintBucket,
        Settings2,
        Palette,
        Type,
        ChevronDown,
        Moon,
        Sun,
        Sparkles,
        Compass,
        FolderHeart
    } from '@lucide/svelte';
    import { app_modals, MODAL_TYPE } from '$lib/store/app.svelte';
    import tippy from 'tippy.js';
    import { randomizeActiveTheme } from '$lib';
    import { active_theme } from '$lib/store/theme.svelte';
    import { randomizeFontsIfEnabled } from '$lib/utils';
    
    // Defer import of theme-random to reduce initial bundle size
    let generateRandomThemeFn: null | ((...args: any[]) => any) = null;
    async function ensureThemeRandom() {
        if (!generateRandomThemeFn) {
            const mod = await import('$lib/utils/theme-random');
            generateRandomThemeFn = mod.generateRandomTheme;
        }
        return generateRandomThemeFn!;
    }

    let randomMenuOpen = $state(false);
    let feelingLuckyActive = $state(false);
    let feelingLuckyTimeout: ReturnType<typeof setTimeout> | null = null;

    // Map names to icon components (constructors)
    const icons = {
        Vault: FolderHeart,
        Colors: PaintBucket,
        Gradients: Palette,
        Fonts: Type,
        Explore: Compass,
        Settings: Settings2,
        Random: Dices,
        Templates: LayoutTemplate
    };

    // Map dock items to modal types
    const modalMap: Record<DockName, MODAL_TYPE | null> = {
        Explore: MODAL_TYPE.EXPLORE,
        Vault: MODAL_TYPE.VAULT,
        Fonts: MODAL_TYPE.FONTS,
        Settings: MODAL_TYPE.SETTINGS,
        Gradients: MODAL_TYPE.GRADIENT,
        Templates: MODAL_TYPE.TEMPLATES,
        Random: null,
        Colors: null
    };

    type DockName = keyof typeof icons;

    // Primary dock items (visible on mobile)
    const primaryItems: DockName[] = ['Explore', 'Vault', 'Fonts', 'Settings'];

    function select(name: DockName) {
        // Special case: generate new theme immediately, do not toggle active tool
        if (name === 'Random') {
            randomizeActiveTheme();
            randomizeFontsIfEnabled();
            return;
        }

        const modalType = modalMap[name];
        if (!modalType) return;

        // Toggle: deselect if already active
        if (app_modals.active_modal === modalType) {
            app_modals.active_modal = null;
        } else {
            app_modals.active_modal = modalType;
        }
    }

    function getIsActive(name: DockName): boolean {
        const modalType = modalMap[name];
        if (!modalType) return false;
        return app_modals.active_modal === modalType;
    }

    async function generateRandomThemeByType(type: 'light' | 'dark' | 'random') {
        const gen = await ensureThemeRandom();
        const newTheme = gen({ themeType: type });
        active_theme.theme = newTheme;
        active_theme.is_modified = true;
        randomizeFontsIfEnabled();
    }

    function startFeelingLucky() {
        if (feelingLuckyActive) return;

        feelingLuckyActive = true;

        let count = 0;
        const maxCycles = 10;
        const interval = 200;

        const cycleThemes = () => {
            if (count < maxCycles) {
                randomizeActiveTheme();
                count++;
                feelingLuckyTimeout = setTimeout(cycleThemes, interval);
            } else {
                feelingLuckyActive = false;
            }
        };

        cycleThemes();
    }

    function stopFeelingLucky() {
        if (feelingLuckyTimeout) {
            clearTimeout(feelingLuckyTimeout);
            feelingLuckyTimeout = null;
        }
        feelingLuckyActive = false;
    }

    // Cleanup on component unmount
    $effect(() => {
        return () => {
            if (feelingLuckyTimeout) {
                clearTimeout(feelingLuckyTimeout);
            }
        };
    });
</script>

{#snippet dockItem(name: DockName, action: () => void)}
    {@const Icon = icons[name]}
    {@const isActive = getIsActive(name)}
    <button
        data-umami-event="dock-{name.toLowerCase()}-click"
        data-umami-event-status={isActive ? 'active' : 'inactive'}
        class={[
            'dock-action flex cursor-pointer items-center gap-2 rounded-full p-3',
            isActive
                ? 'bg-primary text-primary-content'
                : 'bg-base-100 text-base-content/70 hover:bg-base-200 hover:text-base-content'
        ]}
        onclick={action}
        aria-pressed={isActive}
        data-tippy-content={name === 'Random' ? 'Random Theme' : name}
        use:tippy={{ placement: 'top', animation: 'shift-away', duration: 200 }}
    >
        <Icon class="h-5 w-5 shrink-0" />
    </button>
{/snippet}

<div
    role="toolbar"
    aria-label="Editor dock"
    tabindex="-1"
    class="fixed bottom-5 left-1/2 flex w-auto -translate-x-1/2 justify-center gap-2 rounded-full glass p-2 outline outline-base-content/20 transition-all duration-300 ease-out md:max-w-lg"
>
    <!-- Primary items - always visible -->
    {#each primaryItems as item}
        <div class="flex">
            {@render dockItem(item, () => select(item))}
        </div>
    {/each}

    <div class="divider m-0 divider-horizontal p-0"></div>

    <!-- Enhanced Random button with dropdown -->
    <div class="dropdown dropdown-center dropdown-top">
        <div class="flex gap-0 overflow-hidden rounded-full outline outline-base-content/20">
            <!-- Main random button -->
            <button
                data-umami-event="random-theme"
                data-umami-event-type="random"
                class={[
                    'dock-action flex cursor-pointer items-center gap-2 rounded-l-full p-3',
                    feelingLuckyActive
                        ? 'animate-pulse bg-accent text-accent-content'
                        : 'bg-base-100 text-base-content/70 hover:bg-base-200 hover:text-base-content'
                ]}
                onclick={() => (feelingLuckyActive ? stopFeelingLucky() : select('Random'))}
                data-tippy-content="Random Theme"
                use:tippy={{ placement: 'top', animation: 'shift-away', duration: 200 }}
            >
                <Dices class="h-5 w-5 shrink-0" />
            </button>

            <!-- Dropdown trigger button -->
            <button
                data-umami-event="random-menu-toggle"
                tabindex="0"
                class="rounded-r-full border-l border-base-content/10 bg-base-100 p-3 text-base-content/70 hover:bg-base-200 hover:text-base-content"
                onclick={() => (randomMenuOpen = !randomMenuOpen)}
            >
                <ChevronDown class="h-4 w-4 shrink-0" />
            </button>
        </div>

        {#if randomMenuOpen}
            <ul
                tabindex="-1"
                class="dropdown-content menu z-100 mb-4 w-56 rounded-box bg-base-100 p-2 shadow-lg"
            >
                <li>
                    <button
                        data-umami-event="random-theme"
                        data-umami-event-type="random"
                        onclick={() => generateRandomThemeByType('random')}
                    >
                        <Dices class="h-4 w-4" />
                        Random Theme
                    </button>
                </li>
                <li>
                    <button
                        data-umami-event="random-theme"
                        data-umami-event-type="dark"
                        onclick={() => generateRandomThemeByType('dark')}
                    >
                        <Moon class="h-4 w-4" />
                        Random Dark Theme
                    </button>
                </li>
                <li>
                    <button
                        data-umami-event="random-theme"
                        data-umami-event-type="light"
                        onclick={() => generateRandomThemeByType('light')}
                    >
                        <Sun class="h-4 w-4" />
                        Random Light Theme
                    </button>
                </li>
                <div class="divider my-1"></div>
                <li>
                    <button
                        data-umami-event="random-theme"
                        data-umami-event-type="feeling-lucky"
                        onclick={startFeelingLucky}
                        class="text-accent"
                        disabled={feelingLuckyActive}
                    >
                        <Sparkles class="h-4 w-4" />
                        Feeling Lucky
                    </button>
                </li>
            </ul>
        {/if}
    </div>

    <!-- Templates - visible on desktop only -->
    {@render dockItem('Templates', () => select('Templates'))}
</div>