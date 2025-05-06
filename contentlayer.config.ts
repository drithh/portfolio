import { defineDocumentType, makeSource } from 'contentlayer/source-files'

export const Work = defineDocumentType(() => ({
  name: 'Work',
  filePathPattern: 'work/*.mdx',
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    company: { type: 'string', required: true },
    date: { type: 'string', required: true },
    icon: { type: 'string', required: true },
    type: { type: 'string', required: true },
    sortnum: { type: 'number', required: true }
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (doc) => doc._raw.sourceFileName.replace(/\.mdx$/, '')
    }
  }
}))

export default makeSource({
  contentDirPath: 'content',
  documentTypes: [Work]
})
