export interface Joke {
    user: {
        profile: number;
        name: string;
        backgroundId: number;
    };
    userId: string;
    textBody: string;
    position: number;
    score: number;
    boostable: boolean;
    contestId: number;
    id: number;
    boost: number;
}