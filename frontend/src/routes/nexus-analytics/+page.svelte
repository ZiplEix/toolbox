<script lang="ts">
    import { Card, Button, Input } from "$lib/ui";
    import logo from "$lib/assets/lol-scraper-logo.png";
    import { onMount } from "svelte";

    let gameName = "";
    let tagLine = "";
    let matchId = "";
    let loading = false;
    let error = "";
    let success = false;
    let resultData: any = null;

    async function scrapeMatch() {
        console.log("Scrape match triggered");
        console.log("Game Name:", gameName);
        console.log("Tag Line:", tagLine);
        loading = true;
        error = "";
        success = false;
        resultData = null;

        try {
            const response = await fetch("/api/lol/match", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ gameName, tagLine, matchId }),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || "Failed to scrape match");
            }

            resultData = await response.json();
            success = true;
        } catch (err: any) {
            error = err.message;
        } finally {
            loading = false;
        }
    }

    function downloadJson() {
        if (!resultData) return;
        const dataStr =
            "data:text/json;charset=utf-8," +
            encodeURIComponent(JSON.stringify(resultData, null, 2));
        const downloadAnchorNode = document.createElement("a");
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute(
            "download",
            `match_${resultData.matchId}.json`,
        );
        document.body.appendChild(downloadAnchorNode); // required for firefox
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    }
</script>

<div class="min-h-[80vh] flex items-center justify-center p-4">
    <div class="w-full max-w-2xl mx-auto">
        <div class="flex flex-col items-center gap-4 mb-12">
            <div
                class="w-64 h-64 bg-white rounded-3xl shadow-sm p-6 flex items-center justify-center overflow-hidden"
            >
                <img
                    src={logo}
                    alt="Nexus Analytics Logo"
                    class="w-full h-full object-contain"
                />
            </div>
            <h1 class="text-4xl font-bold text-primary-400">
                Nexus Analytics
            </h1>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div class="space-y-2">
                <label
                    for="gameName"
                    class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >Riot ID Name</label
                >
                <Input
                    id="gameName"
                    placeholder="Hide on bush"
                    bind:value={gameName}
                />
            </div>
            <div class="space-y-2">
                <label
                    for="tagLine"
                    class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >Riot ID Tag</label
                >
                <Input id="tagLine" placeholder="KR1" bind:value={tagLine} />
            </div>
        </div>

        <div class="space-y-2 mb-8">
            <label
                for="matchId"
                class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >Match ID (Optional)</label
            >
            <Input id="matchId" placeholder="7619145043" bind:value={matchId} />
            <p class="text-xs text-gray-400">
                If provided, Game Name and Tag Line are ignored.
            </p>
        </div>

        <div class="mb-8">
            <Button onclick={scrapeMatch} disabled={loading} class="w-full">
                {loading ? "Scraping..." : "Scrape Match"}
            </Button>
        </div>

        {#if error}
            <div
                class="p-4 bg-red-900/50 text-red-200 rounded border border-red-800 mb-8"
            >
                {error}
            </div>
        {/if}

        {#if success && resultData}
            {@const participant = resultData.match.info.participants.find(
                (p: any) => {
                    if (gameName && tagLine) {
                        return (
                            p.riotIdGameName.toLowerCase() ===
                                gameName.toLowerCase() &&
                            p.riotIdTagline.toLowerCase() ===
                                tagLine.toLowerCase()
                        );
                    }
                    // If searching by Match ID, we might not know which participant is the user.
                    // For now, let's just show the first participant or handle it gracefully.
                    // Actually, if we search by Match ID, we don't have a "user" context.
                    // We should probably ask the user to select a participant or just show general info.
                    // But for this specific request, the user likely knows who they are looking for or just wants the data.
                    // Let's default to the first participant if no name provided, or maybe just hide the "personal" stats?
                    // Or better, if gameName is empty, we can't show "personal" stats easily.
                    // Let's try to find a participant that matches the "GameName" if provided, otherwise just pick the first one?
                    // Wait, the prompt said "recuperer toutes les infos d'une game".
                    // The UI currently focuses on ONE participant.
                    // If I search by Match ID, I don't have a "me".
                    // Let's just pick the first one for now to avoid breaking the UI,
                    // or maybe we can infer it if the user fills BOTH fields?
                    // The requirement was "If Match ID is present, use it. Otherwise use GameName/TagLine."
                    // So if I use Match ID, GameName might be empty.
                    return true; // Just pick the first one if we can't match
                },
            )}
            {@const isWin = participant.win}
            {@const durationMinutes = Math.floor(
                resultData.match.info.gameDuration / 60,
            )}
            {@const durationSeconds = resultData.match.info.gameDuration % 60}

            <div class="space-y-6 pt-8 border-t border-gray-800">
                <div
                    class={`p-6 rounded-xl border ${isWin ? "bg-green-500/10 border-green-500/20" : "bg-red-500/10 border-red-500/20"} backdrop-blur-sm`}
                >
                    <div class="flex justify-between items-start mb-6">
                        <div>
                            <h3
                                class={`text-2xl font-bold tracking-tight ${isWin ? "text-green-400" : "text-red-400"}`}
                            >
                                {isWin ? "VICTORY" : "DEFEAT"}
                            </h3>
                            <div class="flex items-center gap-2 mt-1">
                                <span
                                    class="px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200"
                                >
                                    {resultData.match.info.gameMode}
                                </span>
                                <span class="text-gray-600 text-sm">
                                    {durationMinutes}m {durationSeconds}s
                                </span>
                            </div>
                        </div>
                        <div class="text-right">
                            <p class="text-xl font-bold text-gray-900">
                                {participant.championName}
                            </p>
                            <p class="text-sm text-gray-500">
                                Level {participant.champLevel}
                            </p>
                        </div>
                    </div>

                    <div class="grid grid-cols-3 gap-4 mb-6">
                        <div
                            class="flex flex-col items-center p-3 bg-white/50 rounded-lg border border-gray-200 shadow-sm"
                        >
                            <p
                                class="text-xs text-gray-500 uppercase tracking-wider mb-1"
                            >
                                KDA
                            </p>
                            <p
                                class="text-xl font-mono font-bold text-gray-900"
                            >
                                {participant.kills}/{participant.deaths}/{participant.assists}
                            </p>
                        </div>
                        <div
                            class="flex flex-col items-center p-3 bg-white/50 rounded-lg border border-gray-200 shadow-sm"
                        >
                            <p
                                class="text-xs text-gray-500 uppercase tracking-wider mb-1"
                            >
                                CS
                            </p>
                            <p
                                class="text-xl font-mono font-bold text-gray-900"
                            >
                                {participant.totalMinionsKilled}
                            </p>
                        </div>
                        <div
                            class="flex flex-col items-center p-3 bg-white/50 rounded-lg border border-gray-200 shadow-sm"
                        >
                            <p
                                class="text-xs text-gray-500 uppercase tracking-wider mb-1"
                            >
                                Gold
                            </p>
                            <p
                                class="text-xl font-mono font-bold text-yellow-600"
                            >
                                {(participant.goldEarned / 1000).toFixed(1)}k
                            </p>
                        </div>
                    </div>
                </div>

                <Button
                    variant="primary"
                    class="w-full h-12 text-lg font-bold shadow-lg hover:scale-[1.02] transition-transform"
                    onclick={downloadJson}
                >
                    Download Full Match JSON
                </Button>
            </div>
        {/if}
    </div>
</div>
