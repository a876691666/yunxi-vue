import { getCaptchaImage } from "@/api/user";
import { ref, onMounted } from "vue";

/**
 * 绘制图形验证码
 * @param width - 图形宽度
 * @param height - 图形高度
 */
export const useImageVerify = () => {
  const domRef = ref<HTMLCanvasElement>();
  const imgCode = ref("");
  const uuid = ref("");

  function setImgCode(code: string) {
    imgCode.value = code;
  }

  function getImgCode() {
    if (!domRef.value) return;
    getCaptchaImage().then(res => {
      const blob = new Blob([res.img], { type: "image/svg+xml" });
      const url = URL.createObjectURL(blob);
      imgCode.value = url;
      uuid.value = res.uuid;
    });
  }

  onMounted(() => {
    getImgCode();
  });

  return {
    uuid,
    domRef,
    imgCode,
    setImgCode,
    getImgCode
  };
};
