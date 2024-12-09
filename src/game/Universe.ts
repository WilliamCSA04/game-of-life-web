import Cell from "./Cell";

export default class Universe {
	private static instance: Universe;
	private cells: Cell[] = [];

	private constructor(
		readonly width: number,
		readonly height: number,
	) {
		for (let y = 0; y < this.height; y++) {
			for (let x = 0; x < this.width; x++) {
				const startAlive = Math.random() < 0.5;
				this.cells.push(new Cell(x, y, startAlive));
			}
		}
	}

	public static bigBang(width: number, height: number): Universe {
		if (!Universe.instance) {
			Universe.instance = new Universe(width, height);
		}
		return Universe.instance;
	}

	private getNeighbors(x: number, y: number): Cell[] {
		const deltas = [-1, 0, 1];
		const neighbors: Cell[] = [];

		for (const dx of deltas) {
			for (const dy of deltas) {
				if (dx === 0 && dy === 0) continue;

				const neighborX = x + dx;
				const neighborY = y + dy;

				if (
					neighborX >= 0 &&
					neighborX < this.width &&
					neighborY >= 0 &&
					neighborY < this.height
				) {
					neighbors.push(this.cells[neighborY * this.width + neighborX]);
				}
			}
		}

		return neighbors;
	}

	public updateUniverse() {
		const clonedCells: Cell[] = [];
		for (const cell of this.cells) {
			const { x, y } = cell.coords;
			const neighbors = this.getNeighbors(x, y);
			const aliveNeighbors = neighbors.filter((n: Cell) => n.isAlive).length;
			const keepAlive = cell.isAlive
				? aliveNeighbors === 3 || aliveNeighbors === 2
				: aliveNeighbors === 3;
			const nextGenCell = cell.clone();
			nextGenCell.setAlive = keepAlive;
			clonedCells.push(nextGenCell);
		}
		this.cells = clonedCells;
	}

	public get getCells() {
		return this.cells;
	}
}
