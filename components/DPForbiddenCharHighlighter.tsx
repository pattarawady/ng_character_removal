
import React, { useState, useCallback, useMemo } from 'react';
import { InputArea } from './shared/InputArea';
import { Button } from './shared/Button';
import { OutputDisplay } from './shared/OutputDisplay';
import { XCircleIcon } from './icons/XCircleIcon';

const DP_FORBIDDEN_WORDS_RAW: string[] = [
  // Existing words
  "超豪華", "当社だけ", "最高級", "完璧", "完ぺき", "完ペキ", "完全", "残席わずか", "出発保証確定", "出発有望", "優待", "特価", "格安", "出血", "モニター", "業界第", "Ｎｏ．１", "No.1", "全食事", "値下げ", "マル得", "キャッシュバック", "超安", "激安", "運がよければ", "豪華", "相部屋", "ドミトリー", "カプセル", "ペット同伴", "ＡＮＡパック", "anaパック", "楽ＡＮＡパック", "アナパック", "入湯税", "ホテル税", "宿泊料金", "宿泊価格", "備考欄", "早割", "早期割引", "超お得", "超割", "団体割引", "連泊割引", "バーゲン価格", "最安値", "割引プラン", "名以上割引", "人以上割引", "予算相談", "予算は相談", "カード決済不可", "現金決済", "前受金", "前受け金", "申込金", "申込み金", "申し込み金", "ゴルフプラン", "ゴルフパック", "ゴルフプレー付", "スカイダイビング", "ハングライダー", "ボブスレー", "リュージュ", "ポイント倍", "ポイント２倍", "ポイント３倍", "ポイント４倍", "ポイント５倍", "ポイント６倍", "ポイント７倍", "ポイント８倍", "ポイント９倍", "ポイント１０倍", "スキューバダイビング", "バーゲンプライス", "出張経費削減", "超得", "めちゃ安", "メチャ安", "断然お得", "デポジット", "前金制", "幼児無料", "子供半額", "ルームチャージ", "デイユースプラン", "楽パックJR", "JR貨物", "航空券付き", "NO.1", "NO1", "ＮＯ.１", "ポイント2倍", "ポイント3倍", "ポイント4倍", "ポイント5倍", "ポイント6倍", "ポイント7倍", "ポイント8倍", "ポイント9倍", "ポイント10倍", "楽パックＪＲ", "ＪＲおすすめ", "ＪＲ貨物", "ポイントが2倍", "ポイントが２倍", "ポイントが3倍", "ポイントが３倍", "ポイントが4倍", "ポイントが４倍", "ポイントが5倍", "ポイントが５倍", "ポイントが6倍", "ポイントが６倍", "ポイントが7倍", "ポイントが７倍", "ポイントが8倍", "ポイントが８倍", "ポイントが9倍", "ポイントが９倍", "ポイントが10倍", "ポイントが１０倍", "ポイントを2倍", "ポイントを２倍", "ポイントを3倍", "ポイントを３倍", "ポイントを4倍", "ポイントを４倍", "ポイントを5倍", "ポイントを５倍", "ポイントを6倍", "ポイントを６倍", "ポイントを7倍", "ポイントを７倍", "ポイントを8倍", "ポイントを８倍", "ポイントを9倍", "ポイントを９倍", "ポイントも2倍", "ポイントも２倍", "ポイントも3倍", "ポイントも３倍", "ポイントも4倍", "ポイントも４倍", "ポイントも5倍", "ポイントも５倍", "ポイントも6倍", "ポイントも６倍", "ポイントも7倍", "ポイントも７倍", "ポイントも8倍", "ポイントも８倍", "ポイントも9倍", "ポイントも９倍", "ポイントも10倍", "ポイントも１０倍", "ポイント2％", "ポイント２％", "ポイント3％", "ポイント３％", "ポイント4％", "ポイント４％", "ポイント5％", "ポイント５％", "ポイント6％", "ポイント６％", "ポイント7％", "ポイント７％", "ポイント8％", "ポイント８％", "ポイント9％", "ポイント９％", "ポイント10％", "ポイント１０％", "ポイントが2％", "ポイントが２％", "ポイントが3％", "ポイントが３％", "ポイントが4％", "ポイントが４％", "ポイントが5％", "ポイントが５％", "ポイントが6％", "ポイントが６％", "ポイントが7％", "ポイントが７％", "ポイントが8％", "ポイントが８％", "ポイントが9％", "ポイントが９％", "ポイントが10％", "ポイントが１０％", "ポイントを2％", "ポイントを２％", "ポイントを3％", "ポイントを３％", "ポイントを4％", "ポイントを４％", "ポイントを5％", "ポイントを５倍", "ポイントを6％", "ポイントを６％", "ポイントを7％", "ポイントを７％", "ポイントを8％", "ポイントを８％", "ポイントを9％", "ポイントを９％", "ポイントを10％", "ポイントを１０％", "ポイントも2％", "ポイントも２％", "ポイントも3％", "ポイントも３％", "ポイントも4％", "ポイントも４％", "ポイントも5％", "ポイントも５％", "ポイントも6％", "ポイントも６％", "ポイントも7％", "ポイントも７％", "ポイントも8％", "ポイントも８％", "ポイントも9％", "ポイントも９％", "ポイントも10％", "ポイントも１０％", "特別宿泊価格", "特別宿泊料金", "特別宿泊代金", "当日宿泊価格", "当日宿泊代金", "当日宿泊料金", "衝撃プライス", "ポッキリ価格", "70％料金", "７０％料金", "50％料金", "５０％料金", "宿泊代金", "ご宿泊代", "宿泊代", "当日予約", "前日予約", "デイユース", "宿泊税", "楽天トラベル宿泊予約センター", "050-2017-8989", "０５０－２０１７－８９８９", "直前割", "キャンセルチャージ", "エコ割", "スペシャルプライス", "ＪＡＬＡＮＡパック", "JALANAパック", "ＡＮＡＪＡＬパック", "ANAJALパック", "楽ＪＡＬパック", "楽JALパック", "ベストプライス保証", "最低価格", "コメント欄", "メッセージ欄", "現金特価", "現金決済特典", "現金決済のみ", "オリンピック", "Olympic", "パラリンピック", "olympic", "小学生添い寝", "小学生は添い寝", "050-5213-4754", "０５０－５２１３－４７５４", "050-5213-4766", "０５０－５２１３－４７６６", "連泊割", "早期割", "WEB割", "早得", "先得", "全国旅行支援", "Pontaポイント", "じゃらんポイント", "じゃらん会員", "リクルートポイント", "小学生添い寝無料", "小学生添寝無料", "スーパー早割", "ベストアベイラブル", "激得", "最安", "大幅値下げ", "超特割", "超破格", "現金割引", "現金限定", "現金支払い限定", "現金精算プラン", "現金精算限定", "現金払いプラン", "現金払い限定", "添い寝無料", "添寝無料", "小学生以下の添い寝", "お子様半額", "オンラインカード", "事前カード", "事前決済", "P10倍", "Ｐ１０倍", "P2倍", "Ｐ２倍", "P3倍", "Ｐ３倍", "P4倍", "Ｐ４倍", "P5倍", "Ｐ５倍", "P6倍", "Ｐ６倍", "P7倍", "Ｐ７倍", "P8倍", "Ｐ８倍", "P9倍", "Ｐ９倍", "ポイント11倍", "ポイント12倍", "ポイント15倍", "ポイント20倍", "ポイントアップ", "返金不可", "宿泊費", "宿泊料", "宿泊無料", "正規料金", "部屋代", "室料のみ", "ラックレート", "フレキシブルレート", "ベストレート", "訳アリ価格", "有料宿泊人数", "有料人数", "有料のお子様", "居住者限定", "マイクロツーリズム", "じゃらん",
  "JRおすすめ", "JR東海おすすめ", "JRグループ", "JR西日本", "JR東日本", "JR四国", "JR九州", "ＪＲ東海おすすめ", "ＪＲグループ", "ＪＲ西日本", "ＪＲ東日本", "ＪＲ北海道", "ＪＲ四国", "ＪＲ九州", "ＪＡＬパック", "JALパック", "ジャルパック", "ＪＡＬ楽パック", "ＪＲ楽パック", "義援金", "寄付", "ＪＡＬ楽限定", "ＪＲ楽パック赤い風船",
  "ＡＮＡ楽パック", "ANA FESTA", "ＡＮＡ ＦＥＳＴＡ", "ＡＮＡ楽限定", "日本漫遊", "漫遊",
  "JAL", "JALマイル", "JMB", "楽天", "楽パック", "赤い風船", "LCC", "SKYMARK", "ピーチ", "AIR DO", "バニラエア", "旅作", "ANA", "ANAマイレージ", "ANAマイル", "ANA搭乗", "ANA便", "AMC", "ANA楽", "JAL楽", "じゃらんnet", "楽天トラベル", "ベストリザーブ・宿ぷらざ", "JTB", "ギャラクシーフライト", "最低価格保証", "ポッキリ", "定額", "均一", "円均一", "均一価格", "料金均一", "お試し価格", "モニタープラン", "宿泊体験", "○○円ＯＦＦ", "円割引", "円引", "%OFF", "％オフ", "％割引", "%引", "半額", "割引", "〇％引き", "キャンペーン価格", "特売", "プレミア", "還元", "ふっこう割", "復興割", "ふるさと割", "ふるさと旅行券", "特典", "プレゼント", "無料サービス", "無料で○○付", "預かり金", "振込", "前金", "現地精算", "クレジット", "支払", "一括精算", "現金のみ", "クレジット精算", "現金払いのみ", "現金支払いのみ", "現金払い限定", "現金支払い限定", "現金限定", "領収証", "領収書", "明細書", "明細", "明細証", "請求", "こちらからご連絡いたします", "連絡させていただきます", "ご連絡", "連絡いたします", "回答欄", "要望欄", "コメント", "電話予約", "事前予約", "電話にて", "コールセンター", "よくある問い合わせ", "よくあるお問い合わせ", "連絡ください", "お知らせください", "お問合せください", "お申し出ください", "ご相談ください", "お電話ください", "予約ください", "予約下さい", "宿への要望", "問い合わせください", "連絡下さい", "電話ください", "電話下さい", "入力ください", "熱気球", "ラフティング", "トレッキング", "ハイキング", "ダイビング", "登山", "バンジージャンプ", "セスナ", "グライダー", "ヘリコプター", "パラセイリング", "相い部屋", "ドミトリ", "キャビン", "日帰り", "休憩用", "取消料", "取消し料", "キャンセル", "取り消し料", "おまかせ", "指定なし", "指定不可", "未定", "指定できません", "指定無", "ワンちゃん", "愛犬", "シニア限定", "学生限定", "●歳以上限定", "女性限定", "男性限定", "レディースプラン", "レディース専用フロア", "在住", "県民", "道民", "〇〇県在中", "に在住", "にお住まい", "１０歳以下のお子様はご宿泊いただけません", "年齢制限プラン", "学割", "学生専用", "シルバー割", "歳以上限定", "利用者限定", "会員", "ダイエット", "エステ", "痩身", "美容効果", "森林浴", "リラクゼーション", "新陳代謝促進効果", "健康になる", "気分爽快", "病気が治る", "宿泊料金のみ", "宿泊代のみ", "宿泊のみ", "こどもA", "こどもB", "こどもC", "大人料金●％のお子様", "幼児料金", "小学生から", "まで", "以下", "以上", "高学年", "低学年", "中学生以下", "中学生未満", "６歳", "６才", "１２歳", "１２才", "１３歳", "１３才", "マイル", "マイレージ", "業界●位", "業界第１位", "クチコミ●点", "減泊の場合は通常料金", "減泊の場合はプラン適用外", "成人", "消臭", "消臭対応", "お子様無料", "諸税を別途徴収", "雪マジ", "マラソン大会", "無料", "幼児を人数に含めないでください", "２部屋以上で割引", "大人１名と子ども１名の場合、子どもは大人と同額", "マイカー", "レンタカー", "タイムセール...まで！", "約款", "お酒", "たばこ", "円ＯＦＦ", "￥", "価格", "領収", "クレジットカード", "POINT", "倍率", "小学生関連年齢表記", "お住まい", "要予約", "宿泊予約", "泊まらない", "乗車券付", "ＪＲ＋宿", "きっぷ付", "パス付", "券付", "チケット付", "当日", "前日", "○日前", "金環日食", "取消", "お越しいただけない", "雲上の別天地", "連泊"
];

