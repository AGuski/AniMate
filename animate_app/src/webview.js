(() => {
	document.addEventListener("DOMContentLoaded", () => { 
		var webview = document.getElementById('webview');
		var refreshButton = document.getElementById('refreshButton');
		var deleteButton = document.getElementById('deleteButton');


		refreshButton.addEventListener('click', () => {
			webview.reload();
		});

		deleteButton.addEventListener('click', () => {
			webview.executeScript({ code: `
				var gallery = document.getElementById('hero-gallery');
				console.log(gallery);
				gallery.parentNode.removeChild(gallery);
				` });
		})
	});
})();