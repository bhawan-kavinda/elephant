# HTML Hosting Test

A small static page used only to test hosting HTML on GitHub Pages. It has no build step and no dependencies.

## Files

| File | Purpose |
|---|---|
| `index.html` | Page structure and inline SVG art |
| `style.css` | Layout, colours and animation |
| `script.js` | Small interactions |

## Run it locally

Open `index.html` in a browser, or run `python3 -m http.server` in this folder and visit `http://localhost:8000`.

## Host on GitHub Pages

```bash
git init -b main && git add . && git commit -m "html test"
gh repo create html-test --public --source . --push
gh api -X POST repos/{owner}/html-test/pages -f "source[branch]=main" -f "source[path]=/"
gh api repos/{owner}/html-test/pages --jq .html_url
```

The last command prints the live link.
