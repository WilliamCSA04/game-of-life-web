import Universe, { type Status } from "./Universe";

export default class Engine {
	private static instance: Engine;
	private universe: Universe;
	private canvas: HTMLCanvasElement;
	private ctx: CanvasRenderingContext2D;

	private constructor(canvas: HTMLCanvasElement) {
		this.canvas = canvas;
		const context = canvas.getContext("2d");
		if (!context) {
			throw new Error("Failed to get 2D context");
		}
		this.ctx = context;
		this.universe = Universe.bigBang(canvas.width, canvas.height);
	}

	public static getInstance(canvas: HTMLCanvasElement): Engine {
		if (!Engine.instance) {
			Engine.instance = new Engine(canvas);
		}
		return Engine.instance;
	}

	private update() {
		this.universe.updateUniverse();
		this.draw();
	}

	private draw() {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		for (const cell of this.universe.getCells) {
			const { x, y } = cell.coords;
			if (cell.isAlive) {
				this.ctx.fillStyle = "#000";
			} else {
				this.ctx.fillStyle = "#fff";
			}
			this.ctx.fillRect(x, y, 1, 1);
		}
	}

	public start(statsFn: (stats: Status) => unknown) {
		setInterval(() => {
			statsFn(this.universe.stats());
			this.update();
		}, 1000 / 30);
	}
}
