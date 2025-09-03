(() => { // Listen for live reload signals via WS
	const ws = new WebSocket("ws://localhost:35729");
	ws.onmessage = (msg) => {
		if (msg.data === "reload") {
			console.log("♻️ Reloading page...");
			window.location.reload();
		}
	};
})();