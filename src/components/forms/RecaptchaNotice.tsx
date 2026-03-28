import styles from "./RecaptchaNotice.module.css";

export default function RecaptchaNotice() {
	return (
		<div class={styles.notice}>
			This site is protected by reCAPTCHA and the Google{" "}
			<a
				href="https://policies.google.com/privacy"
				target="_blank"
				rel="noopener noreferrer"
				class={styles.link}
			>
				Privacy Policy
			</a>{" "}
			and{" "}
			<a
				href="https://policies.google.com/terms"
				target="_blank"
				rel="noopener noreferrer"
				class={styles.link}
			>
				Terms of Service
			</a>{" "}
			apply.
		</div>
	);
}
