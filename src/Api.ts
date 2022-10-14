export const BASE_URL = "https://api.friends-search.yeudaby.com/"

type SentenceDetails = {
    likes: number,
    verified: boolean
}

type SentenceLanguage = {
    language_code: string,
    language_name: string
}

type SentencePosition = {
    end: string,
    start: string,
    episode: number,
    season: number,
}

export type Sentence = {
    content: string,
    details: SentenceDetails,
    id: number,
    language: SentenceLanguage,
    position: SentencePosition,
}

export class Api {
    static async search(query: string): Promise<Sentence[]> {
        try {
            const response = await fetch(BASE_URL + "sentence/search?q=" + query)
            if (response.status === 200) {
                return await response.json() as Sentence[]
            } else {
                if (response.status === 404) {
                    return []
                }
                throw new Error("Unexpected status code: " + response.status)
            }
        }
        catch (e) {
            throw e;
        }
    }

    static async get(id: number): Promise<Sentence> {
        const response = await fetch(BASE_URL + "sentence/" + id)
        return await response.json() as Sentence
    }

    static like(id: number) {
        fetch(BASE_URL + "sentence/" + id + "/like", {method: "POST"})
    }

    static async getMostLiked(): Promise<Sentence[]> {
        const response = await fetch(BASE_URL + "sentence/likes")
        return await response.json() as Sentence[]
    }
}