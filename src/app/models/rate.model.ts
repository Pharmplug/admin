export default class RateLogs {
    id?: string;
    symbol!: string;
    country!: string;
    history!: {
        rate: any,
        date_time: any
    }[];
}