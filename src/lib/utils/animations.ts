/**
 * Centralized animation configuration for premium, smooth transitions
 * Uses optimized easing functions and durations for a polished UX
 */

import { cubicOut, cubicIn, quintOut, backOut } from 'svelte/easing';

// Custom easing functions for premium feel
export const customEasing = {
	// Smooth deceleration - perfect for slide-ins and expansions
	smoothOut: (t: number) => {
		return 1 - Math.pow(1 - t, 3.5);
	},
	// Gentle acceleration - perfect for slide-outs and collapses
	smoothIn: (t: number) => {
		return Math.pow(t, 3.5);
	},
	// Spring-like bounce for playful elements
	spring: (t: number) => {
		const p = 0.3;
		return Math.pow(2, -10 * t) * Math.sin(((t - p / 4) * (2 * Math.PI)) / p) + 1;
	},
	// Elastic ease out for premium feel
	elastic: (t: number) => {
		if (t === 0 || t === 1) return t;
		const p = 0.4;
		return Math.pow(2, -10 * t) * Math.sin(((t - p / 4) * (2 * Math.PI)) / p) + 1;
	}
};

// Duration presets (in milliseconds)
export const duration = {
	fast: 200,
	normal: 300,
	slow: 450,
	verySlow: 600
};

// Premium animation presets for common use cases
export const animations = {
	// Panel slide-in from right (editor, tool panels)
	panelSlideIn: {
		duration: duration.slow,
		easing: customEasing.smoothOut,
		axis: 'x' as const
	},
	// Panel slide-out to right
	panelSlideOut: {
		duration: duration.normal,
		easing: customEasing.smoothIn,
		axis: 'x' as const
	},
	// Vertical drawer slide-in from bottom
	drawerSlideIn: {
		duration: duration.slow,
		easing: quintOut
	},
	// Vertical drawer slide-out to bottom
	drawerSlideOut: {
		duration: duration.normal,
		easing: cubicIn
	},
	// Fade in for device selector and overlays
	fadeIn: {
		duration: duration.normal,
		easing: cubicOut
	},
	// Fade out
	fadeOut: {
		duration: duration.fast,
		easing: cubicIn
	},
	// Scale in for content tabs and modals
	scaleIn: {
		duration: duration.slow,
		easing: backOut,
		start: 0.92,
		opacity: 0
	},
	// Scale out
	scaleOut: {
		duration: duration.normal,
		easing: cubicIn,
		start: 0.92,
		opacity: 0
	},
	// Fly in from right (advanced settings panel)
	flyInRight: {
		x: 60,
		opacity: 0,
		duration: duration.slow,
		easing: customEasing.smoothOut
	},
	// Fly out to right
	flyOutRight: {
		x: 60,
		opacity: 0,
		duration: duration.normal,
		easing: customEasing.smoothIn
	},
	// Slide in toolbar (preview engine toolbar)
	toolbarSlideIn: {
		duration: duration.normal,
		easing: quintOut
	},
	// Slide out toolbar
	toolbarSlideOut: {
		duration: duration.fast,
		easing: cubicIn
	}
};

// CSS transition classes for inline style animations
export const cssTransitions = {
	// Smooth all properties
	smooth: 'transition-all duration-300 ease-out',
	// Smooth with longer duration
	smoothSlow: 'transition-all duration-500 ease-out',
	// Transform only (better performance)
	transform: 'transition-transform duration-300 ease-out',
	// Transform with spring-like effect
	transformSpring: 'transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]',
	// Colors and opacity
	colors: 'transition-[color,background-color,border-color,opacity] duration-300 ease-out',
	// Premium device size animation
	deviceResize: 'transition-[width,height] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]'
};

// Will-change optimization for better performance
export const willChange = {
	transform: 'will-change: transform;',
	size: 'will-change: width, height;',
	opacity: 'will-change: opacity;',
	all: 'will-change: transform, opacity;'
};
