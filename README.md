# kikko-portal

きっこっこ* - ポータルサイト


## 設置予定サーバー

**FC2 サイト**  
https://kikkokko.web.fc2.com/

**FC2 WordPress**  
https://kikkokko.fc2.page/



## 現存サイト
**Googleサイト**  
https://sites.google.com/view/kikkokko/

**きっこっこwiki\***  
https://w.atwiki.jp/kikkokkokko/

**Toy-Box\*-おもちゃ箱-**  
https://toybox.zatunen.com/

## Tumblr

OAuthコンシューマーキー:  
`VKrihhVTwrGQxuCmlbB2AmuB8WpqFcDFZap0FgeJtQzguS8enF`  

OAuthコンシューマーシークレット:  
`lGjgVF36quwpnQlIohDRljpFLMPtJlhp4I7PzadptLN29KKRBk`  

```js
// Authenticate via OAuth
var tumblr = require('tumblr.js');
var client = tumblr.createClient({
  consumer_key: 'VKrihhVTwrGQxuCmlbB2AmuB8WpqFcDFZap0FgeJtQzguS8enF',
  consumer_secret: 'lGjgVF36quwpnQlIohDRljpFLMPtJlhp4I7PzadptLN29KKRBk',
  token: 'XWX5F5ZEv7WiQS1hai6iL4urHG9mfSVGFUeIHYLIzZ5JMoHBz9',
  token_secret: '66yzav3yqyZc7K5fTiq9nrzhb3tKUFfMEklbkC4QmFaTEcD3kx'
});

// Make the request
client.userInfo(function (err, data) {
    // ...
});
```