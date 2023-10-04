"use strict";

// IDを取得する
function ID(element) {
	return document.getElementById(element);
}
// 乱数を返す
function random(limit,start) {
	if (start = false)  start = 0;
	return Math.floor( Math.random() * limit + start );
}
// クラスのshow/hideを付け消しする
function hide_or_show(element, bool) {
	if (bool==="remove") {
		element.classList.remove("is-show");
		element.classList.remove("is-hide");
	} else if (bool===false) {
		element.classList.add("is-hide");
		element.classList.remove("is-show");
	} else {
		element.classList.add("is-show");
		element.classList.remove("is-hide");
	}
}

// うさホバーchange
{
	const usa = ID("avator");
	usa.addEventListener("click", (e)=>{
		console.log(e.target.dataset.avator);

		if (e.target.dataset.avator === "stop") {
			e.target.src = "img/kikko-gif.gif";
			e.target.dataset.avator = "play"
		} else {
			e.target.src = "img/kikko.png";
			e.target.dataset.avator = "stop"
		}
	});
}

// ------------------------------------------------------------
// ナビゲーション
// * チェックボックスの値に応じて開閉。MQ変化があったら閉じさせる
// ------------------------------------------------------------
{
	let bool_top;	// ページトップにいるかどうかを真偽値で入力
	let bool_sp;	// SPかPCかを真偽値で入力
	const nav = document.getElementById("main-nav");
	const link = nav.getElementsByTagName("a");
	const input = document.getElementById("nav-input");
	const burgerBtn = document.getElementsByClassName("nav-button")[0];

	// チェックボックス対応
	function navAction() {
		input.addEventListener("change", function () {
			if (input.checked === true) {
				hide_or_show(nav, true);
			} else {
				hide_or_show(nav, false);
				// 閉じた時トップならボタン消す
				// if (bool_top===true)
				// 	hide_or_show(burgerBtn, false);
			}
		});
		// MQチェンジ時に開閉状態を消すなど
		const mq = window.matchMedia( "(min-width: 681px)" );
		const mqChangeFunc = () => {
			if (mq.matches) {
				bool_sp = false;
				// console.log("SP?: "+bool_sp);
				hide_or_show(nav, "remove");
				hide_or_show(burgerBtn, "remove");
				input.checked = false;
			} else {
				bool_sp = true;
				for (let i = 0; i < link.length; i++) {
					link[i].addEventListener("click", ()=> {
						input.checked = false;
						hide_or_show(nav, false);
					});
				}
			}
		}
		mq.addEventListener("change", mqChangeFunc);
		mqChangeFunc();
	}
	navAction();


	// ------------------------------------------------------------
	// ヘッダーsticky風固定
	// トップに戻るボタン
	// * checkPointの見える/見えないをスティッキー化判定につかう
	// ------------------------------------------------------------
	function headerSticky() {
		const header = document.getElementById("header");
		const pagetopBtn = document.getElementById("back-to-top");
		backToTop(pagetopBtn);

		// 切り替え時の処理 -----
		const stickyChange = (entries)=> {
			if (entries[0].isIntersecting) {
				bool_top = true;
				header.classList.remove("is-sticky");
				hide_or_show(pagetopBtn,false);

				// メニューを開いていたらボタンを消さない
				// if (nav.classList.contains("is-show")===false) {
				// 	hide_or_show(burgerBtn,false);
				// }
			} else {
				bool_top = false;
				header.classList.add("is-sticky");
				hide_or_show(pagetopBtn,true);
				hide_or_show(burgerBtn,true);
			}
		}
		const Observer = new IntersectionObserver(stickyChange);
		const checkPoint =
		// オブザーバー判定に使う要素を指定する
			document.querySelector(".u_change-lang-box");
			// document.getElementById("profile");
		Observer.observe(checkPoint);
	}
	headerSticky();

	// トップに戻るボタン
	// ------------------------------------------------------------
	function backToTop(btn) {
		btn.addEventListener("click", () => {
			window.scrollTo({
				top: 0,
				behavior: "smooth",
			});
			hide_or_show(btn,false)
		});
	}
}

