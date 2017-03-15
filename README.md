# scroll-change

Add or remove `classes` based on a _trigger_ when is scrolling

### Init

```
const sc = new ScrollChange()
sc.init()

```

or with custom configuration

```
const sc = new ScrollChange({
  elem: '.myId',
  trigger: '#trigger',
  classes: 'change animate yup',
  endPoint: '#end',
})
```
