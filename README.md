## BypassCache.js

> Note: Reload all resources and page (clear cache from this resources)
>
> Note: This method use POST method with XmlHttpRequest

## Include file

```html
<script src="BypassCache.min.js"></script>
```

Method | Description
--- | ---
`BypassCache.url(url [ , callback ])` | Try clear cache by url
`BypassCache.current([ callback ])` | Try clear cache by current url in page
`BypassCache.images([ callback ])` | Try clear cache from images displayed on page
`BypassCache.scripts([ callback ])` | Try clear cache from scripts externals added on page
`BypassCache.styles([ callback ])` | Try clear cache from CSS styles externals added on page
`BypassCache.links([ callback [, ignoreStyles = false ]])` | Try clear cache from `<link>` tags like icons, styles, feeds, etc. Note `ignoreStyles` param is default false, if use `true` elements `<link rel="stylesheet">` are ignored
`BypassCache.reload()` | Try all resources in page and reload page after this
