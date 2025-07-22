# Backend Test App
Shopifyの注文データを一覧表示し、CSVにエクスポートするアプリ。

## Database Design
DBはSQLite

下記が注文テーブル

| カラム名              | 型          | 制約            | 説明                 |
| ----------------- | ---------- | ------------- | ------------------ |
| `orderId`         | `String`   | `PRIMARY KEY` | Shopifyの注文ID（ユニーク） |
| `orderNumber`     | `String`   | `NOT NULL`    | 注文番号（例：#1001）      |
| `totalPrice`      | `Float`    | `NOT NULL`    | 注文合計金額             |
| `paymentGateway`  | `String`   | `NOT NULL`    | 使用された決済手段          |
| `customerEmail`   | `String`   | `NOT NULL`    | 顧客のメールアドレス         |
| `customerName`    | `String`   | `NOT NULL`    | 顧客のフルネーム（姓 + 名）    |
| `customerAddress` | `String`   | `NOT NULL`    | 配送先住所（簡易）          |
| `tags`            | `String`   |               | タグ（カンマ区切りで保存）      |
| `createdAt`       | `DateTime` | `NOT NULL`    | 注文作成日時（Shopify発行）  |


## アプリの実行

```shell
git clone https://github.com/tomichin/backend-test-app.git
cd backend-test-app
shopify app dev
```

## 主要なファイル
- /app/models/order.server.js : 注文テーブルを操作するためのファイル
- /app/routes/app._index.jsx : アプリのトップ画面(注文一覧)
- /app/routes/orders.eport.js : 注文データをエクスポートする処理を記載したファイル
- /app/routes/webhooks.jsx : 注文作成されたときにwebhookで検知した時の処理を記載したファイル
- /prisma/schema.prisma : 注文テーブルの定義を記載
- /prisma/seed.cjs : テスト用の注文データ
- /shopify.app.backend-test-app-v2.toml : Webhookの購読の設定を記載
- /sample/order.csv : 実際にアプリからエクスポートしたCSV
- /sample/screencapture.png : アプリの画面のキャプチャー

## 今後の課題

- Webhookが配信失敗して注文データをアプリに取り込めなかったので、原因の調査
- タグの追加、削除の対応
