param(
  [Parameter(Mandatory = $true)][string]$InputPdf,
  [Parameter(Mandatory = $true)][string]$OutputDirectory
)

$ErrorActionPreference = 'Stop'
$InputPdf = (Resolve-Path -LiteralPath $InputPdf).Path
$OutputDirectory = [System.IO.Path]::GetFullPath($OutputDirectory)
Add-Type -AssemblyName System.Runtime.WindowsRuntime
[Windows.Storage.StorageFile, Windows.Storage, ContentType = WindowsRuntime] | Out-Null
[Windows.Data.Pdf.PdfDocument, Windows.Data.Pdf, ContentType = WindowsRuntime] | Out-Null
[Windows.Data.Pdf.PdfPageRenderOptions, Windows.Data.Pdf, ContentType = WindowsRuntime] | Out-Null
[Windows.Storage.Streams.InMemoryRandomAccessStream, Windows.Storage.Streams, ContentType = WindowsRuntime] | Out-Null
[Windows.Storage.Streams.DataReader, Windows.Storage.Streams, ContentType = WindowsRuntime] | Out-Null

$asTaskGeneric = [System.WindowsRuntimeSystemExtensions].GetMethods() | Where-Object {
  $_.Name -eq 'AsTask' -and $_.IsGenericMethod -and $_.GetParameters().Count -eq 1 -and
  $_.GetParameters()[0].ParameterType.Name -eq 'IAsyncOperation`1'
} | Select-Object -First 1
$asTaskAction = [System.WindowsRuntimeSystemExtensions].GetMethods() | Where-Object {
  $_.Name -eq 'AsTask' -and -not $_.IsGenericMethod -and $_.GetParameters().Count -eq 1
} | Select-Object -First 1

function Wait-Operation($Operation, [Type]$ResultType) {
  $task = $asTaskGeneric.MakeGenericMethod($ResultType).Invoke($null, @($Operation))
  $task.GetAwaiter().GetResult()
}

$inputFile = Wait-Operation ([Windows.Storage.StorageFile]::GetFileFromPathAsync($InputPdf)) ([Windows.Storage.StorageFile])
$document = Wait-Operation ([Windows.Data.Pdf.PdfDocument]::LoadFromFileAsync($inputFile)) ([Windows.Data.Pdf.PdfDocument])
New-Item -ItemType Directory -Path $OutputDirectory -Force | Out-Null
for ($pageIndex = 0; $pageIndex -lt $document.PageCount; $pageIndex++) {
  $pdfPage = $document.GetPage($pageIndex)
  $options = New-Object Windows.Data.Pdf.PdfPageRenderOptions
  $options.DestinationWidth = 1600
  $stream = New-Object Windows.Storage.Streams.InMemoryRandomAccessStream
  $renderTask = $asTaskAction.Invoke($null, @($pdfPage.RenderToStreamAsync($stream, $options)))
  $renderTask.GetAwaiter().GetResult()
  $reader = New-Object Windows.Storage.Streams.DataReader($stream.GetInputStreamAt(0))
  $loaded = Wait-Operation ($reader.LoadAsync([uint32]$stream.Size)) ([uint32])
  $bytes = New-Object byte[] $loaded
  $reader.ReadBytes($bytes)
  $outputFile = Join-Path $OutputDirectory ('resume-page-{0}.png' -f ($pageIndex + 1))
  [System.IO.File]::WriteAllBytes($outputFile, $bytes)
  Write-Output ('Rendered {0} ({1} bytes)' -f $outputFile, $bytes.Length)
  $reader.Dispose()
  $stream.Dispose()
  $pdfPage.Dispose()
}
# Avoid the Windows PowerShell host's WinRT finalizer shutdown bug after successful rendering.
[Environment]::Exit(0)
