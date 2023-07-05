# Calculator
使用React製作計算機

[計算機線上展示連結](https://nina12336.github.io/react_calculator/)

電腦版畫面：

<img src="https://github.com/nina12336/react_calculator/blob/main/read%20me_photo/%E9%9B%BB%E8%85%A6%E7%89%88%E7%95%AB%E9%9D%A2.png?raw=true"  width="500px" />

手機版畫面：

<img src="https://github.com/nina12336/react_calculator/blob/main/read%20me_photo/%E6%89%8B%E6%A9%9F%E7%89%88%E7%95%AB%E9%9D%A2.png"  width="500px" />

## 關於這個專案

**技術棧**
- React
- JSX
- React DnD
- SCSS

**特殊的元素**
- 具RWD功能，判別使用者裝置呈現相對應版面配置及顏色。如為裝置為電腦時計算機則可拖曳，使用套件`React DnD`達成此功能；如為裝置為手機時計算機的高度為畫面50%，超出的範圍則可使用scroll功能(使用`overflow`)。
- 運算方式採取將算式由中序式轉換成後序式後再進行運算，並解決JS浮點數運算的bug。
- 畫面上呈現兩個readonly input box，一個顯示計算結果，一個顯示算式。
- 數字計算上限為2^32，超過則會顯示"超過數字上限"。

## 如何執行

```
yarn start
```
請在瀏覽器中打開 http://localhost:3000

建議使用Google Chrome
