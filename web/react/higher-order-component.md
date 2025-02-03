
# 高階組件 （Higher Order Component, HOC） 簡介與範例

## 什麼是高階組件 （Higher Order Component, HOC）?
React 中，HOC 是接受[組件]返回[新組件的函數]，用於[組件重用邏輯]的技術
React 中實現[組件重用]和[抽象]的一種模式。
HOC 用來增強原始組件功能，將多個組件邏輯提取到單獨函數中，達到[代碼重用]。
HOC 本質上是[函數]，接收一個[組件]作為[參數]，[返回]一個[新組件]。
通常 HOC 包裝那些需要[額外功能]的組件，[避免直接修改]原始組件代碼。

## 範例 1：簡單的 HOC

```js
// 定義高階組件 HOC，接受一個組件並返回一個新的組件
const withTitle = (WrappedComponent) => {
    return (props) => (
        <div>
            {/* 在包裝組件之前顯示標題 */}
            <h1>Welcome to my App!</h1>
            {/* 渲染傳入的組件，並將所有 props 傳遞給它 */}
            <WrappedComponent {...props} />
        </div>
    );
};

// 原始組件，顯示用戶的名稱
const Greeting = ({ name }) => <p>Hello, {name}!</p>;

// 使用 withTitle 高階組件包裝原始組件 Greeting
const GreetingWithTitle = withTitle(Greeting);

// 使用包裝過的組件，傳入 name 參數
const App = () => <GreetingWithTitle name="John" />;
```

## 範例 2：HOC 用於處理加載狀態

```js
// 定義高階組件 HOC，用於處理加載和錯誤狀態
const withLoading = (WrappedComponent) => {
    return ({ isLoading, error, ...props }) => {
        // 如果正在加載，顯示加載中訊息
        if (isLoading) return <p>Loading...</p>;
        
        // 如果發生錯誤，顯示錯誤訊息
        if (error) return <p>Error: {error}</p>;
        
        // 否則渲染包裝過的組件
        return <WrappedComponent {...props} />;
    };
};

// 原始組件，顯示數據
const DataDisplay = ({ data }) => <div>{data}</div>;

// 使用 withLoading 高階組件包裝原始組件 DataDisplay
const DataDisplayWithLoading = withLoading(DataDisplay);

const App = () => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // 模擬 API 請求並獲取數據
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            // 模擬發送 API 請求
            const response = await fetch('https://api.example.com/data');
            const result = await response.json();
            // 請求成功，更新數據並設定為加載完成
            setData(result);
            setIsLoading(false);
        } catch (err) {
            // 請求失敗，設置錯誤訊息並停止加載
            setError(err.message);
            setIsLoading(false);
        }
    };

    // 渲染包裝過的組件，並傳入加載狀態、錯誤訊息和數據
    return <DataDisplayWithLoading isLoading={isLoading} error={error} data={data} />;
};
```

## 註解說明

- **高階組件 (HOC)** 是接受組件並返回新組件的函數，用於[增強或修改原始組件功能]。
- `withTitle` 範例中創建了一個 HOC，HOC 為原始組件添加一個標題 (`<h1>Welcome to my App!</h1>`)，並保留原始組件的功能。
- `withLoading` 範例創建了一個 HOC處理加載狀態與錯誤狀態。加載時顯示「Loading...」，發生錯誤時顯示錯誤訊息，否則顯示正常數據。
- HOC 使邏輯抽象重用在不同的組件中，保持代碼的簡潔和可維護性。
