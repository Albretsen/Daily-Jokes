export interface Contest {
    topic: string;
    date: string;
    id: number;
    participants: [{
        id: number,
        /**
        * @property profile: Avatar id (who knows why...)
        **/
        profile: number,
        name: string;
        backgroundId: 0,
    }]
    totalParticipants: number;
}