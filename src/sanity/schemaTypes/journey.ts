import { defineField, defineType } from "sanity";

export const journeyType = defineType({
  name: "journey",
  title: "Journey",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "destination",
      title: "Destination",
      type: "string",
      description: "e.g. Morocco, Portugal & Spain",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "period",
      title: "Period",
      type: "string",
      description: 'e.g. "June 2024" or "Summer 2024"',
      validation: (r) => r.required(),
    }),
    defineField({
      name: "coverPhoto",
      title: "Cover Photo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [{ type: "block" }, { type: "image", options: { hotspot: true } }],
    }),
    defineField({
      name: "photoGallery",
      title: "Photo Gallery",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "caption",
              title: "Caption",
              type: "string",
            }),
          ],
        },
      ],
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "period", media: "coverPhoto" },
  },
});
