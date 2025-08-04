import { Link } from '@tiptap/extension-link'

const MaglevLink = Link.extend({
  inclusive() {
    return false;
  },
  addAttributes() {
    return {
      href: {
        default: null,
      },
      target: {
        default: null,
      },
      linkType: {
        default: null,
      },
      linkId: {
        default: null,
      },
      sectionId: {
        default: null,
      },
    }
  },
  parseHTML() {
    return [
      {
        tag: 'a[href]',
        getAttrs: (dom) => ({
          href: dom.getAttribute('href'),
          target: dom.getAttribute('target'),
          linkType: dom.getAttribute('maglev-link-type'),
          linkId: dom.getAttribute('maglev-link-id'),
          sectionId: dom.getAttribute('maglev-section-id'),
        }),
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    const { linkType, linkId, sectionId, ...attrs } = HTMLAttributes
    return [
      'a',
      {
        ...attrs,
        rel: 'noopener noreferrer nofollow',
        target: attrs.target || this.options.target,
        'maglev-link-type': linkType,
        'maglev-link-id': linkId,
        'maglev-section-id': sectionId,
      },
      0,
    ]
  },
});

export default MaglevLink;
