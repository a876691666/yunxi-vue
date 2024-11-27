import { defineComponent, Fragment } from "vue";
import { hasTag } from "@/utils/auth";

export default defineComponent({
  name: "PermTags",
  props: {
    value: {
      type: undefined,
      default: []
    }
  },
  setup(props, { slots }) {
    return () => {
      if (!slots) return null;
      return hasTag(props.value) ? (
        <Fragment>{slots.default?.()}</Fragment>
      ) : null;
    };
  }
});
