// ページ内目次を作成
{
	const article = document.getElementsByTagName("article");
	const heads = article[0].querySelectorAll("h3");
	// console.log(heads);
	if (heads && heads.length) {
		let contents = '';
		heads.forEach( (head, i) => {
			contents += `<li><a href="#head${i}">${head.textContent}</a></li>`;
			head.innerHTML += `<a id="head${i}"></a>`;
		});
		document.getElementById("pagelink").innerHTML += `<details class="js-toc"><summary>もくじ</summary><ol>${contents}</ol></details>`;

	}
}