const DP_FORBIDDEN_WORDS = Array.from(new Set(DP_FORBIDDEN_WORDS_RAW))
  .sort((a, b) => b.length - a.length);

const escapeRegExp = (string: string): string => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

const DPForbiddenCharHighlighter: React.FC = () => {
  const [inputText, setInputText] = useState<string>('');
  const [highlightedText, setHighlightedText] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const forbiddenWordsRegex = useMemo(() => {
    if (DP_FORBIDDEN_WORDS.length === 0) return null;
    const pattern = DP_FORBIDDEN_WORDS.map(escapeRegExp).join('|');
    try {
      return new RegExp(`(${pattern})`, 'g');
    } catch (e) {
      console.error("Error creating regex for DP forbidden words:", e);
      setError("禁止語句リストの正規表現パターン作成中にエラーが発生しました。");
      return null;
    }
  }, []);

  const handleHighlightText = useCallback(() => {
    setError(null);
    setHighlightedText('');

    if (!inputText.trim()) {
      setError("処理対象のテキストを入力してください。");
      return;
    }
    if (!forbiddenWordsRegex) {
       setError("禁止語句の処理パターンが正しく読み込まれませんでした。");
      return;
    }

    try {
      const result = inputText.replace(forbiddenWordsRegex, (match) => {
        return `<mark class="highlighted-dp-word">${match}</mark>`;
      });
      setHighlightedText(result);
    } catch (e) {
      console.error("Error during highlighting:", e);
      setError("ハイライト処理中にエラーが発生しました。");
      setHighlightedText(inputText); 
    }
  }, [inputText, forbiddenWordsRegex]);

  const handleClearAll = useCallback(() => {
    setInputText('');
    setHighlightedText('');
    setError(null);
  }, []);

  const canProcess = useMemo(() => {
    return inputText.trim() !== '';
  }, [inputText]);

  const WordDisplay: React.FC<{ title: string; words: string[]; className?: string }> = ({ title, words, className }) => (
    <div className={`mb-3 ${className}`}>
      <h3 className="text-sm font-medium text-brand-text-medium-dark mb-1">{title}</h3>
      <div className="p-3 bg-brand-bg-input-light rounded text-xs text-brand-text-dark max-h-40 overflow-y-auto scrollbar-thin scrollbar-thumb-brand-border-light-theme-hover scrollbar-track-brand-bg-input-light">
        {words.map((word, index) => (
          <span key={index} className="inline-block mr-2 mb-1 p-1 bg-brand-border-light-theme rounded hover:bg-gray-300">
            {word}
          </span>
        ))}
      </div>
    </div>
  );

  return (
    <div className="w-full p-4 md:p-6 my-0 bg-brand-bg-content-light shadow-xl rounded-b-xl rounded-tr-xl ring-1 ring-brand-border-light-theme">
      <header className="text-left mb-6 pt-2">
        <h2 className="text-xl md:text-2xl font-semibold text-brand-text-dark">
          DP基準 禁止語句ハイライター
        </h2>
        <p className="text-sm text-brand-text-medium-dark mt-1">
          入力されたテキスト中のDP規定禁止語句をハイライト表示します。
        </p>
      </header>

      {error && (
        <div className="mb-4 p-3 bg-error-bg text-error-text border border-error-border rounded-md text-sm" role="alert">
          {error}
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-x-6 gap-y-2">
        <div className="space-y-5">
          <InputArea
            id="dp-inputText"
            label="検査対象テキスト"
            value={inputText}
            onChange={setInputText}
            placeholder="ここにDPの禁止語句が含まれているか検査したいテキストを入力..."
            isTextArea={true}
            rows={10}
          />
        </div>

        <div className="space-y-5">
           <div className="p-4 bg-brand-bg-light rounded-lg h-full flex flex-col ring-1 ring-brand-border-light-theme">
              <h3 className="text-md font-semibold text-brand-text-dark mb-3">DP規定 禁止語句リスト</h3>
              <WordDisplay title="以下の語句がハイライト対象です（全件表示）:" words={DP_FORBIDDEN_WORDS} className="flex-grow"/>
           </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mt-8 mb-6">
        <Button
          onClick={handleHighlightText}
          label="禁止語句をハイライト"
          variant="primary"
          icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" /></svg>}
          disabled={!canProcess || !!error && error !== "処理対象のテキストを入力してください。"}
          className="flex-1"
        />
        <Button
          onClick={handleClearAll}
          label="すべてクリア"
          variant="secondary"
          icon={<XCircleIcon />}
          className="flex-1"
        />
      </div>

      <div className="space-y-5">
        <OutputDisplay
          id="dp-highlightedText"
          label="ハイライト結果"
          text={highlightedText}
          placeholder="ハイライトされたテキストがここに表示されます。"
          isHtml={true}
        />
      </div>
    </div>
  );
};

export default DPForbiddenCharHighlighter;