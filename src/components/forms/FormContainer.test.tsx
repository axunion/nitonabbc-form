import { render, screen } from "@solidjs/testing-library";
import { describe, expect, it, vi } from "vitest";
import { useExpirationStatus } from "@/hooks/useExpirationStatus";
import type { SubmissionState } from "@/hooks/useForm";
import type { FormContainerProps } from "./FormContainer";
import FormContainer from "./FormContainer";

vi.mock("@/hooks/useExpirationStatus", () => ({
  useExpirationStatus: vi.fn(),
}));

type ExpirationValue = "valid" | "expired";

// createResource の Resource<T> に近い callable + state プロパティを模倣
function makeResource(
  state: "pending" | "ready" | "errored",
  value?: ExpirationValue,
): ReturnType<typeof useExpirationStatus>["expirationStatus"] {
  const fn = vi.fn().mockReturnValue(value);
  return Object.assign(fn, {
    state,
    loading: state === "pending",
    error: state === "errored" ? new Error("connection failed") : undefined,
  }) as unknown as ReturnType<typeof useExpirationStatus>["expirationStatus"];
}

type SetupOptions = Pick<
  FormContainerProps,
  "expiredMessage" | "successTitle" | "successMessage" | "errorTitle"
>;

function setup(
  state: "pending" | "ready" | "errored",
  value?: ExpirationValue,
  submissionState: SubmissionState = "idle",
  isSubmitting = false,
  customProps: SetupOptions = {},
) {
  vi.mocked(useExpirationStatus).mockReturnValue({
    expirationStatus: makeResource(state, value),
    refetch: vi.fn(),
  });
  return render(() => (
    <FormContainer
      type="test"
      isSubmitting={() => isSubmitting}
      submissionState={() => submissionState}
      {...customProps}
    >
      <p>フォームコンテンツ</p>
    </FormContainer>
  ));
}

describe("FormContainer", () => {
  describe("pending（期限チェック中）", () => {
    it("フォームも各メッセージも表示しない", () => {
      setup("pending");
      expect(screen.queryByText("フォームコンテンツ")).toBeNull();
      expect(screen.queryByText("接続エラーが発生しました")).toBeNull();
      expect(screen.queryByText("このフォームは終了しています。")).toBeNull();
    });
  });

  describe("errored（接続エラー）", () => {
    it("接続エラーメッセージを表示する", () => {
      setup("errored");
      expect(screen.getByText("接続エラーが発生しました")).toBeTruthy();
    });

    it("フォームコンテンツを表示しない", () => {
      setup("errored");
      expect(screen.queryByText("フォームコンテンツ")).toBeNull();
    });
  });

  describe("ready + expired（期限切れ）", () => {
    it("デフォルトの期限切れメッセージを表示する", () => {
      setup("ready", "expired");
      expect(screen.getByText("このフォームは終了しています。")).toBeTruthy();
    });

    it("props.expiredMessage が優先される", () => {
      setup("ready", "expired", "idle", false, {
        expiredMessage: "受付は終了しました。",
      });
      expect(screen.getByText("受付は終了しました。")).toBeTruthy();
    });

    it("フォームコンテンツを表示しない", () => {
      setup("ready", "expired");
      expect(screen.queryByText("フォームコンテンツ")).toBeNull();
    });
  });

  describe("ready + valid + idle（フォーム表示中）", () => {
    it("フォームコンテンツを表示する", () => {
      setup("ready", "valid", "idle");
      expect(screen.getByText("フォームコンテンツ")).toBeTruthy();
    });

    it("成功・エラーメッセージを表示しない", () => {
      setup("ready", "valid", "idle");
      expect(screen.queryByText("送信が完了しました")).toBeNull();
      expect(screen.queryByText("送信に失敗しました")).toBeNull();
    });
  });

  describe("ready + valid + submitting（送信中）", () => {
    it("フォームコンテンツを表示したまま（オーバーレイは SubmissionLoader）", () => {
      setup("ready", "valid", "submitting", true);
      expect(screen.getByText("フォームコンテンツ")).toBeTruthy();
    });
  });

  describe("ready + valid + success（送信成功）", () => {
    it("デフォルトの成功タイトル・メッセージを表示する", () => {
      setup("ready", "valid", "success");
      expect(screen.getByText("送信が完了しました")).toBeTruthy();
      expect(screen.getByText("ありがとうございました。")).toBeTruthy();
    });

    it("props.successTitle / successMessage が優先される", () => {
      setup("ready", "valid", "success", false, {
        successTitle: "申込完了",
        successMessage: "担当者より連絡いたします。",
      });
      expect(screen.getByText("申込完了")).toBeTruthy();
      expect(screen.getByText("担当者より連絡いたします。")).toBeTruthy();
    });

    it("フォームコンテンツを非表示にする", () => {
      setup("ready", "valid", "success");
      expect(screen.queryByText("フォームコンテンツ")).toBeNull();
    });
  });

  describe("ready + valid + error（送信失敗）", () => {
    it("デフォルトの送信失敗タイトルを表示する", () => {
      setup("ready", "valid", "error");
      expect(screen.getByText("送信に失敗しました")).toBeTruthy();
    });

    it("props.errorTitle が優先される", () => {
      setup("ready", "valid", "error", false, {
        errorTitle: "エラーが発生しました",
      });
      expect(screen.getByText("エラーが発生しました")).toBeTruthy();
    });

    it("フォームコンテンツを非表示にする", () => {
      setup("ready", "valid", "error");
      expect(screen.queryByText("フォームコンテンツ")).toBeNull();
    });
  });
});
