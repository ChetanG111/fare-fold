$path = ".env"
$content = Get-Content $path -Raw
# The garbage has null bytes or is UTF-16, so we use a robust regex to clean from the last marker
$content = $content -replace "(?s)# =============================================================================.*", "# =============================================================================`nDUFFEL_ACCESS_TOKEN=duffel_test_IMmuJ36P8ZNK-IJaxzuciywTKGvgzCvZd6Z-VyHfyUs`n"
[System.IO.File]::WriteAllText($path, $content, [System.Text.Encoding]::UTF8)
