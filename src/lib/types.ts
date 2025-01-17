export interface Rec {
	id: number | null;
	name: string;
	url: string;
	rating: number;
	description: string;
}

export interface NewRec {
	id: null;
	name: string;
	url: string;
	rating: number | null;
	description: string;
}

interface Roll {
	id: number;
	name: string;
	description: string;
	recs: Rec[];
}
