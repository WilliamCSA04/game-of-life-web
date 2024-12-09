export default class Cell {
	constructor(
		readonly x: number,
		readonly y: number,
		private alive = false,
	) {}

	public get coords() {
		return { x: this.x, y: this.y };
	}

	public get isAlive() {
		return this.alive;
	}

	public set setAlive(value: boolean) {
		this.alive = value;
	}

	public clone(): Cell {
		return new Cell(this.x, this.y, this.alive);
	}
}
