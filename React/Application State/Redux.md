Redux Core Concepts (Simplified)
Store: Holds the app's state, created with configureStore.

Action: Describes what to change, includes a type field.

Reducer: Updates the state based on the action.

Dispatch: Sends actions to the store, use useDispatch.

State Access: Use useSelector to get the current state.

Middleware (Optional): Handles async tasks like API calls.