// ------------------------------------------------------------
// アートワークをモーダルスライド表示
// ------------------------------------------------------------
function artworkSlider() {

	const
		imgArea = ID("modal-1__img-area"),
		img = imgArea.children,
		prev = ID("modal-1__prev"),
		next = ID("modal-1__next"),
		dots = ID("modal-1__dot");
	let NUM;	// 共用 - 画像のNo.


	// imgArea内の画像にdata-numをセット
	for ( let i=0; i < img.length; i++) {
		img[i].dataset.artNum = i+1;
		img[i].classList.add("is-hide");
	}

	// ドットリスト作成 ------------------------------
	let createDot;
	for (let i=0; i < img.length; i++) {
		createDot = document.createElement("button");
		createDot.dataset.artNum = i;
		createDot.type = "button";
		createDot.tabIndex = "-1";
		createDot.addEventListener("click", (e)=>{
			artShow(e.target.dataset.artNum);
		});
		dots.appendChild(createDot);
	}

	// 画像を表示させる関数 ---------------------------
	function artShow(number) {
		// 引数がshuffleだったらランダム選択
		(number === "shuffle")
		? NUM = random(img.length)
		: NUM = number;

		artHide();	// 一旦全部is-hideにする
		img[NUM].className = "is-show";

	// ドットのclassチェンジ
		for (const dot of dots.children) {
			if (dot.className !== "") {
				dot.className = "";
				dot.disabled = false;
			}
		}
		// console.log("artShow NUM: "+NUM);
		dots.children[NUM].className = "is-active";
		dots.children[NUM].disabled = true;
	}

	// .is-show があれば .is-hideにする
	function artHide() {
		for (let i = 0; i < img.length; i++) {
			if (img[i].className = "is-show") img[i].className = "is-hide";
		}
	}

	// 左右画像送りボタン -------------------------
	function artSlidePrev() {
		(NUM <= 0) ?  NUM = img.length-1  :  NUM--;
		artShow(NUM);
	}
	function artSlideNext() {
		(NUM >= img.length-1) ?  NUM = 0  :  NUM++;
		artShow(NUM);
	}
	prev.addEventListener("click", artSlidePrev);
	next.addEventListener("click", artSlideNext);

	// モーダル起動時のトリガーになった要素の、data-art-num="整数"をNUMにセットして表示
	function artClick(trigger) {
		NUM = trigger.dataset.artNum;
		artShow(NUM);
	}

	// モーダル初期化起動 --------------------------
	MicroModal.init({
		awaitOpenAnimation: true,
		// disableScroll: true,
		onShow: (modal,trigger) => artClick(trigger),
		onClose: ()=> artHide()
	});

	// const folderPath = "/img/artworks/";
	// const artList = [
	// 	"2019-03-21.jpg",
	// 	"2019-06-10 kyoto-tower.jpg",
	// 	"2019-07-16ガラスカップ他.jpg",
	// 	"2019-07-24 the memory of old mansion.jpg",
	// 	"2019-10-20 kagura.jpg",
	// 	"2020-01-05 ワンドロ海鳥.jpg",
	// 	"2020-01-11 sweet little store.jpg",
	// 	"2020-01-13 sweet potato pie.jpg",
	// 	"2020-02-10 手水鉢.jpg",
	// 	"2020-02-11 Yuzaku at sea.jpg",
	// 	"puzzle2.jpg",
	// 	"puzzle3.jpg",
	// 	"puzzle4.jpg",
	// 	"炎舞の祭典サイン込みRGB.jpg",
	// 	"海底都市コンコースRGB(サイン).jpg"
	// ];
	// 画像をDIV内にすべてセット
	// for ( let i=0; i < artList.length; i++ ) {
	// 	let newImg = document.createElement("img");
	// 	newImg.dataset.num = i+1;
	// 	newImg.src = `${folderPath}${artList[i]}`
	// 	imgArea.appendChild(newImg);
	// }

}
artworkSlider();


// ------------------------------------------------------------
// Twitchのsrcを自動セット
// ------------------------------------------------------------
{
	const twitch = ID("embed-twitch");
	twitch.src = "https://player.twitch.tv/?autoplay=false&collection=KNBEdVGxghUfMg&parent=" + location.hostname
}

// ------------------------------------------------------------
// TumblrのNEWS記事取得
// 参考: https://shirasaka.tv/2539
// ------------------------------------------------------------
function getTumblr() {
	const SHOW_NUMBER = 3; // 表示させたい最新記事数

	let title, body, url, tag, gmt, data, d, mon, day;
	let post = tumblr_api_read["posts"];
	let output = "";
	for (let i=0; i < SHOW_NUMBER; i++) {
		tag = post[i]["tags"];
		if (tag === undefined) {
			tag = "-";
		}
		title = post[i]["regular-title"];
		body = post[i]["regular-body"]
		url = post[i]["url"];
		gmt = post[i]["date-gmt"];
		d = new Date(gmt);
		mon = ("0" + (d.getMonth() + 1)).slice(-2);
		day = ("0" + d.getDate()).slice(-2);
		data = d.getFullYear() + "/" + mon + "/" + day;
		output += `<dt class="mb10"><a href="${url}" target="_blank">${data}</a><br><div class="font-smallsmall font-white">#${tag}</div></dt><dd class="mb10 marker-link"><a href="${url}" target="_blank"><span class="font-bold">${title} </span></a><br><div class="mb10 font-small indent u_readmore">${body}</div></dd>`;
	}
	document.getElementById("tumblr-news").innerHTML = output;
}
getTumblr();






// ------------------------------------------------------------
// ロード完了
// ------------------------------------------------------------
// window.onload = function() {
// 	document.getElementById("loading").classList.add("is-loadfin");
// }