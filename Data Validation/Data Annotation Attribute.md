# Data Annotation Attributes 簡介

**Data Annotation Attributes** 是用於標註類別或屬性的註解，主要在資料驗證與模型設計中提供支援，廣泛應用於 ASP.NET Core 和 Entity Framework 等框架中。

### [Required]
指定欄位為必填。  
`[Required] public string Name { get; set; }`

### [StringLength]
限制字串的最小或最大長度。  
`[StringLength(50, MinimumLength = 3)] public string Name { get; set; }`

### [Range]
定義數值範圍。  
`[Range(1, 100)] public int Age { get; set; }`

### [EmailAddress]
驗證電子郵件格式。  
`[EmailAddress] public string Email { get; set; }`

### [RegularExpression]
使用正則表達式驗證格式。  
`[RegularExpression(@"^[a-zA-Z]+$")] public string LettersOnly { get; set; }`

### [Compare]
比較兩個屬性的值（如密碼確認）。  
`[Compare("Password")] public string ConfirmPassword { get; set; }`

### 功能
- 簡化資料驗證邏輯
- 提供強型別驗證
- 與框架整合，支援自動生成錯誤訊息



# Demo
```csharp
public class LocationDTO
{
    public int? ParentId { get; set; }

    [CustomRequired(ErrorMessage = "LayerName is mandatory.")]
    public string LayerName { get; set; }

    public int? Type { get; set; }
}

```javascript
class LocationDTO {
  @IsOptional()
  @IsInt()
  parentId;

  @IsString()
  layerName;

  @IsOptional()
  @IsInt()
  type;
}
