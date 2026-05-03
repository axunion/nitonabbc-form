import { createRoot } from "solid-js";
import { describe, expect, it, vi } from "vitest";
import { submitForm } from "@/services/api";
import { getReCaptchaToken } from "@/services/recaptcha";
import { useForm } from "./useForm";

vi.mock("@/services/api", () => ({ submitForm: vi.fn() }));
vi.mock("@/services/recaptcha", () => ({ getReCaptchaToken: vi.fn() }));

function makeSubmitEvent(valid = true) {
  const form = document.createElement("form");
  if (!valid) {
    const input = document.createElement("input");
    input.required = true;
    input.value = "";
    form.appendChild(input);
  }
  const event = new Event("submit", {
    bubbles: true,
    cancelable: true,
  }) as SubmitEvent;
  Object.defineProperty(event, "currentTarget", {
    value: form,
    configurable: true,
  });
  event.preventDefault = vi.fn();
  return event;
}

describe("useForm", () => {
  describe("bindInput", () => {
    it("name・value・disabled を返す", () => {
      createRoot((dispose) => {
        const { bindInput } = useForm({ name: "initial", email: "" });
        const props = bindInput("name");
        expect(props.name).toBe("name");
        expect(props.value).toBe("initial");
        expect(props.disabled).toBe(false);
        dispose();
      });
    });

    it("onInput でストアを更新する", () => {
      createRoot((dispose) => {
        const { bindInput, formData } = useForm({ name: "" });
        const props = bindInput("name");
        const input = document.createElement("input");
        input.value = "テスト";
        props.onInput({ currentTarget: input } as unknown as InputEvent & {
          currentTarget: HTMLInputElement;
        });
        expect(formData.name).toBe("テスト");
        dispose();
      });
    });
  });

  describe("bindChange", () => {
    it("onChange でストアを更新する", () => {
      createRoot((dispose) => {
        const { bindChange, formData } = useForm({ type: "" });
        const props = bindChange("type");
        props.onChange({
          currentTarget: { value: "adult" },
        } as unknown as Event & {
          currentTarget: HTMLSelectElement;
        });
        expect(formData.type).toBe("adult");
        dispose();
      });
    });
  });

  describe("bindCheckbox", () => {
    it("checked は formData の値と checkedValue が一致するとき true", () => {
      createRoot((dispose) => {
        const { bindCheckbox } = useForm({ agree: "yes" });
        const props = bindCheckbox("agree", "yes");
        expect(props.checked).toBe(true);
        dispose();
      });
    });

    it("onChange(true) で checkedValue を設定する", () => {
      createRoot((dispose) => {
        const { bindCheckbox, formData } = useForm({ agree: "" });
        const props = bindCheckbox("agree", "yes");
        props.onChange(true);
        expect(formData.agree).toBe("yes");
        dispose();
      });
    });

    it("onChange(false) で空文字を設定する", () => {
      createRoot((dispose) => {
        const { bindCheckbox, formData } = useForm({ agree: "yes" });
        const props = bindCheckbox("agree", "yes");
        props.onChange(false);
        expect(formData.agree).toBe("");
        dispose();
      });
    });
  });

  describe("resetForm", () => {
    it("フォームデータを初期値に戻す", () => {
      createRoot((dispose) => {
        const { bindInput, formData, resetForm } = useForm({ name: "initial" });
        const props = bindInput("name");
        const input = document.createElement("input");
        input.value = "変更後";
        props.onInput({ currentTarget: input } as unknown as InputEvent & {
          currentTarget: HTMLInputElement;
        });
        expect(formData.name).toBe("変更後");
        resetForm();
        expect(formData.name).toBe("initial");
        dispose();
      });
    });
  });

  describe("handleSubmit", () => {
    it("フォームが invalid の場合は API を呼ばず false を返す", async () => {
      const [{ handleSubmit }, dispose] = createRoot((d) => {
        return [useForm({ name: "" }), d] as const;
      });
      const result = await handleSubmit(makeSubmitEvent(false));
      expect(result).toBe(false);
      expect(submitForm).not.toHaveBeenCalled();
      dispose();
    });

    it("送信成功で submissionState が success になる", async () => {
      vi.mocked(getReCaptchaToken).mockResolvedValue("token");
      vi.mocked(submitForm).mockResolvedValue({ result: "done" });

      const [{ handleSubmit, submissionState }, dispose] = createRoot((d) => {
        return [useForm({ name: "テスト" }), d] as const;
      });
      await handleSubmit(makeSubmitEvent(true));
      expect(submissionState()).toBe("success");
      dispose();
    });

    it("送信エラーで submissionState が error になる", async () => {
      vi.mocked(getReCaptchaToken).mockResolvedValue("token");
      vi.mocked(submitForm).mockResolvedValue({
        result: "error",
        error: "Server error",
      });

      const [{ handleSubmit, submissionState }, dispose] = createRoot((d) => {
        return [useForm({ name: "テスト" }), d] as const;
      });
      await handleSubmit(makeSubmitEvent(true));
      expect(submissionState()).toBe("error");
      dispose();
    });

    it("例外発生時も submissionState が error になる", async () => {
      vi.mocked(getReCaptchaToken).mockRejectedValue(
        new Error("reCAPTCHA failed"),
      );

      const [{ handleSubmit, submissionState }, dispose] = createRoot((d) => {
        return [useForm({ name: "テスト" }), d] as const;
      });
      await handleSubmit(makeSubmitEvent(true));
      expect(submissionState()).toBe("error");
      dispose();
    });

    it("送信前に値をトリムして API に渡す", async () => {
      vi.mocked(getReCaptchaToken).mockResolvedValue("token");
      vi.mocked(submitForm).mockResolvedValue({ result: "done" });

      const [{ handleSubmit, setFormData }, dispose] = createRoot((d) => {
        return [useForm({ name: "" }), d] as const;
      });
      setFormData("name", "  スペース  ");
      await handleSubmit(makeSubmitEvent(true));
      expect(submitForm).toHaveBeenCalledWith({ name: "スペース" }, "token");
      dispose();
    });

    it("送信完了後 isSubmitting が false に戻る", async () => {
      vi.mocked(getReCaptchaToken).mockResolvedValue("token");
      vi.mocked(submitForm).mockResolvedValue({ result: "done" });

      const [{ handleSubmit, isSubmitting }, dispose] = createRoot((d) => {
        return [useForm({ name: "テスト" }), d] as const;
      });
      await handleSubmit(makeSubmitEvent(true));
      expect(isSubmitting()).toBe(false);
      dispose();
    });
  });
});
