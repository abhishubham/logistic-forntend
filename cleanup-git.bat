@echo off
REM Cleanup script to remove files that should be ignored by git
REM Run this script if you've already committed files that should be ignored

echo 🧹 Cleaning up git repository...

REM Remove node_modules if it exists
if exist "node_modules" (
    echo Removing node_modules...
    rmdir /s /q "node_modules"
)

REM Remove .next build directory if it exists
if exist ".next" (
    echo Removing .next build directory...
    rmdir /s /q ".next"
)

REM Remove out directory if it exists
if exist "out" (
    echo Removing out directory...
    rmdir /s /q "out"
)

REM Remove generated API files
if exist "src\api\git_push.sh" (
    echo Removing generated git_push.sh...
    del "src\api\git_push.sh"
)

if exist "src\api\docs" (
    echo Removing generated API docs...
    rmdir /s /q "src\api\docs"
)

if exist "api-docs" (
    echo Removing api-docs directory...
    rmdir /s /q "api-docs"
)

if exist "openapitools.json" (
    echo Removing openapitools.json...
    del "openapitools.json"
)

REM Remove environment files
if exist ".env" (
    echo Removing .env file...
    del ".env"
)

if exist ".env.local" (
    echo Removing .env.local file...
    del ".env.local"
)

echo ✅ Cleanup complete!
echo 📝 Now you can run: git add . ^&^& git commit -m "Initial commit with proper .gitignore"
pause
