import { useEffect, useRef, useState } from "preact/hooks";
import Engine from "../../game/Engine";
import type { Status } from "../../game/Universe";

export default function Home() {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const [status, setStatus] = useState<Status>({
		aliveCells: 0,
		totalCells: 0,
		maxPopulation: 0,
		generationWithMaxPopulation: 0,
		generation: 0,
	});

	useEffect(() => {
		if (canvasRef.current) {
			const engine = Engine.getInstance(canvasRef.current);
			engine.start((stats: Status) => {
				setStatus(stats);
			});
		}
	}, []);

	return (
		<div>
			<p>Generation: {status.generation}</p>
			<p>Alive cells: {status.aliveCells}</p>
			<p>Max population: {status.maxPopulation}</p>
			<p>
				Generation with max population: {status.generationWithMaxPopulation}
			</p>
			<p>Total cells: {status.totalCells}</p>
			<canvas ref={canvasRef} />
		</div>
	);
}
