import { For } from "solid-js";
import { FormContainer, FormField, RecaptchaNotice } from "@/components/forms/";
import { useForm } from "@/hooks/useForm";
import styles from "./apply-form.module.css";
import {
  calcTotalFee,
  FEE_ITEMS,
  PARTICIPATION_FEE,
  resolveFeePrice,
} from "./calc-fee";
import Checkbox from "./checkbox";
import { churchNames } from "./church-names";
import Input from "./input";
import RadioGroup from "./radio-group";
import SubmitButton from "./submit-button";
import TextArea from "./textarea";

const initialFormData = {
  type: "202609a",
  churchName: "",
  fullName: "",
  kanaName: "",
  age: "",
  gender: "男性",
  faithStatus: "信者",
  ageCategory: "一般",
  day1Dinner: "",
  day1Accommodation: "",
  day2Breakfast: "",
  day2Lunch: "",
  day2Dinner: "",
  day2Accommodation: "",
  day3Breakfast: "",
  workshop: "",
  recreation: "",
  comments: "",
};

export default function ApplyForm() {
  const {
    formData,
    setFormData,
    bindInput,
    bindChange,
    bindCheckbox,
    isSubmitting,
    submissionState,
    handleSubmit,
  } = useForm(initialFormData);

  const isAllFeeItemsChecked = () =>
    FEE_ITEMS.every((item) => formData[item.key] === "true");

  const toggleAllFeeItems = () => {
    const nextValue = isAllFeeItemsChecked() ? "" : "true";
    setFormData(
      Object.fromEntries(FEE_ITEMS.map((item) => [item.key, nextValue])),
    );
  };

  return (
    <FormContainer
      isSubmitting={isSubmitting}
      submissionState={submissionState}
      type={initialFormData.type}
      expiredMessage="この申し込みは終了しています。"
      successTitle="申し込みが完了しました"
      successMessage="ご参加ありがとうございます。"
    >
      <form onSubmit={handleSubmit} class={styles.form}>
        <FormField label="教会名" required>
          <Input
            type="text"
            minlength={1}
            maxlength={32}
            required
            autocompleteOptions={churchNames}
            {...bindInput("churchName")}
          />
        </FormField>

        <FormField label="氏名" required>
          <Input
            type="text"
            minlength={1}
            maxlength={32}
            required
            {...bindInput("fullName")}
          />
        </FormField>

        <FormField label="ふりがな" required>
          <Input
            type="text"
            minlength={1}
            maxlength={32}
            required
            {...bindInput("kanaName")}
          />
        </FormField>

        <FormField label="年齢" required>
          <Input
            type="text"
            minlength={1}
            maxlength={2}
            pattern="\d{1,2}"
            title="1〜2桁の数字を入力してください"
            required
            {...bindInput("age")}
          />
        </FormField>

        <FormField label="性別" required>
          <RadioGroup
            options={[
              { label: "男性", value: "男性" },
              { label: "女性", value: "女性" },
            ]}
            required
            orientation="horizontal"
            {...bindChange("gender")}
          />
        </FormField>

        <FormField label="立場" required>
          <RadioGroup
            options={[
              { label: "信者", value: "信者" },
              { label: "未信者", value: "未信者" },
              { label: "教役者", value: "教役者" },
            ]}
            required
            orientation="horizontal"
            {...bindChange("faithStatus")}
          />
        </FormField>

        <FormField label="年齢区分" required>
          <RadioGroup
            options={[
              { label: "一般", value: "一般" },
              { label: "青年（22歳以下）", value: "青年" },
            ]}
            required
            orientation="horizontal"
            {...bindChange("ageCategory")}
          />
        </FormField>

        <FormField label="参加日程">
          <div class={styles.feeWrapper}>
            <button
              type="button"
              class={styles.selectAllButton}
              onClick={toggleAllFeeItems}
            >
              {isAllFeeItemsChecked() ? "すべて解除" : "すべて選択"}
            </button>
            <div class={styles.feeList}>
              <For each={FEE_ITEMS}>
                {(item) => (
                  <div class={styles.feeRow}>
                    <Checkbox {...bindCheckbox(item.key, "true")}>
                      {item.label}
                    </Checkbox>
                    <span class={styles.feePrice}>
                      ¥
                      {resolveFeePrice(
                        item.price,
                        formData.ageCategory,
                      ).toLocaleString()}
                    </span>
                  </div>
                )}
              </For>
              <div class={styles.feeRow}>
                <Checkbox checked disabled>
                  全日程共通
                </Checkbox>
                <span class={styles.feePrice}>
                  ¥{PARTICIPATION_FEE.toLocaleString()}
                </span>
              </div>
            </div>
            <p class={styles.feeAmount}>
              ¥{calcTotalFee(formData).toLocaleString()}
            </p>
          </div>
        </FormField>

        <FormField label="分科会">
          <RadioGroup
            options={[
              { label: "結婚", value: "結婚" },
              { label: "次世代との関り", value: "次世代との関り" },
              { label: "熱心さの持続", value: "熱心さの持続" },
              { label: "宣教", value: "宣教" },
            ]}
            orientation="horizontal"
            {...bindChange("workshop")}
          />
        </FormField>

        <FormField label="レクリエーション">
          <RadioGroup
            options={[
              { label: "お台場観光", value: "お台場観光" },
              { label: "夢の島熱帯植物館", value: "夢の島熱帯植物館" },
              { label: "映画鑑賞", value: "映画鑑賞" },
            ]}
            orientation="horizontal"
            {...bindChange("recreation")}
          />

          {formData.recreation === "お台場観光" && (
            <p class={styles.warningNote}>
              お台場観光を選ぶと施設で昼食を食べないため、「2日目昼食」のチェックを外してください。
            </p>
          )}
        </FormField>

        <FormField label="備考">
          <TextArea maxlength={1024} {...bindInput("comments")} />
        </FormField>

        <SubmitButton>申込する</SubmitButton>

        <RecaptchaNotice />
      </form>
    </FormContainer>
  );
}
