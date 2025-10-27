# GitHub Pages デプロイ手順 🚀

## 1. GitHubリポジトリの作成

1. https://github.com/new にアクセス
2. リポジトリ名: `idol-wota-game`
3. 公開設定: **Public** を選択
4. **Create repository** をクリック

## 2. ローカルリポジトリとGitHubを接続

ターミナルで以下のコマンドを実行してください:

```bash
cd /mnt/c/Users/renma/idol-wota-game

# GitHubリポジトリをリモートとして追加（YOUR_USERNAMEを自分のユーザー名に変更）
git remote add origin https://github.com/YOUR_USERNAME/idol-wota-game.git

# コードをプッシュ
git push -u origin main
```

## 3. GitHub Pagesの設定

1. GitHubリポジトリページで **Settings** タブをクリック
2. 左サイドバーの **Pages** をクリック
3. **Source** セクションで:
   - Source: **GitHub Actions** を選択
4. 自動的にデプロイが開始されます

## 4. デプロイ完了

数分後、以下のURLでゲームが公開されます:

```
https://YOUR_USERNAME.github.io/idol-wota-game/
```

## 5. 更新する場合

コードを変更した後:

```bash
git add .
git commit -m "Update: 変更内容の説明"
git push
```

自動的に再デプロイされます！

---

## 📝 設定済みの内容

✅ `vite.config.ts` - base URL設定完了
✅ `package.json` - デプロイスクリプト追加済み
✅ `.github/workflows/deploy.yml` - GitHub Actions設定済み
✅ `gh-pages` パッケージインストール済み

---

## 🎮 プレイ方法

デプロイ後、以下の操作でプレイできます:

### 基本操作
- **WASD**: 移動
- **Shift**: ダッシュ
- **Space**: ジャンプ

### 厄介行為
- **E**: モッシュ 💥
- **Q**: リフト ⬆️
- **F**: 酒缶投げ 🍺
- **R**: 野次 📢

楽しんでください！🎉
