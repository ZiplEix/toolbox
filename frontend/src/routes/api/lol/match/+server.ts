import { RIOT_API_KEY } from '$env/static/private';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

const REGION_ROUTE = 'europe';

interface Account {
    puuid: string;
    gameName: string;
    tagLine: string;
}

// ... Add other interfaces as needed based on main.go ...

async function getPUUID(gameName: string, tagLine: string): Promise<string> {
    const url = `https://${REGION_ROUTE}.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${encodeURIComponent(gameName)}/${tagLine}?api_key=${RIOT_API_KEY}`;
    const res = await fetch(url);
    if (!res.ok) {
        const body = await res.text();
        throw new Error(`API error (PUUID): ${res.status} - ${body}`);
    }
    const acc: Account = await res.json();
    return acc.puuid;
}

async function getMatchIDs(puuid: string, count: number = 1, queueType: string = ''): Promise<string[]> {
    let url = `https://${REGION_ROUTE}.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=${count}&api_key=${RIOT_API_KEY}`;
    if (queueType) {
        url += `&type=${queueType}`;
    }
    const res = await fetch(url);
    if (!res.ok) {
        const body = await res.text();
        throw new Error(`API error (MatchIDs): ${res.status} - ${body}`);
    }
    return await res.json();
}

async function getMatch(matchId: string): Promise<any> {
    const url = `https://${REGION_ROUTE}.api.riotgames.com/lol/match/v5/matches/${matchId}?api_key=${RIOT_API_KEY}`;
    const res = await fetch(url);
    if (!res.ok) {
        const body = await res.text();
        throw new Error(`API error (Match): ${res.status} - ${body}`);
    }
    return await res.json();
}

async function getMatchTimeline(matchId: string): Promise<any> {
    const url = `https://${REGION_ROUTE}.api.riotgames.com/lol/match/v5/matches/${matchId}/timeline?api_key=${RIOT_API_KEY}`;
    const res = await fetch(url);
    if (!res.ok) {
        const body = await res.text();
        throw new Error(`API error (Timeline): ${res.status} - ${body}`);
    }
    return await res.json();
}

export const POST: RequestHandler = async ({ request }) => {
    try {
        const { gameName, tagLine, matchId: inputMatchId } = await request.json();
        let matchId = inputMatchId;

        if (!matchId) {
            if (!gameName || !tagLine) {
                return json({ error: 'Riot ID Name and Tag are required if Match ID is not provided.' }, { status: 400 });
            }
            const puuid = await getPUUID(gameName, tagLine);
            const matchIDs = await getMatchIDs(puuid, 1);

            if (matchIDs.length === 0) {
                return json({ error: 'No matches found.' }, { status: 404 });
            }
            matchId = matchIDs[0];
        } else {
            // Handle numeric ID by prepending default region
            if (/^\d+$/.test(matchId)) {
                matchId = `EUW1_${matchId}`;
            }
        }

        const [matchData, timelineData] = await Promise.all([
            getMatch(matchId),
            getMatchTimeline(matchId)
        ]);

        return json({
            match: matchData,
            timeline: timelineData,
            matchId: matchId
        });

    } catch (error: any) {
        console.error('Scraping error:', error);
        return json({ error: error.message }, { status: 500 });
    }
};
