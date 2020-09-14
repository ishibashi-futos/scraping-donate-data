import {format, DateFormatter, analysis} from './scheduleAnalysis'
import {JSDOM} from "jsdom"

describe("scheduleAnalysisのテスト", () => {
  describe("format関数のテスト", () => {
    test("意図した値が取得できるか", () => {
      expect(format("9月11日(金)")).toBe("9/11")
      expect(format("9月12日(土)")).toBe("9/12")
      expect(format("9月13日(日)")).toBe("9/13")
      expect(format("9月14日(月)")).toBe("9/14")
      expect(format("9月15日(火)")).toBe("9/15")
      expect(format("9月16日(水)")).toBe("9/16")
      expect(format("9月17日(木)")).toBe("9/17")
    })
  })

  describe("DateFormatterのテスト", () => {
    const formatter = DateFormatter()
    test("文字列表現に変換できるか", () => {
      expect(formatter.format(new Date(2020, 0, 2))).toBe("1/2")
      expect(formatter.format(new Date(1992, 10, 16))).toBe("11/16")
      const today = new Date()
      expect(formatter.format(today)).toBe(`${today.getMonth() + 1}/${today.getDate()}`)
    })
  })

  describe("analysis関数のテスト", () => {
    test("当日の日時が一致する場合", async () => {
      const today = new Date(2020, 8, 13)
      const result = await analysis(new JSDOM(html), today)
      expect(await result).toBeTruthy()
    })
    test("当日の日時が一致しない場合", async () => {
      const today = new Date(2020, 8, 1)
      const result = await analysis(new JSDOM(html), today)
      expect(await result).toBeFalsy()
    })
    test("期待するHTMLの仕様ではない場合, elements not foundが返却される", () => {
      // https://jestjs.io/docs/ja/asynchronous
      // 想定した数のassertionが呼ばれていることを確認するため、assertionsを追加する
      expect.assertions(1)
      // テスト関数からpromiseを返すようにすると、resolveまたはrejectされるまで待機します
      return analysis(new JSDOM(""), new Date())
      .catch(e => {
        expect(e).toBe("elements not found.")
      })
    })
  })
})

