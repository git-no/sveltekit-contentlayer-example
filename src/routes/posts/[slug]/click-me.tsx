---
title: Click me!
date: 2023-07-28
---

<script context="module">
    // @ts-nocheck
  import ExternalComponent from '$lib/components/ExternalComponent.svelte';
    // @ts-nocheck
  import LayoutComponent from '$lib/components/LayoutComponent.svelte';
</script>

<LayoutComponent>
<ExternalComponent />

## {title}

This text is from markdown:  
Blog posts have their own pages. The content source is a markdown file, parsed to HTML by Contentlayer.

This is the title from frontmatter: {title}.

**The red background is set by a layout component within markdown file!** :-)
</LayoutComponent>
