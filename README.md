# selectable

> vue框选指令

## 用法

``` js
npm install v-selectable
```

``` javascript
import selectable from 'v-selectable'
Vue.use(selectable)
```

``` html
<ul
    class="list-wrap"
    <!-- calassName 是要框选子元素的class属性 
         overSelect 方法会传递框选到的子元素下标 -->
    v-selectable="{className: 'list-item', overSelect: overSelect">
    <li
    :key="l.name"
    v-for="l of list"
    class="list-item"
    ></li>
</ul>
```

```javascript
methods: {
    overSelect: function (items) {
      console.log(items) // [1,2,3]
    }
}
```