const html = `
<HTML>
<body id="cat-place" class="page-m1_03_bus ">
	<div id="wrapper">
	<div class="mod-contentArea">
		<header class="mod-header">
			<div class="mod-header-in mod-wrapin">
				<div class="mod-header-head">
					<div class="mod-header-head-logo">
						<a href="https://www.bs.jrc.or.jp/th/aomori/">
							<figure class="mod-header-head-logo-img"><img alt="日本赤十字社" height="42" src="/common/img/base/logo_01.png" width="160"></figure>
							<p class="mod-header-head-logo-txt"><img alt="青森県赤十字血液センター" src="/common/img/base/logo_center_61.svg" width="200"></p>
						</a>
					</div>
					<div class="mod-header-head-col2">
						<div class="mod-header-head-col2-head">
							<div class="mod-header-head-search">
								<div class="mod-header-head-search-in">
									<script>
									(function() {
									var cx = '012754520406554269719:kiffpd4wirg';
									var gcse = document.createElement('script');
									gcse.type = 'text/javascript';
									gcse.async = true;
									gcse.src = 'https://cse.google.com/cse.js?cx=' + cx;
									var s = document.getElementsByTagName('script')[0];
									s.parentNode.insertBefore(gcse, s);
									})();
									</script>
									<div id="___gcse_0"><div class="gsc-control-cse gsc-control-cse-ja"><div class="gsc-control-wrapper-cse" dir="ltr"><form class="gsc-search-box gsc-search-box-tools" accept-charset="utf-8"><table cellspacing="0" cellpadding="0" class="gsc-search-box"><tbody><tr><td class="gsc-input"><div class="gsc-input-box" id="gsc-iw-id1"><table cellspacing="0" cellpadding="0" id="gs_id50" class="gstl_50 gsc-input" style="width: 100%; padding: 0px;"><tbody><tr><td id="gs_tti50" class="gsib_a"><input autocomplete="off" type="text" size="10" class="gsc-input" name="search" title="検索" id="gsc-i-id1" dir="ltr" spellcheck="false" style="width: 100%; padding: 0px; border: none; margin: 0px; height: auto; background: url(&quot;https://www.google.com/cse/static/images/1x/ja/branding.png&quot;) left center no-repeat rgb(255, 255, 255); outline: none;"></td><td class="gsib_b"><div class="gsst_b" id="gs_st50" dir="ltr"><a class="gsst_a" href="javascript:void(0)" title="検索ボックスをクリア" role="button" style="display: none;"><span class="gscb_a" id="gs_cb50" aria-hidden="true">×</span></a></div></td></tr></tbody></table></div></td><td class="gsc-search-button"><button class="gsc-search-button gsc-search-button-v2"><svg width="13" height="13" viewBox="0 0 13 13"><title>検索</title><path d="m4.8495 7.8226c0.82666 0 1.5262-0.29146 2.0985-0.87438 0.57232-0.58292 0.86378-1.2877 0.87438-2.1144 0.010599-0.82666-0.28086-1.5262-0.87438-2.0985-0.59352-0.57232-1.293-0.86378-2.0985-0.87438-0.8055-0.010599-1.5103 0.28086-2.1144 0.87438-0.60414 0.59352-0.8956 1.293-0.87438 2.0985 0.021197 0.8055 0.31266 1.5103 0.87438 2.1144 0.56172 0.60414 1.2665 0.8956 2.1144 0.87438zm4.4695 0.2115 3.681 3.6819-1.259 1.284-3.6817-3.7 0.0019784-0.69479-0.090043-0.098846c-0.87973 0.76087-1.92 1.1413-3.1207 1.1413-1.3553 0-2.5025-0.46363-3.4417-1.3909s-1.4088-2.0686-1.4088-3.4239c0-1.3553 0.4696-2.4966 1.4088-3.4239 0.9392-0.92727 2.0864-1.3969 3.4417-1.4088 1.3553-0.011889 2.4906 0.45771 3.406 1.4088 0.9154 0.95107 1.379 2.0924 1.3909 3.4239 0 1.2126-0.38043 2.2588-1.1413 3.1385l0.098834 0.090049z"></path></svg></button></td><td class="gsc-clear-button"><div class="gsc-clear-button" title="結果をクリア">&nbsp;</div></td></tr></tbody></table></form><div class="gsc-results-wrapper-overlay"><div class="gsc-results-close-btn" tabindex="0"></div><div class="gsc-positioningWrapper"><div class="gsc-tabsAreaInvisible"><div aria-label="refinement" role="tab" class="gsc-tabHeader gsc-inline-block gsc-tabhActive">カスタム検索</div><span class="gs-spacer"> </span></div></div><div class="gsc-positioningWrapper"><div class="gsc-tabsAreaInvisible"></div></div><div class="gsc-above-wrapper-area-invisible"><table cellspacing="0" cellpadding="0" class="gsc-above-wrapper-area-container"><tbody><tr><td class="gsc-result-info-container"><div class="gsc-result-info-invisible"></div></td><td class="gsc-orderby-container"><div class="gsc-orderby-invisible"><div class="gsc-orderby-label gsc-inline-block">表示順:</div><div class="gsc-option-menu-container gsc-inline-block"><div class="gsc-selected-option-container gsc-inline-block"><div class="gsc-selected-option">Relevance</div><div class="gsc-option-selector"></div></div><div class="gsc-option-menu-invisible"><div class="gsc-option-menu-item gsc-option-menu-item-highlighted"><div class="gsc-option">Relevance</div></div><div class="gsc-option-menu-item"><div class="gsc-option">Date</div></div></div></div></div></td></tr></tbody></table></div><div class="gsc-adBlockInvisible"></div><div class="gsc-wrapper"><div class="gsc-adBlockInvisible"></div><div class="gsc-resultsbox-invisible"><div class="gsc-resultsRoot gsc-tabData gsc-tabdActive"><div><div class="gsc-expansionArea"></div></div></div></div></div></div><div class="gsc-modal-background-image" tabindex="0"></div></div></div></div>
								</div>
							</div>
							<ul class="mod-header-head-links">
								<li class="mod-header-head-links-item"><a href="http://www.jrc.or.jp/donation/qa/" target="_blank">よくあるご質問</a></li>
								<li class="mod-header-head-links-item"><a href="https://www.bs.jrc.or.jp/th/aomori/m0_01_sitemap.html">サイトマップ</a></li>
								<li class="mod-header-head-links-item"><a href="https://www.bs.jrc.or.jp/th/aomori/m0_02_contact.html">お問い合わせ</a></li>
							</ul>
						</div>
						<aside class="mod-header-head-name">
							<img alt="Japanese Red Cross Society" src="/common/img/base/logo-JapaneseRedCrossSociety.svg" width="143">
						</aside>
					</div>
					<div class="mod-gnav-btn">
						<ul class="mod-gnav-btn-lines">
							<li class="mod-gnav-btn-lines-item"></li>
							<li class="mod-gnav-btn-lines-item"></li>
							<li class="mod-gnav-btn-lines-item"></li>
						</ul>
						<p class="mod-gnav-btn-txt">MENU</p>
					</div>
				</div>
				<nav class="mod-gnav">
					<div class="mod-gnav-search">
						<script>
						(function() {
						var cx = '012754520406554269719:kiffpd4wirg';
						var gcse = document.createElement('script');
						gcse.type = 'text/javascript';
						gcse.async = true;
						gcse.src = 'https://cse.google.com/cse.js?cx=' + cx;
						var s = document.getElementsByTagName('script')[0];
						s.parentNode.insertBefore(gcse, s);
						})();
						</script>
						<div id="___gcse_1"><div class="gsc-control-cse gsc-control-cse-ja"><div class="gsc-control-wrapper-cse" dir="ltr"><form class="gsc-search-box gsc-search-box-tools" accept-charset="utf-8"><table cellspacing="0" cellpadding="0" class="gsc-search-box"><tbody><tr><td class="gsc-input"><div class="gsc-input-box" id="gsc-iw-id2"><table cellspacing="0" cellpadding="0" id="gs_id51" class="gstl_51 gsc-input" style="width: 100%; padding: 0px;"><tbody><tr><td id="gs_tti51" class="gsib_a"><input autocomplete="off" type="text" size="10" class="gsc-input" name="search" title="検索" id="gsc-i-id2" dir="ltr" spellcheck="false" style="width: 100%; padding: 0px; border: none; margin: 0px; height: auto; background: url(&quot;https://www.google.com/cse/static/images/1x/ja/branding.png&quot;) left center no-repeat rgb(255, 255, 255); outline: none;"></td><td class="gsib_b"><div class="gsst_b" id="gs_st51" dir="ltr"><a class="gsst_a" href="javascript:void(0)" title="検索ボックスをクリア" role="button" style="display: none;"><span class="gscb_a" id="gs_cb51" aria-hidden="true">×</span></a></div></td></tr></tbody></table></div></td><td class="gsc-search-button"><button class="gsc-search-button gsc-search-button-v2"><svg width="13" height="13" viewBox="0 0 13 13"><title>検索</title><path d="m4.8495 7.8226c0.82666 0 1.5262-0.29146 2.0985-0.87438 0.57232-0.58292 0.86378-1.2877 0.87438-2.1144 0.010599-0.82666-0.28086-1.5262-0.87438-2.0985-0.59352-0.57232-1.293-0.86378-2.0985-0.87438-0.8055-0.010599-1.5103 0.28086-2.1144 0.87438-0.60414 0.59352-0.8956 1.293-0.87438 2.0985 0.021197 0.8055 0.31266 1.5103 0.87438 2.1144 0.56172 0.60414 1.2665 0.8956 2.1144 0.87438zm4.4695 0.2115 3.681 3.6819-1.259 1.284-3.6817-3.7 0.0019784-0.69479-0.090043-0.098846c-0.87973 0.76087-1.92 1.1413-3.1207 1.1413-1.3553 0-2.5025-0.46363-3.4417-1.3909s-1.4088-2.0686-1.4088-3.4239c0-1.3553 0.4696-2.4966 1.4088-3.4239 0.9392-0.92727 2.0864-1.3969 3.4417-1.4088 1.3553-0.011889 2.4906 0.45771 3.406 1.4088 0.9154 0.95107 1.379 2.0924 1.3909 3.4239 0 1.2126-0.38043 2.2588-1.1413 3.1385l0.098834 0.090049z"></path></svg></button></td><td class="gsc-clear-button"><div class="gsc-clear-button" title="結果をクリア">&nbsp;</div></td></tr></tbody></table></form><div class="gsc-results-wrapper-overlay"><div class="gsc-results-close-btn" tabindex="0"></div><div class="gsc-positioningWrapper"><div class="gsc-tabsAreaInvisible"><div aria-label="refinement" role="tab" class="gsc-tabHeader gsc-inline-block gsc-tabhActive">カスタム検索</div><span class="gs-spacer"> </span></div></div><div class="gsc-positioningWrapper"><div class="gsc-tabsAreaInvisible"></div></div><div class="gsc-above-wrapper-area-invisible"><table cellspacing="0" cellpadding="0" class="gsc-above-wrapper-area-container"><tbody><tr><td class="gsc-result-info-container"><div class="gsc-result-info-invisible"></div></td><td class="gsc-orderby-container"><div class="gsc-orderby-invisible"><div class="gsc-orderby-label gsc-inline-block">表示順:</div><div class="gsc-option-menu-container gsc-inline-block"><div class="gsc-selected-option-container gsc-inline-block"><div class="gsc-selected-option">Relevance</div><div class="gsc-option-selector"></div></div><div class="gsc-option-menu-invisible"><div class="gsc-option-menu-item gsc-option-menu-item-highlighted"><div class="gsc-option">Relevance</div></div><div class="gsc-option-menu-item"><div class="gsc-option">Date</div></div></div></div></div></td></tr></tbody></table></div><div class="gsc-adBlockInvisible"></div><div class="gsc-wrapper"><div class="gsc-adBlockInvisible"></div><div class="gsc-resultsbox-invisible"><div class="gsc-resultsRoot gsc-tabData gsc-tabdActive"><div><div class="gsc-expansionArea"></div></div></div></div></div></div><div class="gsc-modal-background-image" tabindex="0"></div></div></div></div>
					</div>
					<ul class="mod-gnav-links">
						<li class="mod-gnav-links-item item-place">
							<a href="https://www.bs.jrc.or.jp/th/aomori/place/">
								<figure class="mod-gnav-links-ico">
									<img src="/common/img/base/ico_place_01_rd.svg" width="40" height="40" alt="">
								</figure>
								<p class="mod-gnav-links-txt">献血する</p>
							</a>
							<nav class="mod-megaNav">
								<div class="mod-megaNav-head">
									<div>
										<figure class="mod-megaNav-head-ico">
											<img src="/common/img/base/ico_place_01_rd.svg" width="40" height="40" alt="">
										</figure>
										<p class="mod-megaNav-head-txt">献血する</p>
									</div>
								</div>
								<div class="mod-megaNav-txts">
									<ul class="mod-megaNav-links">
										<li class="mod-megaNav-links-item item-2nd">
											<a href="https://www.bs.jrc.or.jp/th/aomori/place/m1_01_00_index.html">献血ルーム紹介</a>
										</li>
											<li class="mod-megaNav-links-item item-3rd">
		<a href="https://www.bs.jrc.or.jp/th/aomori/place/m1_01_01_show.html">青森献血ルーム</a>
	</li>

	<li class="mod-megaNav-links-item item-3rd">
		<a href="https://www.bs.jrc.or.jp/th/aomori/place/m1_01_02_show.html">弘前献血ルームCoCoSA</a>
	</li>

									</ul>
									<ul class="mod-megaNav-links">
										<li class="mod-megaNav-links-item item-2nd">
											<a href="https://www.bs.jrc.or.jp/th/aomori/place/m1_02_searchroom.html">最寄りの献血ルームを探す</a>
										</li>
										<li class="mod-megaNav-links-item item-2nd">
											<a href="https://www.bs.jrc.or.jp/th/aomori/place/m1_03_bus.html">献血バス運行スケジュール</a>
										</li>
									</ul>
									<ul class="mod-megaNav-links">
                                    											<li class="mod-megaNav-links-item item-newTab item-2nd">
											<a target="_blank" href="https://www.kenketsu.jp/"><span>複数回献血クラブ ラブラッド</span></a>
										</li>
										<li class="mod-megaNav-links-item item-newTab item-3rd">
											<a target="_blank" href="http://www.jrc.or.jp/donation/club/"><span>初めての方</span></a>
										</li>
										<li class="mod-megaNav-links-item item-newTab item-3rd">
											<a target="_blank" href="https://www.kenketsu.jp/"><span>会員の方</span></a>
										</li>

									</ul>
								</div>
							</nav>
						</li>
						<li class="mod-gnav-links-item item-donation">
							<a href="https://www.bs.jrc.or.jp/th/aomori/donation/">
								<figure class="mod-gnav-links-ico">
									<img src="/common/img/base/ico_donation_01_rd.svg" width="40" height="40" alt="">
								</figure>
								<p class="mod-gnav-links-txt">献血いただく方へ</p>
							</a>
							<nav class="mod-megaNav">
								<div class="mod-megaNav-head">
									<div>
										<figure class="mod-megaNav-head-ico">
											<img src="/common/img/base/ico_donation_01_rd.svg" width="40" height="40" alt="">
										</figure>
										<p class="mod-megaNav-head-txt">献血いただく方へ</p>
									</div>
								</div>
								<div class="mod-megaNav-txts">
									<ul class="mod-megaNav-links">
										<li class="mod-megaNav-links-item item-2nd">
											<a href="https://www.bs.jrc.or.jp/th/aomori/donation/m2_01_00_index.html">献血のながれ</a>
										</li>
										<li class="mod-megaNav-links-item item-3rd">
											<a href="https://www.bs.jrc.or.jp/th/aomori/donation/m2_01_01_process.html">献血の手順</a>
										</li>
										<li class="mod-megaNav-links-item item-newTab item-3rd">
											<a target="_blank" href="http://www.jrc.or.jp/donation/about/before/"><span>献血いただく前に</span></a>
										</li>
										<li class="mod-megaNav-links-item item-newTab item-3rd">
											<a target="_blank" href="http://www.jrc.or.jp/donation/about/terms/"><span>献血基準</span></a>
										</li>
										<li class="mod-megaNav-links-item item-newTab item-3rd">
											<a target="_blank" href="http://www.jrc.or.jp/donation/about/refrain/"><span>献血をご遠慮いただく場合</span></a>
										</li>
										<li class="mod-megaNav-links-item item-newTab item-3rd">
											<a target="_blank" href="http://www.jrc.or.jp/donation/about/relief/"><span>具合が悪くなったら</span></a>
										</li>
									</ul>
									<ul class="mod-megaNav-links">
										<li class="mod-megaNav-links-item item-2nd">
											<a href="https://www.bs.jrc.or.jp/th/aomori/donation/m2_02_00_index.html">献血／血液の知識</a>
										</li>
										<li class="mod-megaNav-links-item item-3rd">
											<a href="https://www.bs.jrc.or.jp/th/aomori/donation/m2_02_01_first.html">はじめての献血</a>
										</li>
										<li class="mod-megaNav-links-item item-newTab item-3rd">
											<a target="_blank" href="http://www.jrc.or.jp/donation/first/knowledge/"><span>血液の基礎知識</span></a>
										</li>
										<li class="mod-megaNav-links-item item-3rd">
											<a href="https://www.bs.jrc.or.jp/th/aomori/donation/m2_02_02_page400.html">400mL 献血が必要な理由</a>
										</li>
										<li class="mod-megaNav-links-item item-3rd">
											<a href="https://www.bs.jrc.or.jp/th/aomori/donation/m2_02_04_howto.html">献血にご協力いただいた方へ</a>
										</li>
										<li class="mod-megaNav-links-item item-3rd">
											<a href="https://www.bs.jrc.or.jp/th/aomori/donation/m2_02_03_about-privacy.html">献血者の個人情報保護について</a>
										</li>
									</ul>
									<ul class="mod-megaNav-links">
										<li class="mod-megaNav-links-item item-newTab item-3rd">
											<a target="_blank" href="http://www.jrc.or.jp/donation/information/"><span>血液事業の重要なお知らせ</span></a>
										</li>
									</ul>
								</div>
							</nav>
						</li>
						<li class="mod-gnav-links-item item-process">
							<a href="https://www.bs.jrc.or.jp/th/aomori/process/">
								<figure class="mod-gnav-links-ico">
									<img src="/common/img/base/ico_process_01_rd.svg" width="40" height="40" alt="">
								</figure>
								<p class="mod-gnav-links-txt">血液のゆくえ</p>
							</a>
							<nav class="mod-megaNav">
								<div class="mod-megaNav-head">
									<div>
										<figure class="mod-megaNav-head-ico">
											<img src="/common/img/base/ico_process_01_rd.svg" width="40" height="40" alt="">
										</figure>
										<p class="mod-megaNav-head-txt">血液のゆくえ</p>
									</div>
								</div>
								<div class="mod-megaNav-txts">
									<ul class="mod-megaNav-links">
										<li class="mod-megaNav-links-item item-2nd">
											<a href="https://www.bs.jrc.or.jp/th/aomori/process/m3_01_go.html">血液のゆくえ</a>
										</li>
										<li class="mod-megaNav-links-item item-newTab item-2nd">
											<a target="_blank" href="http://www.jrc.or.jp/activity/blood/list/"><span>輸血用血液製剤一覧</span></a>
										</li>
									</ul>
									<ul class="mod-megaNav-links">
										<li class="mod-megaNav-bnrs-item">
											<figure class="mod-megaNav-bnrs-img01"><img src="/common/img/center/megaNav/megaNav_process01.jpg" alt=""></figure>
										</li>
									</ul>
								</div>
							</nav>
						</li>
						<li class="mod-gnav-links-item item-voice">
							<a href="https://www.bs.jrc.or.jp/th/aomori/voice/">
								<figure class="mod-gnav-links-ico">
									<img src="/common/img/base/ico_voice_01_rd.svg" width="40" height="40" alt="">
								</figure>
								<p class="mod-gnav-links-txt">ありがとうの声</p>
							</a>
							<nav class="mod-megaNav">
								<div class="mod-megaNav-head">
									<div>
										<figure class="mod-megaNav-head-ico">
											<img src="/common/img/base/ico_voice_01_rd.svg" width="40" height="40" alt="">
										</figure>
										<p class="mod-megaNav-head-txt">ありがとうの声</p>
									</div>
								</div>
								<div class="mod-megaNav-txts">
									<ul class="mod-megaNav-links">
										<li class="mod-megaNav-bnrs-item">
											<a href="https://www.bs.jrc.or.jp/th/aomori/voice/">
												<p class="mod-megaNav-bnrs-txt">ありがとうの声</p>
	 											<figure class="mod-megaNav-bnrs-img"><img src="/common/img/center/megaNav/megaNav_voice01.jpg" alt=""></figure>
											</a>
										</li>
									</ul>
								</div>
							</nav>
						</li>
						<li class="mod-gnav-links-item item-supporter">
							<a href="https://www.bs.jrc.or.jp/th/aomori/supporter/">
								<figure class="mod-gnav-links-ico">
									<img src="/common/img/base/ico_supporter_01_rd.svg" width="40" height="40" alt="">
								</figure>
								<p class="mod-gnav-links-txt">献血を広げよう</p>
							</a>
							<nav class="mod-megaNav">
								<div class="mod-megaNav-head">
									<div>
										<figure class="mod-megaNav-head-ico">
											<img src="/common/img/base/ico_supporter_01_rd.svg" width="40" height="40" alt="">
										</figure>
										<p class="mod-megaNav-head-txt">献血を広げよう</p>
									</div>
								</div>
								<div class="mod-megaNav-txts">
									<ul class="mod-megaNav-links">
										<li class="mod-megaNav-bnrs-item">
											<a href="https://www.bs.jrc.or.jp/th/aomori/cat1522/">
												<p class="mod-megaNav-bnrs-txt">献血協力団体・企業</p>
	 											<figure class="mod-megaNav-bnrs-img"><img src="/common/img/center/megaNav/megaNav_special02.jpg" alt=""></figure>
											</a>
										</li>
									</ul>
									<ul class="mod-megaNav-links">
										<li class="mod-megaNav-links-item item-2nd">
											<a href="https://www.bs.jrc.or.jp/th/aomori/supporter/m5_01_show.html">献血バス受入れ事業所募集中！</a>
										</li>
										<li class="mod-megaNav-links-item item-newTab item-2nd">
											<a href="/th/bbc/special/m6_02_00_index.html" target="_blank">東北ブロック学生献血推進</a>
										</li>
<!--
										<li class="mod-megaNav-links-item item-newTab item-2nd">
											<a href="http://www.jrc.or.jp/activity/blood/join/" target="_blank"><span>献血ボランティアへ参加</span></a>
										</li>
-->
										<li class="mod-megaNav-links-item item-2nd">
											<a href="https://www.bs.jrc.or.jp/th/aomori/supporter/m5_02_hla.html">HLA登録について</a>
										</li>
									</ul>
								</div>
							</nav>
						</li>
						<li class="mod-gnav-links-item item-special">
							<a href="https://www.bs.jrc.or.jp/th/aomori/special/">
								<figure class="mod-gnav-links-ico">
									<img src="/common/img/base/ico_special_01_rd.svg" width="40" height="40" alt="">
								</figure>
								<p class="mod-gnav-links-txt">スペシャル</p>
							</a>
							<nav class="mod-megaNav">
								<div class="mod-megaNav-head">
									<div>
										<figure class="mod-megaNav-head-ico">
											<img src="/common/img/base/ico_special_01_rd.svg" width="40" height="40" alt="">
										</figure>
										<p class="mod-megaNav-head-txt">スペシャル</p>
									</div>
								</div>
								<div class="mod-megaNav-txts">
									<ul class="mod-megaNav-links">
										<li class="mod-megaNav-bnrs-item">
											<a href="https://www.bs.jrc.or.jp/th/aomori/cat9/">
												<p class="mod-megaNav-bnrs-txt">スタッフブログ</p>
	 											<figure class="mod-megaNav-bnrs-img"><img src="/common/img/center/megaNav/megaNav_special01.jpg" alt=""></figure>
											</a>
										</li>
									</ul>
									<ul class="mod-megaNav-links">
										<li class="mod-megaNav-links-item item-newTab item-2nd">
											<a target="_blank" href="https://www.facebook.com/aomori61"><span>血液センター公式Facebook</span></a>
										</li>
										<li class="mod-megaNav-links-item item-newTab item-2nd">
											<a target="_blank" href="https://twitter.com/aomori61"><span>血液センター公式Twitter</span></a>
										</li>
									</ul>
									<ul class="mod-megaNav-links">
										<li class="mod-megaNav-links-item item-2nd">
											<a href="https://www.bs.jrc.or.jp/th/aomori/special/m6_02_bank.html">骨髄バンクについて</a>
										</li>
										<li class="mod-megaNav-links-item item-newTab item-2nd">
											<a target="_blank" href="http://www.jrc.or.jp/transfusion/"><span>患者さんとご家族向け輸血情報</span></a>
										</li>
										<li class="mod-megaNav-links-item item-newTab item-2nd">
											<a target="_blank" href="http://www.jrc.or.jp/activity/blood/"><span>血液事業</span></a>
										</li>
									</ul>
								</div>
							</nav>
						</li>
						<li class="mod-gnav-links-item item-center">
							<a href="https://www.bs.jrc.or.jp/th/aomori/center/">
								<figure class="mod-gnav-links-ico">
									<img src="/common/img/base/ico_center_01_rd.svg" width="40" height="40" alt="">
								</figure>
								<p class="mod-gnav-links-txt">施設案内</p>
							</a>
							<nav class="mod-megaNav">
								<div class="mod-megaNav-head">
									<div>
										<figure class="mod-megaNav-head-ico">
											<img src="/common/img/base/ico_center_01_rd.svg" width="40" height="40" alt="">
										</figure>
										<p class="mod-megaNav-head-txt">施設案内</p>
									</div>
								</div>
								<div class="mod-megaNav-txts">
									<ul class="mod-megaNav-links">
										<li class="mod-megaNav-bnrs-item">
											<a href="https://www.bs.jrc.or.jp/th/aomori/center/m7_01_center.html">
												<p class="mod-megaNav-bnrs-txt">県内の施設</p>
	 											<figure class="mod-megaNav-bnrs-img">
	 												<img src="https://www.bs.jrc.or.jp/th/aomori/center/image/bnr_aomori_shisetsu.jpg" alt="">

	 											</figure>
											</a>
										</li>
									</ul>
									<ul class="mod-megaNav-links">
										<li class="mod-megaNav-links-item item-2nd">
											<a href="https://www.bs.jrc.or.jp/th/aomori/center/m7_02_00_recruitment.html">採用情報</a>
										</li>
										<li class="mod-megaNav-links-item item-2nd">
											<a href="https://www.bs.jrc.or.jp/th/aomori/center/m7_03_nyusatsu.html">入札・契約情報</a>
										</li>
										<li class="mod-megaNav-links-item item-newTab item-2nd">
											<a target="_blank" href="/th/bbc/guide/m2_01_index.html"><span>見学のご案内</span></a>
										</li>
									</ul>
								</div>
							</nav>
						</li>
					</ul>
					<ul class="mod-gnav-contactLinks">
						<li class="mod-gnav-contactLinks-item"><a href="https://www.bs.jrc.or.jp/th/aomori/m0_01_sitemap.html">サイトマップ</a></li>
						<li class="mod-gnav-contactLinks-item"><a href="http://www.jrc.or.jp/donation/qa/" target="_blank">よくあるご質問</a></li>
						<li class="mod-gnav-contactLinks-item"><a href="https://www.bs.jrc.or.jp/th/aomori/m0_02_contact.html">お問い合わせ</a></li>
						<li class="mod-gnav-contactLinks-item"><a href="https://www.bs.jrc.or.jp/th/aomori/m0_04_privacy.html">プライバシーポリシー</a></li>
												<li class="mod-gnav-contactLinks-item"><a href="https://www.bs.jrc.or.jp/th/aomori/m0_04_04_accessrecord.html">アクセス記録の収集・解析について</a></li>

						<li class="mod-gnav-contactLinks-item"><a href="https://www.bs.jrc.or.jp/th/aomori/m0_05_link.html">リンク集</a></li>
						<li class="mod-gnav-contactLinks-item"><a href="https://www.bs.jrc.or.jp/th/aomori/m0_06_donation.html">献血状況の表示について</a></li>
					</ul>
				</nav>
			</div>
		</header>
		<div id="mod-mainContent">

	<nav class="mod-pankuzu">
		<ul class="mod-pankuzu-links">
			<li class="mod-pankuzu-links-item"><a href="https://www.bs.jrc.or.jp/th/aomori/">ホーム</a></li>
			<li class="mod-pankuzu-links-item"><a href="./">献血する</a></li>
			<li class="mod-pankuzu-links-item">献血バス運行スケジュール</li>
		</ul>
	</nav>
	<div class="mod-catHead item-hasLead">
		<div class="wrapin wrapin-sp">
			<figure class="mod-catHead-ico"><img src="/common/img/base/ico_place_01_wh.svg" width="40" height="40" alt=""></figure>
			<h1 class="mod-catHead-h">献血バス運行スケジュール</h1>
	  	</div>
	</div>
	<div class="mod-post-clear">







































































































































































































































































































































































































































































































































































































































			<div class="mod-post-main">
				<div class="mod-h02">
					<figure class="mod-h02-ico"><img src="/common/img/base/ico_place_01_rd.svg" width="40" height="40" alt=""></figure>
					<h2 class="mod-h02-txt">献血バスの運行予定</h2>
				</div>
				<article class="mod-iconIndent01">
					<p>皆さまのあたたかいご協力に深く感謝申し上げます。</p>

					<p>献血バスの運行予定を掲載しています。</p>
					<p>絞り込み検索をしてお探しの場合は、市区町村、予定日を選択してください。</p>




					<p>&nbsp;</p>
					<div class="mod-searchBox01 mb2e">
						<ul class="mod-searchBox01-list">
                        <form method="get" accept-charset="UTF-8">
							<li class="mod-searchBox01-list-item">
								<div class="mod-searchBox01-list-titWrap">
									<div class="mod-searchBox01-list-titWrap-clear">
										<figure class="mod-searchBox01-list-titWrap-ico">
											<img src="/common/img/base/ico_place_01_rd.svg" width="40" height="40" alt="">
										</figure>
										<p class="mod-searchBox01-list-titWrap-txt"><label for="shikuchoson">市区町村</label></p>
									</div>
								</div>
								<div class="mod-searchBox01-list-inputWrap">
									<select id="shikuchoson" class="mod-input-select" name="selectarea">
										<option value="-">-</option>

	                                    	<option value="おいらせ町">おいらせ町</option>

	                                    	<option value="つがる市">つがる市</option>

	                                    	<option value="むつ市">むつ市</option>

	                                    	<option value="七戸町">七戸町</option>

	                                    	<option value="三沢市">三沢市</option>

	                                    	<option value="五所川原市">五所川原市</option>

	                                    	<option value="佐井村">佐井村</option>

	                                    	<option value="八戸市" selected="selected">八戸市</option>

	                                    	<option value="十和田市">十和田市</option>

	                                    	<option value="南部町">南部町</option>

	                                    	<option value="平内町">平内町</option>

	                                    	<option value="平川市">平川市</option>

	                                    	<option value="弘前市">弘前市</option>

	                                    	<option value="青森市">青森市</option>

	                                    	<option value="風間浦村">風間浦村</option>

									</select>
								</div>
							</li>
							<li class="mod-searchBox01-list-item">
								<div class="mod-searchBox01-list-titWrap">
									<div class="mod-searchBox01-list-titWrap-clear">
										<figure class="mod-searchBox01-list-titWrap-ico item-calendar">
											<img src="/common/img/base/ico_calendar_01_rd.svg" width="40" height="40" alt="">
										</figure>
										<p class="mod-searchBox01-list-titWrap-txt"><label for="yoteinengappi">予定日</label></p>
									</div>
								</div>
								<div class="mod-searchBox01-list-inputWrap">
									<select id="yoteinengappi" class="mod-input-select" name="selectday">
									<option value="-">-</option>




                                    	<option value="20200101">1月 1日(水)</option>


                                    	<option value="20200911">9月11日(金)</option>


                                    	<option value="20200912">9月12日(土)</option>


                                    	<option value="20200913">9月13日(日)</option>


                                    	<option value="20200914">9月14日(月)</option>


                                    	<option value="20200915">9月15日(火)</option>


                                    	<option value="20200916">9月16日(水)</option>


                                    	<option value="20200917">9月17日(木)</option>


                                    	<option value="20200918">9月18日(金)</option>


                                    	<option value="20200919">9月19日(土)</option>


                                    	<option value="20200920">9月20日(日)</option>


                                    	<option value="20200922">9月22日(火)</option>


                                    	<option value="20200923">9月23日(水)</option>


                                    	<option value="20200924">9月24日(木)</option>


                                    	<option value="20200925">9月25日(金)</option>


                                    	<option value="20200926">9月26日(土)</option>


                                    	<option value="20200927">9月27日(日)</option>


                                    	<option value="20200929">9月29日(火)</option>


                                    	<option value="20200930">9月30日(水)</option>

									</select>
								</div>
								<div class="mod-searchBox01-list-searchBtnWrap">
									<input class="mod-btn01 bg-rd c-wh" type="submit" value="検索">
								</div>
							</li>
                        </form>
						</ul>
					</div>
















						<br><p>9月11日(金)</p>
						<div class="mod-table-scrollWrap size-w720">
						<table class="mod-table01 mod-ReservationTable">
							<colgroup>
								<col width="15%">
								<col width="auto">
								<col width="25%">
							</colgroup>
							<thead>
								<tr class="bg-lrd">
									<th class="tac">市区町村</th>
									<th class="tac">献血会場</th>
									<th class="tac">受付時間</th>
								</tr>
							</thead>
							<tbody>


							<tr>
								<td class="tac vam">八戸市</td>
								<td class="tal vam">
									<ul>
										<li>協同組合　八戸管工事協会</li>


											<li>八戸市青葉３－２８－２<a href="https://maps.google.co.jp/maps?f=q&amp;hl=ja&amp;q=%E5%85%AB%E6%88%B8%E5%B8%82%E9%9D%92%E8%91%89%EF%BC%93%EF%BC%8D%EF%BC%92%EF%BC%98%EF%BC%8D%EF%BC%92%20%E5%8D%94%E5%90%8C%E7%B5%84%E5%90%88%E3%80%80%E5%85%AB%E6%88%B8%E7%AE%A1%E5%B7%A5%E4%BA%8B%E5%8D%94%E4%BC%9A&amp;ie=UTF8&amp;z=18" target="_blank">[MAP]</a></li>



									</ul>
								</td>


								<td class="tac vam">09:45～11:45</td>

							</tr>








							<tr>
								<td class="tac vam">八戸市</td>
								<td class="tal vam">
									<ul>
										<li>青森労災病院</li>


											<li>八戸市白銀町字南ヶ丘１<a href="https://maps.google.co.jp/maps?f=q&amp;hl=ja&amp;q=%E5%85%AB%E6%88%B8%E5%B8%82%E7%99%BD%E9%8A%80%E7%94%BA%E5%AD%97%E5%8D%97%E3%83%B6%E4%B8%98%EF%BC%91%20%E9%9D%92%E6%A3%AE%E5%8A%B4%E7%81%BD%E7%97%85%E9%99%A2&amp;ie=UTF8&amp;z=18" target="_blank">[MAP]</a></li>



									</ul>
								</td>


								<td class="tac vam">14:00～16:30</td>

							</tr>





















							</tbody>
						</table>
					  	</div>

						<br><p>9月13日(日)</p>
						<div class="mod-table-scrollWrap size-w720">
						<table class="mod-table01 mod-ReservationTable">
							<colgroup>
								<col width="15%">
								<col width="auto">
								<col width="25%">
							</colgroup>
							<thead>
								<tr class="bg-lrd">
									<th class="tac">市区町村</th>
									<th class="tac">献血会場</th>
									<th class="tac">受付時間</th>
								</tr>
							</thead>
							<tbody>


							<tr>
								<td class="tac vam">八戸市</td>
								<td class="tal vam">
									<ul>
										<li>ラピア</li>


											<li>八戸市江陽２－１４－１<a href="https://maps.google.co.jp/maps?f=q&amp;hl=ja&amp;q=%E5%85%AB%E6%88%B8%E5%B8%82%E6%B1%9F%E9%99%BD%EF%BC%92%EF%BC%8D%EF%BC%91%EF%BC%94%EF%BC%8D%EF%BC%91%20%E3%83%A9%E3%83%94%E3%82%A2&amp;ie=UTF8&amp;z=18" target="_blank">[MAP]</a></li>



									</ul>
								</td>


								<td class="tac vam">10:00～12:00<br>13:30～16:00</td>

							</tr>

















































							</tbody>
						</table>
					  	</div>

						<br><p>9月18日(金)</p>
						<div class="mod-table-scrollWrap size-w720">
						<table class="mod-table01 mod-ReservationTable">
							<colgroup>
								<col width="15%">
								<col width="auto">
								<col width="25%">
							</colgroup>
							<thead>
								<tr class="bg-lrd">
									<th class="tac">市区町村</th>
									<th class="tac">献血会場</th>
									<th class="tac">受付時間</th>
								</tr>
							</thead>
							<tbody>


							<tr>
								<td class="tac vam">八戸市</td>
								<td class="tal vam">
									<ul>
										<li>協同組合八戸総合卸センター会館</li>


											<li>八戸市卸センター１－１２－１０<a href="https://maps.google.co.jp/maps?f=q&amp;hl=ja&amp;q=%E5%85%AB%E6%88%B8%E5%B8%82%E5%8D%B8%E3%82%BB%E3%83%B3%E3%82%BF%E3%83%BC%EF%BC%91%EF%BC%8D%EF%BC%91%EF%BC%92%EF%BC%8D%EF%BC%91%EF%BC%90%20%E5%8D%94%E5%90%8C%E7%B5%84%E5%90%88%E5%85%AB%E6%88%B8%E7%B7%8F%E5%90%88%E5%8D%B8%E3%82%BB%E3%83%B3%E3%82%BF%E3%83%BC%E4%BC%9A%E9%A4%A8&amp;ie=UTF8&amp;z=18" target="_blank">[MAP]</a></li>



									</ul>
								</td>


								<td class="tac vam">12:45～16:15</td>

							</tr>

























							</tbody>
						</table>
					  	</div>

						<br><p>9月19日(土)</p>
						<div class="mod-table-scrollWrap size-w720">
						<table class="mod-table01 mod-ReservationTable">
							<colgroup>
								<col width="15%">
								<col width="auto">
								<col width="25%">
							</colgroup>
							<thead>
								<tr class="bg-lrd">
									<th class="tac">市区町村</th>
									<th class="tac">献血会場</th>
									<th class="tac">受付時間</th>
								</tr>
							</thead>
							<tbody>


							<tr>
								<td class="tac vam">八戸市</td>
								<td class="tal vam">
									<ul>
										<li>八戸臨海開発（株）Ｐｉａ　Ｄｏ</li>


											<li>八戸市沼館４－７－１１２<a href="https://maps.google.co.jp/maps?f=q&amp;hl=ja&amp;q=%E5%85%AB%E6%88%B8%E5%B8%82%E6%B2%BC%E9%A4%A8%EF%BC%94%EF%BC%8D%EF%BC%97%EF%BC%8D%EF%BC%91%EF%BC%91%EF%BC%92%20%E5%85%AB%E6%88%B8%E8%87%A8%E6%B5%B7%E9%96%8B%E7%99%BA%EF%BC%88%E6%A0%AA%EF%BC%89%EF%BC%B0%EF%BD%89%EF%BD%81%E3%80%80%EF%BC%A4%EF%BD%8F&amp;ie=UTF8&amp;z=18" target="_blank">[MAP]</a></li>



									</ul>
								</td>


								<td class="tac vam">10:00～12:00<br>13:30～16:00</td>

							</tr>





















							</tbody>
						</table>
					  	</div>

						<br><p>9月23日(水)</p>
						<div class="mod-table-scrollWrap size-w720">
						<table class="mod-table01 mod-ReservationTable">
							<colgroup>
								<col width="15%">
								<col width="auto">
								<col width="25%">
							</colgroup>
							<thead>
								<tr class="bg-lrd">
									<th class="tac">市区町村</th>
									<th class="tac">献血会場</th>
									<th class="tac">受付時間</th>
								</tr>
							</thead>
							<tbody>


							<tr>
								<td class="tac vam">八戸市</td>
								<td class="tal vam">
									<ul>
										<li>八戸農業協同組合　本店</li>


											<li>八戸市大字尻内町字内矢沢２－５<a href="https://maps.google.co.jp/maps?f=q&amp;hl=ja&amp;q=%E5%85%AB%E6%88%B8%E5%B8%82%E5%A4%A7%E5%AD%97%E5%B0%BB%E5%86%85%E7%94%BA%E5%AD%97%E5%86%85%E7%9F%A2%E6%B2%A2%EF%BC%92%EF%BC%8D%EF%BC%95%20%E5%85%AB%E6%88%B8%E8%BE%B2%E6%A5%AD%E5%8D%94%E5%90%8C%E7%B5%84%E5%90%88%E3%80%80%E6%9C%AC%E5%BA%97&amp;ie=UTF8&amp;z=18" target="_blank">[MAP]</a></li>



									</ul>
								</td>


								<td class="tac vam">10:00～11:30</td>

							</tr>





















































							</tbody>
						</table>
					  	</div>

						<br><p>9月27日(日)</p>
						<div class="mod-table-scrollWrap size-w720">
						<table class="mod-table01 mod-ReservationTable">
							<colgroup>
								<col width="15%">
								<col width="auto">
								<col width="25%">
							</colgroup>
							<thead>
								<tr class="bg-lrd">
									<th class="tac">市区町村</th>
									<th class="tac">献血会場</th>
									<th class="tac">受付時間</th>
								</tr>
							</thead>
							<tbody>


							<tr>
								<td class="tac vam">八戸市</td>
								<td class="tal vam">
									<ul>
										<li>八戸臨海開発（株）Ｐｉａ　Ｄｏ</li>


											<li>八戸市沼館４－７－１１２<a href="https://maps.google.co.jp/maps?f=q&amp;hl=ja&amp;q=%E5%85%AB%E6%88%B8%E5%B8%82%E6%B2%BC%E9%A4%A8%EF%BC%94%EF%BC%8D%EF%BC%97%EF%BC%8D%EF%BC%91%EF%BC%91%EF%BC%92%20%E5%85%AB%E6%88%B8%E8%87%A8%E6%B5%B7%E9%96%8B%E7%99%BA%EF%BC%88%E6%A0%AA%EF%BC%89%EF%BC%B0%EF%BD%89%EF%BD%81%E3%80%80%EF%BC%A4%EF%BD%8F&amp;ie=UTF8&amp;z=18" target="_blank">[MAP]</a></li>



									</ul>
								</td>


								<td class="tac vam">10:00～12:00<br>13:30～16:00</td>

							</tr>






























		</tbody></table></div>




				</article>
		  	</div>

    	<div class="mod-post-side">
	<section class="mod-post-side-sec">
		<div class="mod-h01 mod-post-side-sec-h">
			<figure class="mod-h01-ico"><img src="/common/img/base/ico_place_01_rd.svg" width="36" height="36" alt=""></figure>
			<p class="mod-h01-txt"><label for="placemenu">献血する</label></p>
		</div>
		<ul class="mod-post-side-posts">
            <li><a href="./m1_01_00_index.html">献血ルーム紹介</a>
            	<ul class="mod-post-side-subPosts">
						<li><a href="https://www.bs.jrc.or.jp/th/aomori/place/m1_01_01_show.html">青森献血ルーム</a></li>

	<li><a href="https://www.bs.jrc.or.jp/th/aomori/place/m1_01_02_show.html">弘前献血ルームCoCoSA</a></li>

				</ul>
        	</li>
            <li><a href="./m1_02_searchroom.html">最寄りの献血ルームを探す</a></li>
            <li><a href="./m1_03_bus.html">献血バス運行スケジュール</a></li>
        				<li class="item-newTab"><a href="https://www.kenketsu.jp/" target="_blank">複数回献血クラブ「ラブラッド」</a>
            	<ul class="mod-post-side-subPosts">
           	 	    <li class="item-newTab"><a href="http://www.jrc.or.jp/donation/club/" target="_blank">初めての方</a></li>
            	    <li class="item-newTab"><a href="https://www.kenketsu.jp/" target="_blank">会員の方</a></li>
            	</ul>
			</li>

		</ul>
		<select name="" id="placemenu" class="mod-post-side-select mod-input-select" onchange="document.location.href=this.options[this.selectedIndex].value;">
			<option value="">（選択してください）</option>
			<option value="./m1_01_00_index.html">献血ルーム紹介</option>
					<option value="https://www.bs.jrc.or.jp/th/aomori/place/m1_01_01_show.html">　青森献血ルーム</option>

	<option value="https://www.bs.jrc.or.jp/th/aomori/place/m1_01_02_show.html">　弘前献血ルームCoCoSA</option>

			<option value="./m1_02_searchroom.html">最寄りの献血ルームを探す</option>
			<option value="./m1_03_bus.html">献血バス運行スケジュール</option>
        	        	<option value="https://www.kenketsu.jp/">複数回献血クラブ「ラブラッド」</option>
        		<option value="http://www.jrc.or.jp/donation/club/">　初めての方</option>
        		<option value="https://www.kenketsu.jp/">　会員の方</option>

		</select>
	</section>
</div>
	</div>

		<nav class="mod-bnrs01">
		<ul class="mod-bnrs01-links">
			<li class="mod-bnrs01-links-item"><a href="http://www.jrc.or.jp/mr/" target="_blank">
				<figure class="mod-bnrs01-links-img"><img src="/common/img/base/bnrs01_img_01.jpg" alt="医療関係の方への画像"></figure>
				<p class="mod-bnrs01-links-txt">医療関係の方へ</p>
			</a></li>
			<li class="mod-bnrs01-links-item"><a href="http://www.jrc.or.jp/search/bloodcenter/" target="_blank">
				<figure class="mod-bnrs01-links-img"><img src="/common/img/base/bnrs01_img_02.jpg" alt="全国の血液センターの画像"></figure>
				<p class="mod-bnrs01-links-txt">全国の血液センター</p>
			</a></li>
			<li class="mod-bnrs01-links-item"><a href="https://www.bs.jrc.or.jp/th/aomori/center/m7_02_00_recruitment.html">
				<figure class="mod-bnrs01-links-img"><img src="/common/img/base/bnrs01_img_03.jpg" alt="職員採用情報の画像"></figure>
				<p class="mod-bnrs01-links-txt">職員採用情報</p>
			</a></li>
		</ul>
	</nav>
	<div class="mod-footer-GrayMargin"><img src="/common/img/dummy/spacer.gif" alt=""></div>
	<footer class="mod-footer">
		<nav class="mod-footer-nav">
			<section class="mod-footer-nav-sec">
	        	<p class="mod-footer-nav-sec-h"><a href="https://www.bs.jrc.or.jp/th/aomori/">ホーム</a></p>
				<ul class="mod-footer-nav-sec-links">
					<li class="mod-footer-nav-sec-links-item"><a href="https://www.bs.jrc.or.jp/th/aomori/m0_01_sitemap.html">サイトマップ</a></li>
					<li class="mod-footer-nav-sec-links-item"><a href="https://www.bs.jrc.or.jp/th/aomori/m0_02_contact.html">お問い合わせ</a></li>
					<li class="mod-footer-nav-sec-links-item"><a target="_blank" href="http://www.jrc.or.jp/donation/qa/">よくあるご質問</a></li>
					<li class="mod-footer-nav-sec-links-item"><a href="https://www.bs.jrc.or.jp/th/aomori/m0_04_privacy.html">プライバシーポリシー</a></li>
										<li class="mod-footer-nav-sec-links-item"><a href="https://www.bs.jrc.or.jp/th/aomori/m0_04_04_accessrecord.html">アクセス記録の収集・解析について</a></li>

	            	<li class="mod-footer-nav-sec-links-item"><a href="https://www.bs.jrc.or.jp/th/aomori/m0_05_link.html">リンク集</a></li>
	            	<li class="mod-footer-nav-sec-links-item"><a href="https://www.bs.jrc.or.jp/th/aomori/m0_06_donation.html">献血状況の表示について</a></li>
				</ul>
			</section>
			<section class="mod-footer-nav-sec">
				<p class="mod-footer-nav-sec-h"><a href="https://www.bs.jrc.or.jp/th/aomori/place/">献血する</a></p>
				<ul class="mod-footer-nav-sec-links">
					<li class="mod-footer-nav-sec-links-item"><a href="https://www.bs.jrc.or.jp/th/aomori/place/m1_01_00_index.html">献血ルーム紹介</a></li>
					<li class="mod-footer-nav-sec-links-item"><a href="https://www.bs.jrc.or.jp/th/aomori/place/m1_02_searchroom.html">最寄りの献血ルームを探す</a></li>
					<li class="mod-footer-nav-sec-links-item"><a href="https://www.bs.jrc.or.jp/th/aomori/place/m1_03_bus.html">献血バス運行スケジュール</a></li>
                			<li class="mod-footer-nav-sec-links-item"><a href="https://www.kenketsu.jp/" target="_blank">複数回献血クラブ「ラブラッド」</a></li>

				</ul>
			</section>
			<section class="mod-footer-nav-sec">
				<p class="mod-footer-nav-sec-h"><a href="https://www.bs.jrc.or.jp/th/aomori/donation/">献血いただく方へ</a></p>
				<ul class="mod-footer-nav-sec-links">
					<li class="mod-footer-nav-sec-links-item"><a href="https://www.bs.jrc.or.jp/th/aomori/donation/m2_01_00_index.html">献血のながれ</a></li>
					<li class="mod-footer-nav-sec-links-item"><a href="https://www.bs.jrc.or.jp/th/aomori/donation/m2_02_00_index.html">献血／血液の知識</a></li>
				</ul>
			</section>
			<section class="mod-footer-nav-sec">
				<p class="mod-footer-nav-sec-h"><a href="https://www.bs.jrc.or.jp/th/aomori/process/">血液のゆくえ</a></p>
				<ul class="mod-footer-nav-sec-links">
					<li class="mod-footer-nav-sec-links-item"><a href="https://www.bs.jrc.or.jp/th/aomori/process/m3_01_go.html">血液のゆくえ</a></li>
					<li class="mod-footer-nav-sec-links-item"><a target="_blank" href="http://www.jrc.or.jp/activity/blood/list/">輸血用血液製剤一覧</a></li>
				</ul>
			</section>
			<section class="mod-footer-nav-sec">
				<p class="mod-footer-nav-sec-h"><a href="https://www.bs.jrc.or.jp/th/aomori/voice/">ありがとうの声</a></p>
				<ul class="mod-footer-nav-sec-links">
					<li class="mod-footer-nav-sec-links-item"><a href="https://www.bs.jrc.or.jp/th/aomori/voice/">ありがとうの声</a></li>
				</ul>
			</section>
			<section class="mod-footer-nav-sec">
				<p class="mod-footer-nav-sec-h"><a href="https://www.bs.jrc.or.jp/th/aomori/supporter/">献血を広げよう</a></p>
				<ul class="mod-footer-nav-sec-links">
					<li class="mod-footer-nav-sec-links-item"><a href="https://www.bs.jrc.or.jp/th/aomori/cat1522/">献血協力団体・企業</a></li>
					<li class="mod-footer-nav-sec-links-item"><a href="https://www.bs.jrc.or.jp/th/aomori/supporter/m5_01_show.html">献血バス受け入れ事業所募集中！</a></li>
					<li class="mod-footer-nav-sec-links-item"><a target="_blank" href="/th/bbc/special/m6_02_00_index.html">東北ブロック学生献血推進</a></li>
<!--
					<li class="mod-footer-nav-sec-links-item"><a target="_blank" href="http://www.jrc.or.jp/activity/blood/join/">献血ボランティアに参加したい</a></li>
-->
					<li class="mod-footer-nav-sec-links-item"><a href="https://www.bs.jrc.or.jp/th/aomori/supporter/m5_02_hla.html">HLA登録について</a></li>
				</ul>
			</section>

			<section class="mod-footer-nav-sec">
				<p class="mod-footer-nav-sec-h"><a href="https://www.bs.jrc.or.jp/th/aomori/special/">スペシャル</a></p>
				<ul class="mod-footer-nav-sec-links">
					<li class="mod-footer-nav-sec-links-item"><a href="https://www.bs.jrc.or.jp/th/aomori/cat9/">スタッフブログ</a></li>
					<li class="mod-footer-nav-sec-links-item"><a target="_blank" href="https://www.facebook.com/aomori61">血液センター公式Facebook</a></li>
					<li class="mod-footer-nav-sec-links-item"><a target="_blank" href="https://twitter.com/aomori61">血液センター公式Twitter</a></li>
					<li class="mod-footer-nav-sec-links-item"><a href="https://www.bs.jrc.or.jp/th/aomori/special/m6_02_bank.html">骨髄バンクについて</a></li>
					<li class="mod-footer-nav-sec-links-item"><a target="_blank" href="http://www.jrc.or.jp/transfusion/">患者さんとご家族向け輸血情報</a></li>
					<li class="mod-footer-nav-sec-links-item"><a target="_blank" href="http://www.jrc.or.jp/activity/blood/">血液事業</a></li>
				</ul>
			</section>
			<section class="mod-footer-nav-sec">
				<p class="mod-footer-nav-sec-h"><a href="https://www.bs.jrc.or.jp/th/aomori/center/">施設案内</a></p>
				<ul class="mod-footer-nav-sec-links">

					<li class="mod-footer-nav-sec-links-item"><a href="https://www.bs.jrc.or.jp/th/aomori/center/m7_01_center.html">県内の施設</a></li>
					<li class="mod-footer-nav-sec-links-item"><a href="https://www.bs.jrc.or.jp/th/aomori/center/m7_02_00_recruitment.html">採用情報</a></li>
					<li class="mod-footer-nav-sec-links-item"><a href="https://www.bs.jrc.or.jp/th/aomori/center/m7_03_nyusatsu.html">入札・契約情報</a></li>
					<li class="mod-footer-nav-sec-links-item"><a target="_blank" href="/th/bbc/guide/m2_01_index.html">見学のご案内</a></li>
				</ul>
			</section>
		</nav>
		<div class="mod-footer-foot">
	    	<div class="mod-footer-logo"><a href="https://www.bs.jrc.or.jp/th/aomori/">
				<figure class="mod-footer-logo-img"><img src="/common/img/base/logo_01.png" alt="日本赤十字社"></figure>
				<p class="mod-footer-logo-txt"><img src="/common/img/base/logo_center_61.svg" width="200" alt="青森県赤十字血液センター"></p>
			</a></div>
			<p class="mod-footer-copyright">©Japanese Red Cross Society. All righrs reserved.</p>
		</div>
		<a href="#wrapper" class="mod-footer-pagetop">
			<figure class="mod-footer-pagetop-ico"><img src="/common/img/base/ico_arrow01_r_wh.svg" width="16" height="9" alt="ページトップの画像"></figure>
			ページトップ
		</a>
		<a href="#wrapper" class="mod-footer-pagetop-pc"><img src="/common/img/base/ico_arrow01_r_rd.svg" alt="ページトップの画像"></a>

	</footer>
	</div>
	</div>
	</div>
	<link rel="stylesheet" type="text/css" href="/common/js/libs/slick/slick.css">
	<script type="text/javascript" src="/common/js/libs/slick/slick.min.js"></script>
	<script src="/common/js/script.js"></script>
	<script src="https://www.bs.jrc.or.jp/th/aomori/mt-theme-scale2.js"></script>

<table cellspacing="0" cellpadding="0" class="gstl_50 gssb_c" style="width: 2px; display: none; top: 3px; position: absolute; left: -1px;"><tbody><tr><td class="gssb_f"></td><td class="gssb_e" style="width: 100%;"></td></tr></tbody></table><table cellspacing="0" cellpadding="0" class="gstl_51 gssb_c" style="width: 2px; display: none; top: 3px; position: absolute; left: -1px;"><tbody><tr><td class="gssb_f"></td><td class="gssb_e" style="width: 100%;"></td></tr></tbody></table></body>
</HTML>
`
