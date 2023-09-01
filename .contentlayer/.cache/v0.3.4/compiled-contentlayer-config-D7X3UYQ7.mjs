// contentlayer.config.js
import { defineDocumentType, defineNestedType, makeSource } from "contentlayer/source-files";
import path from "path";
var computedFields = {
  slug: {
    type: "string",
    resolve: (doc) => doc._raw.flattenedPath.split("/").slice(1).join("/").toLowerCase()
  },
  slugFull: {
    type: "string",
    resolve: (doc) => `/${doc._raw.flattenedPath.toLowerCase()}`
  },
  fileName: {
    type: "string",
    resolve: (doc) => path.parse(doc._raw.sourceFilePath.split("/").slice(-1).join("/")).name
  },
  suffix: {
    type: "string",
    resolve: (doc) => path.parse(doc._raw.sourceFilePath.split("/").slice(-1).join("/")).ext
  }
};
var Author = defineNestedType(() => ({
  name: "Author",
  fields: {
    name: { type: "string", required: true },
    handle: { type: "string", required: true },
    avatar: { type: "string", required: true }
  }
}));
var Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `posts/**/*.md`,
  fields: {
    draft: {
      type: "boolean",
      description: "Disable in production mode",
      default: false
    },
    title: {
      type: "string",
      required: true
    },
    description: {
      type: "string"
    },
    date: {
      type: "date",
      required: true
    },
    authors: {
      type: "list",
      of: Author,
      required: false
    }
  },
  computedFields
}));
var contentlayer_config_default = makeSource({
  contentDirPath: "./content",
  documentTypes: [Post],
  disableImportAliasWarning: true
});
export {
  Post,
  contentlayer_config_default as default
};
//# sourceMappingURL=compiled-contentlayer-config-D7X3UYQ7.mjs.map
