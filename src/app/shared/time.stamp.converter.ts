export class TimeStamp {
  static fromDateString(dateString: string): { seconds: number, nanoseconds: number } {
    // Parse the date string to a Date object in UTC
    const date = new Date(dateString);

    // Convert the UTC Date object to an EST Date object
    const estOffset = -5 * 60; // EST offset from UTC in seconds
    const estTimestamp = date.getTime() + estOffset * 1000;
    const estDate = new Date(estTimestamp);

    // Convert the EST Date object to a Firestore Timestamp object
    const timestamp = {
      seconds: Math.floor(estDate.getTime() / 1000),
      nanoseconds: (estDate.getTime() % 1000) * 1000000,
    };

    return timestamp;
  }
}

