# Test

## H2

### H3

```javascript
const { wrapperClasses } = options;
  let html = markdown.render(raw);

  const wrapperClassesResolved = toArray(
    typeof wrapperClasses === "function"
      ? wrapperClasses(id, raw)
      : wrapperClasses
  )
    .filter(Boolean)
    .join(" ");

  if (wrapperClassesResolved)
    html = `<div class="${wrapperClassesResolved}">${html}</div>`;
  else html = `<div>${html}</html>`;

  const code = `<template>${html}</template>`;

  return {
    code,
    map: { mappings: "" } as any,
  };
```
