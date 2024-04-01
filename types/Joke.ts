export interface Joke {
    user: {
        profile: number;
        name: string;
        backgroundId: string;
    };
    userId: string;
    textBody: string;
    position: number;
    score: number;
    boostable: boolean;
    contestId: number;
}