"use client";

// Temporary preview page used only to capture before/after screenshots for the PR.
// Shows the real CommitsToolbar classes in both the old (before) and new (after) state.

import { useState } from "react";
import { GitBranch, ChevronDown, Search, Check } from "lucide-react";

const BRANCHES = [
	{ name: "main" },
	{ name: "dev" },
	{ name: "feature/better-toolbar" },
];

// ─── Before: BranchPicker button used `py-2` (≈27 px) instead of `h-9`
function BranchPickerBefore({ currentBranch }: { currentBranch: string }) {
	return (
		<button
			type="button"
			className="flex items-center gap-1.5 py-2 px-3 text-[11px] font-mono border border-border hover:bg-muted/60 dark:hover:bg-white/3 transition-colors cursor-pointer"
		>
			<GitBranch className="w-3 h-3 text-muted-foreground/70" />
			<span className="max-w-[140px] truncate">{currentBranch}</span>
			<ChevronDown className="w-3 h-3 ml-auto text-muted-foreground/50" />
		</button>
	);
}

// ─── After: BranchPicker button uses `h-9`
function BranchPickerAfter({ currentBranch }: { currentBranch: string }) {
	return (
		<button
			type="button"
			className="flex items-center gap-1.5 h-9 px-3 text-[11px] font-mono border border-border hover:bg-muted/60 dark:hover:bg-white/3 transition-colors cursor-pointer"
		>
			<GitBranch className="w-3 h-3 text-muted-foreground/70" />
			<span className="max-w-[140px] truncate">{currentBranch}</span>
			<ChevronDown className="w-3 h-3 ml-auto text-muted-foreground/50" />
		</button>
	);
}

// ─── Before toolbar: branch `py-2` + search `py-2 text-sm` + date `py-2 text-xs` → mismatched heights
function ToolbarBefore() {
	return (
		<div className="flex items-center gap-2">
			<BranchPickerBefore currentBranch="main" />
			<div className="relative flex-1">
				<input
					type="text"
					readOnly
					placeholder="Search commits..."
					className="w-full rounded-md border border-border bg-background py-2 px-3 pl-9 text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-ring"
				/>
				<Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground/50 w-3.5 h-3.5" />
			</div>
			<input
				type="date"
				readOnly
				defaultValue="2025-01-01"
				title="Since date"
				className="rounded-md border border-border bg-background py-2 px-2 font-mono text-xs text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
			/>
			<input
				type="date"
				readOnly
				defaultValue="2025-12-31"
				title="Until date"
				className="rounded-md border border-border bg-background py-2 px-2 font-mono text-xs text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
			/>
			<button
				type="button"
				className="rounded-md border border-border bg-background py-2 flex items-center px-2 text-xs text-muted-foreground transition-colors hover:bg-muted hover:text-foreground cursor-pointer"
			>
				✕
			</button>
		</div>
	);
}

// ─── After toolbar: all elements use `h-9` → uniform height
function ToolbarAfter() {
	return (
		<div className="flex items-center gap-2">
			<BranchPickerAfter currentBranch="main" />
			<div className="relative flex-1">
				<input
					type="text"
					readOnly
					placeholder="Search commits..."
					className="w-full rounded-md border border-border bg-background h-9 px-3 pl-9 text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-ring"
				/>
				<Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground/50 w-3.5 h-3.5" />
			</div>
			<input
				type="date"
				readOnly
				defaultValue="2025-01-01"
				title="Since date"
				className="rounded-md border border-border bg-background h-9 px-2 font-mono text-xs text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
			/>
			<input
				type="date"
				readOnly
				defaultValue="2025-12-31"
				title="Until date"
				className="rounded-md border border-border bg-background h-9 px-2 font-mono text-xs text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
			/>
			<button
				type="button"
				className="rounded-md border border-border bg-background h-9 flex items-center px-2 text-xs text-muted-foreground transition-colors hover:bg-muted hover:text-foreground cursor-pointer"
			>
				✕
			</button>
		</div>
	);
}

// Commit row skeleton to show the toolbar in context
function CommitSkeleton({ n }: { n: number }) {
	const widths = [220, 280, 190, 310, 240];
	return (
		<div className="border border-border rounded-md overflow-hidden divide-y divide-border/40">
			{Array.from({ length: n }).map((_, i) => (
				<div key={i} className="flex items-center gap-3 px-4 py-3">
					<div className="h-4 w-4 rounded bg-muted/30 shrink-0" />
					<div className="flex-1 space-y-1.5">
						<div
							className="h-3.5 rounded bg-muted/40"
							style={{ width: widths[i % widths.length] }}
						/>
						<div className="flex items-center gap-2">
							<div className="h-4 w-4 rounded-full bg-muted/25" />
							<div className="h-2.5 w-20 rounded bg-muted/20" />
						</div>
					</div>
					<div className="h-3 w-16 rounded bg-muted/20 font-mono shrink-0" />
				</div>
			))}
		</div>
	);
}

export default function PreviewPage() {
	return (
		<div className="min-h-screen bg-background text-foreground p-8 space-y-10 max-w-4xl mx-auto">
			<div>
				<p className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground mb-1">
					Before
				</p>
				<p className="text-xs text-muted-foreground mb-4">
					Branch picker uses <code className="font-mono bg-muted px-1 rounded">py-2</code> → height ≈ 27 px, while search input is 36 px and date inputs are 32 px
				</p>
				<div className="space-y-4" id="before">
					<ToolbarBefore />
					<CommitSkeleton n={4} />
				</div>
			</div>

			<hr className="border-border" />

			<div>
				<p className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground mb-1">
					After
				</p>
				<p className="text-xs text-muted-foreground mb-4">
					All toolbar elements use <code className="font-mono bg-muted px-1 rounded">h-9</code> → uniform 36 px height
				</p>
				<div className="space-y-4" id="after">
					<ToolbarAfter />
					<CommitSkeleton n={4} />
				</div>
			</div>
		</div>
	);
}
