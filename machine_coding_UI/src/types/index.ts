 export interface Friend {
    readonly id: string;
    readonly name: string;
  }
  
  export interface Bill {
    readonly id: string;
    readonly description: string;
    readonly amount: number;
    readonly friendIds: string[];
    readonly splitAmount: number;
  }
  