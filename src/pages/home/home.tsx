import { useEffect, useRef } from "preact/hooks";
import Engine from "../../game/Engine";

export default function Home() {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		if (canvasRef.current) {
			const engine = Engine.getInstance(canvasRef.current);
			engine.start();
		}
	}, []);

	return <canvas ref={canvasRef} />;
}
