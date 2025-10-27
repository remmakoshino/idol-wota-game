# 🚀 GitHub Pages デプロイガイド

## 📝 現在の状態
- ✅ Gitリポジトリ初期化済み
- ✅ 全ファイルコミット済み
- ✅ GitHub Actions設定済み (.github/workflows/deploy.yml)
- ✅ Vite設定完了 (base: '/idol-wota-game/')
- ✅ README.md最新版

## 🔧 次のステップ

### 1. GitHubリポジトリにプッシュ

ターミナルで以下のコマンドを実行してください：

```bash
# リモートリポジトリを追加（YOUR_USERNAMEを自分のGitHubユーザー名に変更）
git remote add origin https://github.com/YOUR_USERNAME/idol-wota-game.git

# メインブランチにプッシュ
git push -u origin main
```

### 2. GitHub Pages設定

1. GitHubリポジトリページ（https://github.com/YOUR_USERNAME/idol-wota-game）を開く
2. **Settings** タブをクリック
3. 左サイドバーの **Pages** をクリック
4. **Source** セクションで **GitHub Actions** を選択
5. 保存（自動的に選択される場合もあります）

### 3. デプロイの確認

1. リポジトリの **Actions** タブをクリック
2. 最新のワークフロー実行を確認
3. ✅ マークがついたら完了！

### 4. 公開URLにアクセス

```
https://YOUR_USERNAME.github.io/idol-wota-game/
```

数分後、このURLでゲームがプレイできます！🎮

---

## 🔄 今後の更新方法

コードを変更した後：

```bash
git add .
git commit -m "変更内容の説明"
git push
```

GitHub Actionsが自動的にビルド＆デプロイします！

---

## 📊 コミット履歴

現在のコミット：
```bash
git log --oneline
```

出力例：
```
a7afbf2 Update README: Add random heckle messages and 'Strong Sakezako' can label
082f4a2 Update can label to 'ストロング酒雑魚' and add random heckle messages
38a190a Update README with latest features: Minecraft characters and multiple trouble actions
f48b23d Initial commit: Idol Wota Game with Minecraft-style characters and multiple trouble actions
```

---

## ✨ 実装済み機能一覧

### キャラクター
- マインクラフト風プレイヤー
- マッチョなセキュリティガード（サングラス付き）
- 5人のアイドルグループ（異なる衣装カラー）

### 厄介行為
- E: モッシュ
- Q: リフト（2人のサポートキャラ出現）
- F: 酒缶投げ（「ストロング酒雑魚」缶が飛ぶ）
- R: 野次（4種類のランダムメッセージ）
  - 「男がいるなら、謝罪しろ〜！」
  - 「責任から逃げるな！」
  - 「メン地下彼氏は？」
  - 「風俗に在籍ある？」

### ステージ
- ライブハウス（易）: 2人のガード
- ホール（普通）: 4人のガード
- アリーナ（難）: 6人のガード

### ミニゲーム
- 直缶チャレンジ
- 「ストロング酒雑魚」缶デザイン
- リアルな飲酒演出
- 「イッチャン好き！💖」完飲メッセージ

---

## 🎉 完成！

すべての準備が整いました！
GitHubにプッシュして、世界中の人にゲームをプレイしてもらいましょう！🚀
