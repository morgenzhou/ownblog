// tina/config.ts
import { defineConfig } from "tinacms";
var branch = process.env.NEXT_PUBLIC_TINA_BRANCH || process.env.CF_PAGES_BRANCH || process.env.HEAD || "main";
var config_default = defineConfig({
  branch,
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || "local-client-id",
  token: process.env.TINA_TOKEN || "local-token",
  build: {
    publicFolder: "public",
    outputFolder: "admin"
  },
  media: {
    tina: {
      mediaRoot: "static/images/uploads",
      publicFolder: "public"
    }
  },
  schema: {
    collections: [
      {
        name: "site",
        label: "Site Settings",
        path: "data/site",
        format: "json",
        fields: [
          { type: "string", name: "eyebrow", label: "Eyebrow" },
          { type: "string", name: "title", label: "Homepage Title" },
          {
            type: "string",
            name: "description",
            label: "Homepage Description",
            ui: { component: "textarea" }
          },
          { type: "string", name: "stackLabel", label: "Stack Label" },
          { type: "string", name: "stackValue", label: "Stack Value" },
          { type: "string", name: "hostLabel", label: "Host Label" },
          { type: "string", name: "hostValue", label: "Host Value" },
          { type: "string", name: "modeLabel", label: "Mode Label" },
          { type: "string", name: "modeValue", label: "Mode Value" }
        ]
      },
      {
        name: "post",
        label: "Blog Posts",
        path: "data/blog",
        format: "mdx",
        ui: {
          filename: {
            slugify: (values) => {
              const title = values?.title || "new-post";
              return String(title).normalize("NFKD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim().replace(/[^a-z0-9\u4e00-\u9fff]+/g, "-").replace(/^-+|-+$/g, "");
            }
          }
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true
          },
          {
            type: "datetime",
            name: "date",
            label: "Publish Date",
            required: true
          },
          {
            type: "string",
            name: "summary",
            label: "Summary",
            ui: {
              component: "textarea"
            }
          },
          {
            type: "string",
            name: "tags",
            label: "Tags",
            list: true
          },
          {
            type: "boolean",
            name: "draft",
            label: "Draft"
          },
          {
            type: "image",
            name: "images",
            label: "Cover Images",
            list: true
          },
          {
            type: "string",
            name: "layout",
            label: "Layout",
            options: ["PostSimple", "PostLayout", "PostBanner"]
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true
          }
        ]
      },
      {
        name: "author",
        label: "Authors",
        path: "data/authors",
        format: "mdx",
        fields: [
          { type: "string", name: "name", label: "Name", isTitle: true, required: true },
          { type: "image", name: "avatar", label: "Avatar" },
          { type: "string", name: "occupation", label: "Occupation" },
          { type: "string", name: "company", label: "Company" },
          { type: "string", name: "email", label: "Email" },
          { type: "string", name: "github", label: "GitHub" },
          { type: "rich-text", name: "body", label: "Bio", isBody: true }
        ]
      }
    ]
  }
});
export {
  config_default as default
};
