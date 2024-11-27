import { hasTag } from "@/utils/auth";
import type { Directive, DirectiveBinding } from "vue";

export const permTags: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding<string | Array<string>>) {
    const { value } = binding;
    if (value) {
      !hasTag(value) && el.parentNode?.removeChild(el);
    } else {
      throw new Error(
        "[Directive: permTags]: need tags! Like v-perm-tags=\"['btn.add','btn.edit']\""
      );
    }
  }
};
