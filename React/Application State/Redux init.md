
# 創建 Redux 整體流程的純文字步驟：

1. Install Dependencies:
Use the following command to install Redux and React-Redux:

2. Create the Redux Store:
Create a redux folder in the project, and inside it, create a store.ts file to configure the Redux store.

3. Create a Reducer:
Create a slices folder inside the redux folder, and within it, create a reducer file such as optionsSlice.ts to define the state and reducers.

4. Create a Root Reducer:
In the redux folder, create a rootReducer.ts file to combine all the slices.

5. Provide the Redux Store:
In the application's entry file (e.g., index.tsx or App.tsx), use the Provider to make the Redux store available to the app.

6. Use Redux State and Dispatch:
In components, use useSelector and useDispatch to access and update the Redux store state.