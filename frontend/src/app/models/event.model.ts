export interface Event {
    _id: string;
    title: string;
    description?: string;
    date: Date;
    attendees: any[];
    createdBy: any;
    createdAt: Date;
    updatedAt: Date;
}