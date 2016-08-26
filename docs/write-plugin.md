# Writing plugin is easy!

Saying you want a plugin to list today's coming animes:

```js
// use any node module you want
const bgm = require('bgm-fetch')

module.exports = (input) => {
  const weekDay = new Date().getDay()

  return bgm(null, {format: true})
    .then(data => {
      const items = data[weekDay].map(item => ({
        title: item.titleCN,
        subtitle: item.timeCN || item.timeJP,
        action: {
          type: 'open-url',
          url: `http://bangumi.tv/subject/${item.bgmId}`
        }
      }))
      resolve(items)
    })
}
```

And all other meta data goes to `package.json`:

```json
{
  "rem": {
    "trigger": "anime"
  }
}
```