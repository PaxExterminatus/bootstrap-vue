import { defineComponent, h, mergeProps } from '../../vue'
import { NAME_INPUT_GROUP } from '../../constants/components'
import { SLOT_NAME_APPEND, SLOT_NAME_DEFAULT, SLOT_NAME_PREPEND } from '../../constants/slots'
import { getComponentConfig } from '../../utils/config'
import { htmlOrText } from '../../utils/html'
import { hasNormalizedSlot, normalizeSlot } from '../../utils/normalize-slot'
import { BInputGroupAppend } from './input-group-append'
import { BInputGroupPrepend } from './input-group-prepend'
import { BInputGroupText } from './input-group-text'

// --- Props ---

export const props = {
  id: {
    type: String
  },
  size: {
    type: String,
    default: () => getComponentConfig(NAME_INPUT_GROUP, 'size')
  },
  prepend: {
    type: String
  },
  prependHtml: {
    type: String
  },
  append: {
    type: String
  },
  appendHtml: {
    type: String
  },
  tag: {
    type: String,
    default: 'div'
  }
}

// --- Main component ---
// @vue/component
export const BInputGroup = /*#__PURE__*/ defineComponent({
  name: NAME_INPUT_GROUP,
  functional: true,
  props,
  render(_, { props, data, slots, scopedSlots }) {
    const { prepend, prependHtml, append, appendHtml, size } = props
    const $scopedSlots = scopedSlots || {}
    const $slots = slots()
    const slotScope = {}

    let $prepend = h()
    const hasPrependSlot = hasNormalizedSlot(SLOT_NAME_PREPEND, $scopedSlots, $slots)
    if (hasPrependSlot || prepend || prependHtml) {
      $prepend = h(BInputGroupPrepend, [
        hasPrependSlot
          ? normalizeSlot(SLOT_NAME_PREPEND, slotScope, $scopedSlots, $slots)
          : h(BInputGroupText, { domProps: htmlOrText(prependHtml, prepend) })
      ])
    }

    let $append = h()
    const hasAppendSlot = hasNormalizedSlot(SLOT_NAME_APPEND, $scopedSlots, $slots)
    if (hasAppendSlot || append || appendHtml) {
      $append = h(BInputGroupAppend, [
        hasAppendSlot
          ? normalizeSlot(SLOT_NAME_APPEND, slotScope, $scopedSlots, $slots)
          : h(BInputGroupText, { domProps: htmlOrText(appendHtml, append) })
      ])
    }

    return h(
      props.tag,
      mergeProps(data, {
        staticClass: 'input-group',
        class: { [`input-group-${size}`]: size },
        attrs: {
          id: props.id || null,
          role: 'group'
        }
      }),
      [$prepend, normalizeSlot(SLOT_NAME_DEFAULT, slotScope, $scopedSlots, $slots), $append]
    )
  }
})
