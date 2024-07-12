export interface Rec {
	id: number | null;
	name: string;
	url: string;
	rating: number;
	note: string;
}

interface Roll {
	id: string;
	name: string;
	recs: Rec[];
}
