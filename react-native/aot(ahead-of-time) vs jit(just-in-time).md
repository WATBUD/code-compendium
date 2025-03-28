無論是 AOT 還是 JIT，程式碼最終都需要被編譯成機器碼才能執行。**關鍵的區別在於 編譯發生的時間點。**
* **AOT (Ahead-of-Time) 編譯：**
    * 編譯發生在**應用程式執行之前**。通常是在開發、建置或安裝階段完成。
    * 編譯的結果（機器碼）會被儲存起來。
    * 當應用程式真正運行時，它**直接讀取並執行這些預先編譯好的機器碼**，不再需要進行任何編譯。

* **JIT (Just-in-Time) 編譯：**
    * 編譯發生在**應用程式執行時**。
    * 當程式執行到某部分程式碼時，JIT 編譯器才會將其編譯成機器碼。
    * 編譯後的機器碼通常會被緩存起來，以便下次再次執行到相同程式碼時可以直接使用，避免重複編譯。

**所以，雖然 AOT 也進行了編譯，但它是在應用程式執行之前就完成了這個步驟。這就像是您事先將一篇文章翻譯好，當您需要閱讀時，可以直接閱讀翻譯後的版本，非常快速。**

**JIT 則像是在您閱讀文章時，遇到不熟悉的句子才臨時請翻譯人員進行翻譯。雖然最終您也能理解內容，但這個翻譯的過程會消耗時間，導致您閱讀的速度變慢。**

* AOT 優勢將編譯成本提前支付了，使應用程式執行時可以更快讀取和執行，不需要再花時間進行編譯。
* AOT 通常能提供更快的啟動速度和更穩定的執行效能。