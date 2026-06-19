# Push Resend env vars from backend/.env to Vercel (run once after: npx vercel login)
$backendEnv = Join-Path $PSScriptRoot "..\backend\.env"
$portfolioDir = Join-Path $PSScriptRoot ".."

if (-not (Test-Path $backendEnv)) {
  Write-Error "backend/.env not found at $backendEnv"
  exit 1
}

$vars = @{}
Get-Content $backendEnv | ForEach-Object {
  if ($_ -match '^\s*([^#=]+)=(.*)$') {
    $vars[$matches[1].Trim()] = $matches[2].Trim()
  }
}

$required = @('RESEND_API_KEY', 'RECEIVER_EMAIL', 'EMAIL_FROM')
foreach ($name in $required) {
  if (-not $vars[$name]) {
    Write-Warning "Missing $name in backend/.env"
  }
}

Push-Location $portfolioDir
try {
  foreach ($name in $required) {
    if ($vars[$name]) {
      Write-Host "Adding $name to Vercel production..."
      $vars[$name] | npx vercel@latest env add $name production --force
    }
  }
  Write-Host "Done. Redeploy on Vercel: npx vercel --prod"
} finally {
  Pop-Location
}
