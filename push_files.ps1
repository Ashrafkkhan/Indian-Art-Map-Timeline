$ErrorActionPreference = "Continue"
echo "# Indian-Art-Map-Timeline" > README.md
git init
git branch -M main
git remote add origin https://github.com/Ashrafkkhan/Indian-Art-Map-Timeline.git

$files = git ls-files --others --exclude-standard
foreach ($file in $files) {
    git add $file
    git commit -m "Add $file"
}
git push -u origin main
