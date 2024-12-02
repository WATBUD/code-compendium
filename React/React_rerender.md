- React_rerender
``` javascript
class ItemList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [
                { id: 1, name: 'Apple', color: 'red' },
                { id: 2, name: 'Banana', color: 'yellow' },
                { id: 3, name: 'Cherry', color: 'red' }
            ]
        };
    }

    updateItem = () => {
        const updatedItems = this.state.items.map(item => 
            item.id === 2 ? { ...item, name: 'Blueberry', color: 'blue' } : item
        );
        this.setState({ items: updatedItems });
    }

    render() {
        return (
            <div>
                <ul>
                    {this.state.items.map(item => (
                        <li key={item.id} style={{ color: item.color }}>
                            {item.name}
                        </li>
                    ))}
                </ul>
                <button onClick={this.updateItem}>Update Item</button>
            </div>
        );
    }
}

ReactDOM.render(<ItemList />, document.getElementById('root'));
```

1. 初始渲染时，React会根据items数组中的数据生成虚拟DOM，并渲染到实际DOM中

2. 当点击“Update Item”按钮时，updateItem函数会更新id为2的项的name属性。

3. React会生成一个新的虚拟DOM，并与旧的虚拟DOM进行比较。

4. 由于<li>元素的类型（'li'）和key（item.id）都没有变化，React会认为它们是同一个元素，并更新name属性。

React会比较新(虚拟DOM树)将其与(旧虚拟DOM树)的属性（props）和状态（state），并仅更新发生变化的部分


新旧列表中的元素具有相同的key和type，React会认为这些元素是同一个元素

初始渲染：
初始状态下，列表渲染Apple, Banana, Cherry，颜色分别是red, yellow, red。
更新操作：
Update Item时，将id为2的项的name更新为Blueberry，颜色更新为blue。

重點:React使用type和key来判断元素是否相同，从而决定是更新现有元素还是创建新元素。
由于key和类型相同，React会认为id为2的项是同一个元素，接着比较属性。
发现name和color属性发生了变化，React只更新这两个属性对应的DOM，而不是重新创建整个元素。



类型（type）的具体含义