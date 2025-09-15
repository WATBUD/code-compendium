<img src="./images/react-native-expo-ota-update-process.png" alt="Redux Sync Lifecycle" width="100%" style="max-width: 1389px;" />

````markdown
# App Startup Flow

## Step 1: Validate default OTA domain (from app config)

- Try:
  ```javascript
  result = checkForUpdateAsync(); // uses default URL
  ```
````

- Catch:
  - Default domain unreachable / failed → goto Step 2

### Step 1a: Evaluate result (default domain reachable)

- No update → continue running current bundle
- Update available:
  - Compatible:
    - `fetchUpdateAsync()`
      - `reloadAsync()`
        - Success → **DONE**
        - Failure → goto Step 2 (switch to backup domain)

  - Incompatible → Force update (outside OTA flow)

- If Step 1 threw → proceed to Step 2

## Step 2: Fetch backup OTA domain list (GitHub / AWS / Cloudflare / etc.)

- Try domains in order:
  - GitHub JSON
  - AWS endpoint
  - Cloudflare / other predefined backups

### Step 2a: Evaluate result of each domain

- Reachable → pick first healthy domain

  ```javascript
  Updates.setUpdateURLAndRequestHeadersOverride({
    url: chosenDomain,
    requestHeaders: { 'expo-channel-name': 'production' },
  });
  ```

  - Notify user: "Update server switched. Please fully close and reopen the app."
  - Override takes effect only after a full restart

- Unreachable → try next domain in backup list
- All backup domains unreachable → Show "No update server available" and keep embedded bundle

## Step 3: Next app launch (after user restart)

- Repeat Step 1 using the overridden domain
  - Try `checkForUpdateAsync()`
  - Evaluate result as in Step 1a

## Step 4: If the overridden domain fails again

- Pick next domain from the backup list
- Call `setUpdateURLAndRequestHeadersOverride(...)` again
- Prompt user to fully restart again

```

```
